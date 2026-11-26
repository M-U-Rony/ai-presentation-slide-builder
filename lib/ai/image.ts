import { ApiError } from "@/lib/api";
import { getEnv } from "@/lib/env";
import { getAIClient, requestOptions, toApiError, type ChatSend } from "@/lib/ai/client";
import { buildImageUserPrompt, IMAGE_SYSTEM_PROMPT } from "@/lib/ai/prompts";

const IMAGE_TIMEOUT_MS = 120_000;
const DOWNLOAD_TIMEOUT_MS = 15_000;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export type ImageExt = "png" | "jpg" | "webp";
export type GeneratedImage = { data: Buffer; ext: ImageExt };

/** Identifies PNG / JPEG / WebP from the file's magic bytes. */
export function detectImageType(buf: Buffer): ImageExt | null {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpg";
  }
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

function urlFrom(part: unknown): string | null {
  if (!part || typeof part !== "object") return null;
  const p = part as Record<string, unknown>;
  for (const key of ["imageUrl", "image_url"]) {
    const v = p[key];
    if (typeof v === "string") return v;
    if (v && typeof v === "object" && typeof (v as { url?: unknown }).url === "string") {
      return (v as { url: string }).url;
    }
  }
  return null;
}

/**
 * Finds the image reference in a chat message: the `images` array (OpenRouter's
 * image output), then image parts of array content. Plain text content is only
 * accepted when it is itself a data:image URL or an https URL; the bytes are
 * verified afterwards either way.
 */
export function findImageReference(message: unknown): string | null {
  if (!message || typeof message !== "object") return null;
  const m = message as { images?: unknown; content?: unknown };

  if (Array.isArray(m.images)) {
    for (const img of m.images) {
      const url = urlFrom(img);
      if (url) return url;
    }
  }
  if (Array.isArray(m.content)) {
    for (const part of m.content) {
      const url = urlFrom(part);
      if (url) return url;
    }
  }
  if (typeof m.content === "string") {
    const s = m.content.trim();
    if (/^data:image\/[a-z+.-]+;base64,/i.test(s) || /^https:\/\/\S+$/i.test(s)) return s;
  }
  return null;
}

function badImage(reason: string): ApiError {
  const err = new ApiError("AI_BAD_RESPONSE", "The AI did not return a usable image. Please try again.");
  err.cause = reason;
  return err;
}

async function download(url: string, fetchImpl: typeof fetch): Promise<Buffer> {
  let res: Response;
  try {
    res = await fetchImpl(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
    });
  } catch (err) {
    throw badImage(`download failed: ${err instanceof Error ? err.message : String(err)}`);
  }
  if (!res.ok) throw badImage(`download failed with HTTP ${res.status}`);

  const type = res.headers.get("content-type") ?? "";
  if (!type.toLowerCase().startsWith("image/")) throw badImage(`unexpected content-type "${type}"`);

  const declared = Number(res.headers.get("content-length") ?? 0);
  if (declared > MAX_IMAGE_BYTES) throw badImage(`image too large (${declared} bytes)`);
  if (!res.body) throw badImage("empty download");

  // Read incrementally so an unbounded body cannot exhaust memory.
  const chunks: Uint8Array[] = [];
  let total = 0;
  const reader = res.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_IMAGE_BYTES) {
      await reader.cancel();
      throw badImage("image too large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

/** Turns an image reference (data URL, https URL or bare base64) into verified bytes. */
export async function resolveImage(ref: string, fetchImpl: typeof fetch = fetch): Promise<GeneratedImage> {
  let data: Buffer;
  if (/^https:\/\//i.test(ref)) {
    data = await download(ref, fetchImpl);
  } else if (/^[a-z]+:\/\//i.test(ref)) {
    // Only https downloads are allowed (no http, file, etc.).
    throw badImage("non-https image URL");
  } else {
    const base64 = ref.replace(/^data:image\/[a-z+.-]+;base64,/i, "").replace(/\s/g, "");
    if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(base64)) throw badImage("image data is not base64");
    if (base64.length * 0.75 > MAX_IMAGE_BYTES) throw badImage("image too large");
    data = Buffer.from(base64, "base64");
  }

  const ext = detectImageType(data);
  if (!ext) throw badImage("data is not a PNG, JPEG or WebP image");
  return { data, ext };
}

export async function generateImage(
  input: { title: string; content: string[] },
  deps: { send?: ChatSend; model?: string; fetch?: typeof fetch } = {},
): Promise<GeneratedImage> {
  const send = deps.send ?? ((...args: Parameters<ChatSend>) => getAIClient().chat.send(...args));
  const model = deps.model ?? getEnv().IMAGE_GENERATION_MODEL;

  let completion;
  try {
    completion = await send(
      {
        chatRequest: {
          model,
          messages: [
            { role: "system", content: IMAGE_SYSTEM_PROMPT },
            { role: "user", content: buildImageUserPrompt(input.title, input.content) },
          ],
          stream: false,
        },
      },
      requestOptions(IMAGE_TIMEOUT_MS),
    );
  } catch (err) {
    throw toApiError(err);
  }

  const message = completion && "choices" in completion ? completion.choices[0]?.message : undefined;
  const ref = findImageReference(message);
  if (!ref) throw badImage("no image in the AI response");

  return resolveImage(ref, deps.fetch);
}

import { z } from "zod";
import { ApiError } from "@/lib/api";
import { getEnv } from "@/lib/env";
import { getAIClient, requestOptions, toApiError, type ChatSend } from "@/lib/ai/client";
import { buildDeckUserPrompt, DECK_LAYOUTS, DECK_SYSTEM_PROMPT, type DeckLayout } from "@/lib/ai/prompts";

const DECK_TIMEOUT_MS = 90_000;
const DECK_MAX_TOKENS = 6_000;
/** One extra attempt when the response cannot be parsed or validated. */
const MAX_ATTEMPTS = 2;

export type GeneratedSlide = {
  slidenumber: number;
  title: string;
  subtitle: string;
  slideLayout: DeckLayout;
  content: string[];
};

export type GeneratedDeck = {
  title: string;
  slides: GeneratedSlide[];
};

// ── Lenient validation ───────────────────────────────────────────────────────
// Fix what can be fixed; reject only when there is nothing usable.

const text = z.preprocess(
  (v) => (typeof v === "number" ? String(v) : v),
  z.string().trim(),
);

const RawSlideSchema = z.object({
  title: text.pipe(z.string().min(1, "a slide is missing its title")),
  subtitle: text.optional().catch(undefined),
  slideLayout: z.unknown().optional(),
  content: z
    .preprocess(
      (v) => (typeof v === "string" ? [v] : v),
      z.array(z.unknown()),
    )
    .optional()
    .catch(undefined),
});

const RawDeckSchema = z.object({
  presentationTitle: text.optional().catch(undefined),
  slides: z.array(RawSlideSchema).min(1, "the response contains no slides"),
});

const LAYOUT_BY_KEY = new Map(
  DECK_LAYOUTS.map((l) => [l.toLowerCase(), l] as const),
);

function normalizeLayout(value: unknown, index: number): DeckLayout {
  if (index === 0) return "IntroSlide";
  if (typeof value === "string") {
    const key = value.replace(/[^a-z]/gi, "").toLowerCase();
    const match = LAYOUT_BY_KEY.get(key);
    if (match) return match;
  }
  return "TitleBullets";
}

function normalizeDeck(raw: z.infer<typeof RawDeckSchema>): GeneratedDeck {
  const slides = raw.slides.map((s, i) => ({
    // Numbering comes from position, not from the model.
    slidenumber: i + 1,
    title: s.title,
    subtitle: s.subtitle ?? "",
    slideLayout: normalizeLayout(s.slideLayout, i),
    content: (s.content ?? [])
      .map((c) => (typeof c === "string" || typeof c === "number" ? String(c).trim() : ""))
      .filter(Boolean),
  }));

  return {
    title: raw.presentationTitle || slides[0].title,
    slides,
  };
}

/**
 * Extracts a JSON object from model output that may be wrapped in a code
 * fence or surrounded by prose.
 */
export function extractJson(output: string): unknown {
  let s = output.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();

  try {
    return JSON.parse(s);
  } catch {
    const start = s.indexOf("{");
    const end = s.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(s.slice(start, end + 1));
    }
    throw new Error("response is not valid JSON");
  }
}

/** Parses and validates one model response into a deck. Throws with a reason. */
export function parseDeckResponse(output: string): GeneratedDeck {
  const json = extractJson(output);
  const result = RawDeckSchema.safeParse(json);
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message ?? "response does not match the schema");
  }
  return normalizeDeck(result.data);
}

function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((p) => (p && typeof p === "object" && "text" in p ? String(p.text) : ""))
      .join("");
  }
  return "";
}

/**
 * Generates a deck with one AI call, retrying once (with the error fed back to
 * the model) if the output cannot be parsed or validated. Network/provider
 * errors are not retried.
 */
export async function generateDeck(
  input: { topic: string; slideCount: number },
  deps: { send?: ChatSend; model?: string } = {},
): Promise<GeneratedDeck> {
  const send = deps.send ?? ((...args: Parameters<ChatSend>) => getAIClient().chat.send(...args));
  const model = deps.model ?? getEnv().TEXT_GENERATION_MODEL;

  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: DECK_SYSTEM_PROMPT },
    { role: "user", content: buildDeckUserPrompt(input.topic, input.slideCount) },
  ];

  let lastProblem = "";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let completion;
    try {
      completion = await send(
        {
          chatRequest: {
            model,
            messages,
            maxTokens: DECK_MAX_TOKENS,
            responseFormat: { type: "json_object" },
            stream: false,
          },
        },
        requestOptions(DECK_TIMEOUT_MS),
      );
    } catch (err) {
      throw toApiError(err);
    }

    const choice = completion && "choices" in completion ? completion.choices[0] : undefined;
    if (!choice) {
      throw new ApiError("AI_PROVIDER_ERROR", "The AI provider returned an empty response.");
    }

    const output = messageText(choice.message?.content);

    if (choice.finishReason === "length") {
      lastProblem = "the response was cut off because it was too long";
    } else {
      try {
        return parseDeckResponse(output);
      } catch (err) {
        lastProblem = err instanceof Error ? err.message : String(err);
      }
    }

    console.warn(`[ai:deck] attempt ${attempt} unusable: ${lastProblem}`);
    messages.push(
      { role: "assistant", content: output.slice(0, 4_000) },
      {
        role: "user",
        content: `Your previous response could not be used: ${lastProblem}. Reply again with ONLY the raw JSON object in the exact schema, keeping each slide concise.`,
      },
    );
  }

  throw new ApiError(
    "AI_BAD_RESPONSE",
    "The AI returned an invalid presentation. Please try again.",
  );
}

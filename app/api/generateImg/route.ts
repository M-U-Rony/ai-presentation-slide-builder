import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ApiError, apiOk, handleRoute, parseBody, requireSession } from "@/lib/api";
import { withGeneration } from "@/lib/usage";
import { generateImage } from "@/lib/ai/image";

const UPLOAD_DIR = path.join(process.cwd(), "public", "generated");
const PUBLIC_PREFIX = "/generated/";

// Only the slide id comes from the client; the prompt is built from the slide
// stored in the database (A3).
const BodySchema = z.object({
  slideId: z.string({ error: "slideId is required." }).min(1, "slideId is required."),
});

/** Deletes a previously generated image file, ignoring anything outside UPLOAD_DIR. */
async function removeGeneratedFile(publicUrl: string | null | undefined) {
  if (!publicUrl?.startsWith(PUBLIC_PREFIX)) return;
  const name = path.basename(publicUrl);
  if (!name || name !== publicUrl.slice(PUBLIC_PREFIX.length)) return;
  await fs.rm(path.join(UPLOAD_DIR, name), { force: true }).catch((err) => {
    console.error("[api:generateImg] failed to remove old image", name, err);
  });
}

export const POST = handleRoute("generateImg", async (req: NextRequest) => {
  const session = await requireSession();
  const { slideId } = await parseBody(req, BodySchema);

  const slide = await prisma.slide.findFirst({
    where: { id: slideId, presentation: { userId: session.user.id } },
    select: { id: true, title: true, content: true, imgUrl: true },
  });
  if (!slide) {
    throw new ApiError("NOT_FOUND", "Slide not found.");
  }

  const updatedSlide = await withGeneration(session.user.id, "IMAGE", async () => {
    const image = await generateImage({ title: slide.title, content: slide.content });

    const fileName = `slide_${slide.id}_${crypto.randomUUID()}.${image.ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(filePath, image.data);

    try {
      return await prisma.slide.update({
        where: { id: slide.id },
        data: { imgUrl: `${PUBLIC_PREFIX}${fileName}` },
      });
    } catch (err) {
      // Don't leave an orphaned file if the slide could not be updated.
      await fs.rm(filePath, { force: true });
      throw err;
    }
  });

  // The new image is saved; the one it replaced is no longer referenced.
  await removeGeneratedFile(slide.imgUrl);

  return apiOk({ image: updatedSlide.imgUrl, slide: updatedSlide });
});

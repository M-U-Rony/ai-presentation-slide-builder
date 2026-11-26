import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { allThemes } from "@/lib/theme";
import { apiOk, handleRoute, parseBody, requireSession } from "@/lib/api";
import { withGeneration } from "@/lib/usage";
import { generateDeck } from "@/lib/ai/deck";
import { MAX_PROMPT_LENGTH, MAX_SLIDES, MIN_SLIDES } from "@/lib/constants";

const themeIds = new Set(allThemes.map((t) => t.id));

const BodySchema = z.object({
  prompt: z
    .string({ error: "Prompt is required." })
    .trim()
    .min(1, "Prompt is required.")
    .max(MAX_PROMPT_LENGTH, `Prompt must be at most ${MAX_PROMPT_LENGTH} characters.`),
  slideCount: z.coerce
    .number({ error: "Slide count must be a number." })
    .int("Slide count must be a whole number.")
    .min(MIN_SLIDES, `At least ${MIN_SLIDES} slide is required.`)
    .max(MAX_SLIDES, `At most ${MAX_SLIDES} slides can be generated.`),
  themeId: z
    .string({ error: "Theme is required." })
    .refine((id) => themeIds.has(id), "Unknown theme."),
});

export const POST = handleRoute("generateSlides", async (req: NextRequest) => {
  const session = await requireSession();
  const { prompt, slideCount, themeId } = await parseBody(req, BodySchema);

  const presentation = await withGeneration(session.user.id, "DECK", async () => {
    const deck = await generateDeck({ topic: prompt, slideCount });

    // Single nested write: the presentation and all its slides are created
    // together or not at all.
    return prisma.presentation.create({
      data: {
        title: deck.title,
        totalSlides: deck.slides.length,
        themeColors: themeId,
        userId: session.user.id,
        slides: {
          create: deck.slides.map((slide) => ({ ...slide, imgUrl: "" })),
        },
      },
      select: { id: true },
    });
  });

  return apiOk({ presentationId: presentation.id });
});

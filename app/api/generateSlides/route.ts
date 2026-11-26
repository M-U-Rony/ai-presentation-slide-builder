import { OpenRouter } from '@openrouter/sdk';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Slide } from '@/lib/types';
import { getEnv } from '@/lib/env';
import { ApiError, apiOk, handleRoute, parseBody, requireSession } from '@/lib/api';

const BodySchema = z.object({
  promt: z.string().min(1, "Prompt is required."),
  slidecnt: z.coerce.number(),
  selectedThemeId: z.string().min(1, "Theme is required."),
});

export const POST = handleRoute("generateSlides", async (req: NextRequest) => {
    const session = await requireSession();
    const env = getEnv();

    const { promt, slidecnt, selectedThemeId } = await parseBody(req, BodySchema);

    const numericSlideCount = Number(slidecnt);
    if (isNaN(numericSlideCount) || numericSlideCount < 1 || numericSlideCount > 20) {
      throw new ApiError("VALIDATION_ERROR", "At maximum 20 slides can be generated.");
    }

    const client = new OpenRouter({
      apiKey: env.OPENROUTER_API_KEY
    });

const SYSTEM_PROMPT = `You are an expert AI presentation slide builder like Gamma.ai.
Your task is to generate engaging slide deck content based on a user topic and requested slide count.

AVAILABLE SLIDE LAYOUTS:
- "IntroSlide": Use ONLY for Slide 1. Headline title, subtitle, and presenter overview.
- "TitleBullets": Standard overview with 3-4 crisp bullet points.
- "StatGrid": For metrics, KPIs, numbers, and data points (e.g. "95% Retention", "$4.2M ARR").
- "Quote": For testimonials, impactful quotes, philosophy, or industry leaders.
  - "title": The raw quote text (without outer quote marks or attribution).
  - "subtitle": The person's name (e.g. "Satya Nadella").
  - "content": ["Person's role or organization (e.g. 'CEO of Microsoft')"]
- "ImageText": Narrative storytelling with a visual focus and text explanation.
- "ProcessSteps": For sequential step-by-step guides, workflows, or roadmaps.
- "Comparison": For comparing two sides (e.g. "Before vs After", "Pros vs Cons", "Old Way vs New Way").

CRITICAL REQUIREMENT:
Output ONLY valid, raw JSON. Do NOT include markdown formatting (\`\`\`json), intro text, or extra commentary.

EXACT JSON OUTPUT SCHEMA:
{
  "presentationTitle": "Main Presentation Title",
  "totalSlides": 5,
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide Heading",
      "subtitle": "Optional slide subheader",
      "slideLayout": "IntroSlide",
      "content": [
        "First key point or description",
        "Second key point"
      ]
    },
    {
      "slideNumber": 2,
      "title": "Key Performance Metrics",
      "subtitle": "Q3 Growth Highlights",
      "slideLayout": "StatGrid",
      "content": [
        "10x Faster Generation",
        "99.9% Uptime SLA",
        "500k+ Active Users"
      ]
    }
  ]
}

RULES:
1. Slide 1 must ALWAYS use "IntroSlide".
2. Select the most relevant "slideLayout" for each subsequent slide based on its content.
3. Keep bullet points concise and impactful (2-4 items per slide).
4. Create EXACTLY the requested slide count.`;


    const completion = await client.chat.send({
      chatRequest: {
        model: env.TEXT_GENERATION_MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: `Topic: "${promt}". Create exactly ${slidecnt} slides.`,
          },
        ],
      }
    });

    if (!completion || !('choices' in completion) || !completion.choices.length) {
      throw new ApiError("AI_PROVIDER_ERROR", "Failed to retrieve slide content from AI provider.");
    }

    const aiResponse = completion.choices[0].message?.content;
    const presentationObject = JSON.parse(aiResponse as string);
    // Execute atomic creation via Prisma nested write: all slides create together or rollback
    if (!presentationObject.slides || !Array.isArray(presentationObject.slides) || presentationObject.slides.length === 0) {
      throw new Error("No valid slides found in AI response");
    }

    const newPresentation = await prisma.presentation.create({
      data: {
        title: presentationObject.presentationTitle,
        totalSlides: presentationObject.totalSlides,
        themeColors: selectedThemeId,
        userId: session.user.id,
        slides: {
          create: presentationObject.slides.map((slide: Slide) => ({
            title: slide.title,
            subtitle: slide.subtitle || "",
            slideLayout: slide.slideLayout,
            imgUrl: "",
            slidenumber: slide.slideNumber,
            content: slide.content || [],
          })),
        },
      },
    });

    return apiOk({ presentationId: newPresentation.id });
});

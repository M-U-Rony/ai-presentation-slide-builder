import { OpenRouter } from '@openrouter/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Slide } from '@/lib/types';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

export async function POST(req: NextRequest) {
  try {
    const { promt, slidecnt, selectedThemeId } = await req.json();

    if (!promt || !slidecnt || !selectedThemeId) {
      return NextResponse.json(
        { error: "Both prompt and slide count are required." },
        { status: 400 }
      );
    }

    const client = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY
    });

const SYSTEM_PROMPT = `You are an expert AI presentation slide builder like Gamma.ai.
Your task is to generate engaging slide deck content based on a user topic and requested slide count.

AVAILABLE SLIDE LAYOUTS:
- "IntroSlide": Use ONLY for Slide 1. Headline title, subtitle, and presenter overview.
- "TitleBullets": Standard overview with 3-4 crisp bullet points.
- "StatGrid": For metrics, KPIs, numbers, and data points (e.g. "95% Retention", "$4.2M ARR").
- "Quote": For testimonials, impactful quotes, philosophy, or customer feedback.
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
        model: process.env.Text_Generation_Model,
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
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve slide content from AI provider.' },
        { status: 502 }
      );
    }

    const aiResponse = completion.choices[0].message?.content;
    const presentationObject = JSON.parse(aiResponse as string);
    console.log("\n\n", presentationObject, "\n\n");

    // Ensure default user "1" exists in DB
    await prisma.user.upsert({
      where: { id: "1" },
      update: {},
      create: { id: "1", email: "user1@example.com", name: "Default User" }
    });

    const newPresentation = await prisma.prsesentation.create({
      data: {
        title: presentationObject.presentationTitle,
        totalSlides: presentationObject.totalSlides,
        themeColors: selectedThemeId,
        userId: "1" // Default user String ID
      }
    });

    const newSlides = await prisma.slide.createMany({
      data: presentationObject.slides.map((slide: Slide) => ({
        title: slide.title,
        subtitle: slide.subtitle || "",
        slideLayout: slide.slideLayout,
        imgUrl: "",
        slidenumber: slide.slideNumber,
        content: slide.content || [],
        presentationId: newPresentation.id,
      })),
    });

    return NextResponse.json({
      success: true,
      presentationId: newPresentation.id
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to generate slide content",
        details: error
      },
      { status: 500 }
    );
  }
}
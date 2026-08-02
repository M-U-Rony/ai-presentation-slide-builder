import { OpenRouter } from '@openrouter/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient} from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Slide } from '@/lib/types';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

export async function POST(req:NextRequest) {

try{

const {promt,slidecnt,selectedThemeId} = await req.json();

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
Your task is to generate engaging slide deck content based on a user topic and requested slide count. User may give presentation topic only or slide content also.
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
      "content": [
        "First key point",
        "Second key point",
        "Third key point"
      ],
    }
  ]
}
RULES:
1. Create EXACTLY the number of slides requested by the user.
2. Slide 1 must be a compelling title/intro slide.
3. Keep bullet points concise, impactful, and presentation-ready (3-4 points per slide).
4. Ensure logical flow across slides.`;


const completion = await client.chat.send({
    chatRequest:{

        model: "deepseek/deepseek-v4-flash",
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
    console.log("presentationObject",presentationObject)


    const newPresentation = await prisma.prsesentation.create({
      data:{
        title: presentationObject.presentationTitle,
        totalSlides: presentationObject.totalSlides,
        themeColors: selectedThemeId,
        userId: 1 // TODO: Add userId here
      }
    })

    console.log("newPresentation",newPresentation);

    const newSlides = await prisma.slide.createMany({
  data: presentationObject.slides.map((slide: Slide) => ({
    title: slide.title,
    subtitle: slide.subtitle || "",
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
}

catch(error){
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
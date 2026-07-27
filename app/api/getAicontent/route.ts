import { OpenRouter } from '@openrouter/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {

    // check the auth

try{

const {promt,slidecnt} = await req.json();

if (!promt || !slidecnt) {
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
CRITICAL REQUIREMENT:
Output ONLY valid, raw JSON. Do NOT include markdown formatting (\`\`\`json), intro text, or extra commentary.
EXACT JSON OUTPUT SCHEMA:
{
  "presentationTitle": "Main Presentation Title",
  "presentationSubtitle": "Short catchphrase or subtitle",
  "totalSlides": 5,
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide Heading",
      "subtitle": "Optional slide subheader",
      "bulletPoints": [
        "First key point",
        "Second key point",
        "Third key point"
      ],
      "keyTakeaway": "Short summary line for this slide"
    }
  ]
}
RULES:
1. Create EXACTLY the number of slides requested by the user.
2. Slide 1 must be a compelling title/intro slide.
3. The last slide must be a summary or Call to Action (CTA).
4. Keep bullet points concise, impactful, and presentation-ready (3-4 points per slide).
5. Ensure logical flow across slides.`;


const completion = await client.chat.send({
    chatRequest:{

        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
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

    return NextResponse.json({
      success: true,
      data: presentationObject,
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
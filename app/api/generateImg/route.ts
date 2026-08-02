import { OpenRouter } from '@openrouter/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Slide } from '@/lib/types';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

function extractImageString(img: any): string | null {
    if (!img) return null;
    if (typeof img === 'string') return img;
    if (typeof img.url === 'string') return img.url;
    if (typeof img.imageUrl === 'string') return img.imageUrl;
    if (typeof img.image_url === 'string') return img.image_url;
    if (typeof img.imageUrl?.url === 'string') return img.imageUrl.url;
    if (typeof img.image_url?.url === 'string') return img.image_url.url;
    return null;
}

export async function POST(req: NextRequest) {
    const { slideId, title, content } = await req.json();

    if (!slideId || !title || !content) {
        return NextResponse.json({
            error: "mission variables"
        });
    }
    try {
        const client = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY
        });

        const SYSTEM_PROMPT = `You are an expert AI visual designer for modern presentation slides.
Your task is to generate a stunning visual graphic illustration or 3D abstract artwork for slide decks.

CRITICAL REQUIREMENT - NO TEXT:
- Do NOT render any words, text, letters, numbers, labels, captions, or typography in the image under any circumstances.
- The image must be 100% pure visual graphics, abstract shapes, minimalist visual elements, isometric artwork, or professional photography.

VISUAL DESIGN GUIDELINES:
1. Visual Style: Modern, clean, vibrant, 3D abstract render, minimalist visual graphic, isometric art, or sleek photography suitable for slides.
2. Conceptual Relevance: Visually represent the concepts of the slide title and content using visual metaphors and symbolic design.
3. Aesthetic Excellence: Professional Studio lighting, smooth gradient backgrounds, zero text distortion, zero watermarks.`;

        const completion = await client.chat.send({
            chatRequest: {
                model: "google/gemini-2.5-flash-image",
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: 'user',
                        content: `Generate a pure visual graphic with NO text/words for a slide titled "${title}". Slide themes: ${Array.isArray(content) ? content.join(', ') : content}. Strictly NO text, NO words, NO letters.`,
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

        const message = completion.choices[0].message as any;

        let aiResponse: string | null = null;

        // 1. OpenRouter image generation models return images array in message.images
        if (message?.images && Array.isArray(message.images) && message.images.length > 0) {
            aiResponse = extractImageString(message.images[0]);
        }
        
        if (!aiResponse && typeof message?.content === 'string') {
            aiResponse = message.content;
        } else if (!aiResponse && Array.isArray(message?.content)) {
            for (const part of message.content) {
                const extracted = extractImageString(part);
                if (extracted) {
                    aiResponse = extracted;
                    break;
                }
            }
        }

        if (!aiResponse) {
            console.error("No image found in OpenRouter completion message:", message);
            return NextResponse.json(
                { success: false, error: 'No image returned from AI provider.' },
                { status: 500 }
            );
        }

        const fileName = `slide_${slideId}_${crypto.randomUUID()}.png`;
        const uploadDir = path.join(process.cwd(), 'public', 'generated');
        const filePath = path.join(uploadDir, fileName);

        await fs.mkdir(uploadDir, { recursive: true });

        if (aiResponse.startsWith('http://') || aiResponse.startsWith('https://')) {
            // Download remote image
            const imageRes = await fetch(aiResponse);
            if (imageRes.ok) {
                const arrayBuffer = await imageRes.arrayBuffer();
                await fs.writeFile(filePath, Buffer.from(arrayBuffer));
            } else {
                console.error("Failed to download image from URL:", aiResponse);
            }
        } else {
            // Decode base64 image data
            const base64Data = aiResponse.replace(/^data:image\/\w+;base64,/, '').trim();
            const imageBuffer = Buffer.from(base64Data, 'base64');
            await fs.writeFile(filePath, imageBuffer);
        }

        const publicImgUrl = `/generated/${fileName}`;

        const updatedSlide = await prisma.slide.update({
            where: {
                id: Number(slideId)
            },
            data: {
                imgUrl: publicImgUrl
            }
        });

        return NextResponse.json({
            success: true,
            image: publicImgUrl,
            slide: updatedSlide
        });
    }

    catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: "Failed to generate image",
                details: error
            },
            { status: 500 }
        );
    }

}
import { OpenRouter } from '@openrouter/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Slide } from '@/lib/types';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

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

        const SYSTEM_PROMPT = `You are an elite editorial presentation photographer and commercial visual director.
Your task is to generate a breathtaking, ultra-photorealistic, high-end photograph suitable for modern Fortune 500 presentation slide decks.

PHOTOREALISM & AESTHETIC DIRECTIVES:
1. Photographic Style: Ultra-realistic editorial commercial photography, 8K resolution, photorealistic, shot on high-end 35mm/85mm lens, natural cinematic lighting, subtle depth of field (bokeh).
2. Subject Matter: Authentic real-world environments, modern architectural spaces, contemporary professional teams, sleek real technology/hardware, or elegant conceptual macro photography directly reflecting the slide topic.
3. Quality: Crisp focus, natural skin and material textures, premium commercial color grading, professional composition.
4. STRICT PROHIBITIONS:
   - NO 3D cartoon renders, NO low-poly CGI, NO plastic surreal mannequins, NO clip art.
   - Absolutely NO text, letters, words, numbers, labels, typography, or watermarks in the image.`;

        const completion = await client.chat.send({
            chatRequest: {
                model: process.env.Image_Generation_Model,
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: 'user',
                        content: `High-end, photorealistic commercial photography capturing the concept: "${title}". Context: ${Array.isArray(content) ? content.join('. ') : content}. Style: Authentic real-world scene, 8K UHD, cinematic studio lighting, photorealistic, professional editorial composition. Strictly NO text, NO words, NO typography.`,
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
                id: String(slideId)
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
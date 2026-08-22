import { z } from "zod";

// 1. Intro Slide (Slide 1 Hero / Title Deck)
export const IntroSlideSchema = z.object({
  layoutType: z.literal("intro"),
  slideNumber: z.number().optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  presenter: z.string().optional(),
  date: z.string().optional(),
});
export type IntroSlide = z.infer<typeof IntroSlideSchema>;

// 2. Title & Bullets Slide (Default Overview)
export const TitleBulletsSlideSchema = z.object({
  layoutType: z.literal("title_bullets"),
  slideNumber: z.number().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  imgUrl: z.string().optional(),
});
export type TitleBulletsSlide = z.infer<typeof TitleBulletsSlideSchema>;

// 3. Stat Grid Slide (Key Metrics & KPIs)
export const StatItemSchema = z.object({
  value: z.string(),
  label: z.string(),
  change: z.string().optional(),
});
export type StatItem = z.infer<typeof StatItemSchema>;

export const StatGridSlideSchema = z.object({
  layoutType: z.literal("stat_grid"),
  slideNumber: z.number().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  stats: z.array(StatItemSchema),
});
export type StatGridSlide = z.infer<typeof StatGridSlideSchema>;

// 4. Quote Slide (Vision & Testimonials)
export const QuoteSlideSchema = z.object({
  layoutType: z.literal("quote"),
  slideNumber: z.number().optional(),
  quote: z.string(),
  author: z.string(),
  titleOrRole: z.string().optional(),
});
export type QuoteSlide = z.infer<typeof QuoteSlideSchema>;

// 5. Image & Text Narrative Slide
export const ImageTextSlideSchema = z.object({
  layoutType: z.literal("image_text"),
  slideNumber: z.number().optional(),
  title: z.string(),
  text: z.string(),
  bullets: z.array(z.string()).optional(),
  imagePosition: z.enum(["left", "right"]).default("right"),
  imgUrl: z.string().optional(),
});
export type ImageTextSlide = z.infer<typeof ImageTextSlideSchema>;

// 6. Process Steps Slide (Roadmap & Sequential Steps)
export const ProcessStepItemSchema = z.object({
  stepNumber: z.number().optional(),
  title: z.string(),
  description: z.string(),
});
export type ProcessStepItem = z.infer<typeof ProcessStepItemSchema>;

export const ProcessStepsSlideSchema = z.object({
  layoutType: z.literal("process_steps"),
  slideNumber: z.number().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  steps: z.array(ProcessStepItemSchema),
});
export type ProcessStepsSlide = z.infer<typeof ProcessStepsSlideSchema>;

// 7. Comparison Slide (Contrasting Columns)
export const ColumnSchema = z.object({
  title: z.string(),
  points: z.array(z.string()),
});
export type ComparisonColumn = z.infer<typeof ColumnSchema>;

export const ComparisonSlideSchema = z.object({
  layoutType: z.literal("comparison"),
  slideNumber: z.number().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  leftColumn: ColumnSchema,
  rightColumn: ColumnSchema,
});
export type ComparisonSlide = z.infer<typeof ComparisonSlideSchema>;

// Discriminated Union for all 7 Slide Layouts
export const SlideLayoutSchema = z.discriminatedUnion("layoutType", [
  IntroSlideSchema,
  TitleBulletsSlideSchema,
  StatGridSlideSchema,
  QuoteSlideSchema,
  ImageTextSlideSchema,
  ProcessStepsSlideSchema,
  ComparisonSlideSchema,
]);
export type SlideLayout = z.infer<typeof SlideLayoutSchema>;

// AI API Response Schema
export const PresentationResponseSchema = z.object({
  presentationTitle: z.string(),
  totalSlides: z.number(),
  slides: z.array(SlideLayoutSchema),
});
export type PresentationResponse = z.infer<typeof PresentationResponseSchema>;

/**
 * Parses slide content with fallback for legacy string arrays
 */
export function parseSlideData(data: any): SlideLayout {
  if (!data) {
    return {
      layoutType: "title_bullets",
      title: "Untitled Slide",
      subtitle: "",
      bullets: [],
    };
  }

  if (data.layoutType) {
    return data as SlideLayout;
  }

  // Check if content array contains serialized layout JSON
  if (Array.isArray(data.content) && data.content.length > 0) {
    const first = data.content[0];
    if (typeof first === "string" && first.startsWith("__LAYOUT__:")) {
      try {
        const parsed = JSON.parse(first.slice(11));
        if (parsed && parsed.layoutType) {
          if (data.imgUrl && !parsed.imgUrl) {
            parsed.imgUrl = data.imgUrl;
          }
          return parsed as SlideLayout;
        }
      } catch (e) {
        console.error("Failed to parse __LAYOUT__ data", e);
      }
    }
  }

  // Detect if Slide 1 is an intro slide
  if (data.slideNumber === 1 || data.slidenumber === 1) {
    return {
      layoutType: "intro",
      title: data.title || "Untitled Presentation",
      subtitle: data.subtitle || (Array.isArray(data.content) ? data.content[0] : ""),
      eyebrow: "Presentation Overview",
      presenter: "Presenter",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
  }

  // Fallback to title_bullets
  return {
    layoutType: "title_bullets",
    title: data.title || "Untitled Slide",
    subtitle: data.subtitle || "",
    bullets: Array.isArray(data.content)
      ? data.content.filter((c: string) => typeof c === "string" && !c.startsWith("__LAYOUT__:"))
      : [],
    imgUrl: data.imgUrl || undefined,
  };
}

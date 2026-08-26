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
 * Robust normalizer that converts any flat slide record into typed SlideLayout data
 */
export function resolveSlideLayoutData({
  title = "Untitled Slide",
  subtitle = "",
  slideLayout,
  content = [],
  imgUrl,
  slideNumber,
}: {
  title?: string;
  subtitle?: string;
  slideLayout?: string | SlideLayout;
  content?: string[];
  imgUrl?: string;
  slideNumber?: number;
}): SlideLayout {
  // If already a structured SlideLayout object
  if (
    typeof slideLayout === "object" &&
    slideLayout !== null &&
    "layoutType" in slideLayout
  ) {
    return slideLayout;
  }

  // Normalize layout name string from LLM (e.g. "IntroSlide", "StatGrid", "Quote", "ProcessSteps", "Comparison", "ImageText")
  let normalizedType = "title_bullets";
  if (typeof slideLayout === "string" && slideLayout.trim()) {
    const raw = slideLayout.toLowerCase().replace(/[\s_-]/g, "");
    if (raw.includes("intro")) normalizedType = "intro";
    else if (raw.includes("stat")) normalizedType = "stat_grid";
    else if (raw.includes("quote")) normalizedType = "quote";
    else if (raw.includes("image")) normalizedType = "image_text";
    else if (raw.includes("step") || raw.includes("process"))
      normalizedType = "process_steps";
    else if (
      raw.includes("compar") ||
      raw.includes("versus") ||
      raw.includes("vs")
    )
      normalizedType = "comparison";
    else if (raw.includes("bullet") || raw.includes("title"))
      normalizedType = "title_bullets";
  } else if (slideNumber === 1) {
    normalizedType = "intro";
  }

  switch (normalizedType) {
    case "intro": {
      // Find a clean short eyebrow or default to OVERVIEW
      let eyebrow = "OVERVIEW";
      let resolvedSubtitle = subtitle;

      if (content.length > 0) {
        if (!resolvedSubtitle) {
          resolvedSubtitle = content[0];
        }
        // If there's a short second item (<= 35 chars), it can be an eyebrow tag
        if (content.length > 1 && content[1].length <= 35) {
          eyebrow = content[1];
        } else if (content[0].length <= 35 && content.length > 1) {
          eyebrow = content[0];
          resolvedSubtitle = content[1];
        }
      }

      const introData: IntroSlide = {
        layoutType: "intro",
        slideNumber,
        title: title || "Untitled Presentation",
        subtitle: resolvedSubtitle || "",
        eyebrow,
        presenter: "SlideSpark Studio",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      return introData;
    }

    case "stat_grid": {
      const parsedStats = (content || []).map((item, idx) => {
        const trimmed = item.trim();

        // Case 1: "Label: Value" or "Value: Label"
        if (trimmed.includes(":")) {
          const [p1, p2] = trimmed.split(":").map((s) => s.trim());
          if (/^[\$\+€£\d]/.test(p1)) {
            return { value: p1, label: p2 || "Key Metric" };
          }
          if (/^[\$\+€£\d]/.test(p2)) {
            return { value: p2, label: p1 || "Key Metric" };
          }
          return { value: p1.length <= 8 ? p1 : `0${idx + 1}`, label: p2 || p1 };
        }

        // Case 2: Starts with number/metric (e.g. "8M tons of plastic enter oceans", "50% single use")
        const startMetricMatch = trimmed.match(
          /^(\+?\$?€?£?\d+[\d\.,]*\s*(?:[%xXkKmMbBtT\+]|years?|days?|hours?|hrs?|mins?|sec?)?|\+\d+%?)\s+(.+)$/i,
        );
        if (startMetricMatch) {
          return { value: startMetricMatch[1].trim(), label: startMetricMatch[2].trim() };
        }

        // Case 3: Embedded metric anywhere inside the sentence (e.g. "Plastic bottles take 400+ years to decompose")
        const embeddedMatch = trimmed.match(
          /(?:take|reach|over|about|nearly|approx\s*)?\s*(\+?\$?€?£?\d+[\d\.,]*\s*(?:[%xXkKmMbBtT\+]|years?|days?|hours?|hrs?|mins?|sec?)?)\s*(.*)/i,
        );
        if (embeddedMatch && embeddedMatch[1] && /\d/.test(embeddedMatch[1])) {
          const metricVal = embeddedMatch[1].trim();
          const cleanLabel = trimmed.replace(metricVal, "").replace(/\s+/g, " ").trim();
          return {
            value: metricVal,
            label: cleanLabel || "Key Metric",
          };
        }

        // Case 4: Non-numeric point -> index badge with full text label
        return { value: `0${idx + 1}`, label: trimmed };
      });

      const stats =
        parsedStats.length > 0
          ? parsedStats
          : [
              { value: "10x", label: "Productivity Increase" },
              { value: "99.9%", label: "System Reliability" },
              { value: "500k+", label: "Active Creators" },
            ];

      const statData: StatGridSlide = {
        layoutType: "stat_grid",
        slideNumber,
        title: title || "Key Performance Metrics",
        subtitle: subtitle || "",
        stats,
      };
      return statData;
    }

    case "quote": {
      const cleanQuotes = (str?: string) =>
        (str || "").replace(/^["'“‘«„`]+/, "").replace(/["'”’»‟`]+$/, "").trim();

      // Collect all potential text candidates from title, subtitle, and content
      const allTexts: string[] = [title, subtitle, ...content]
        .map((s) => (s ? cleanQuotes(s) : ""))
        .filter((s) => s.length > 0);

      // Find the quote: The longest string is always the actual quote statement
      let rawQuote = "";
      let remainingTexts: string[] = [];

      if (allTexts.length > 0) {
        // Sort by length descending to find the longest string (the quote)
        const sortedByLength = [...allTexts].sort((a, b) => b.length - a.length);
        rawQuote = sortedByLength[0];

        // Filter out the selected quote from the remaining candidates
        const quoteIdx = allTexts.indexOf(rawQuote);
        remainingTexts = allTexts.filter((_, idx) => idx !== quoteIdx);
      } else {
        rawQuote = "Innovation distinguishes between a leader and a follower.";
      }

      let rawAuthor = "";
      let rawRole = "";

      // Check if the quote contains an inline attribution separator like "...quote..." — Author, Role
      const dashMatch = rawQuote.match(/^(.+?)\s*(?:—|–|--|-)\s*([^—–-]+)$/);
      if (dashMatch && dashMatch[1].length > 15) {
        rawQuote = dashMatch[1].trim();
        const authorAndRole = dashMatch[2].trim();
        if (authorAndRole.includes(",")) {
          const parts = authorAndRole.split(",").map((s) => s.trim());
          rawAuthor = parts[0];
          rawRole = parts.slice(1).join(", ");
        } else {
          rawAuthor = authorAndRole;
        }
      }

      // Assign author and role from the remaining texts if not yet populated
      if (!rawAuthor && remainingTexts.length > 0) {
        rawAuthor = remainingTexts[0];
        if (remainingTexts.length > 1) {
          rawRole = remainingTexts.slice(1).join(" • ");
        }
      } else if (rawAuthor && !rawRole && remainingTexts.length > 0) {
        rawRole = remainingTexts.join(" • ");
      }

      if (!rawAuthor) {
        rawAuthor = "Key Insight";
      }

      const quoteData: QuoteSlide = {
        layoutType: "quote",
        slideNumber,
        quote: cleanQuotes(rawQuote),
        author: cleanQuotes(rawAuthor),
        titleOrRole: cleanQuotes(rawRole),
      };
      return quoteData;
    }

    case "image_text": {
      // If subtitle is present, preserve all content items as bullets
      const resolvedText = subtitle || (content.length > 0 ? content[0] : "");
      const resolvedBullets =
        subtitle && content.length > 0
          ? content
          : content.length > 1
          ? content.slice(1)
          : [];

      const imageTextData: ImageTextSlide = {
        layoutType: "image_text",
        slideNumber,
        title: title || "Visual Narrative",
        text: resolvedText,
        bullets: resolvedBullets,
        imgUrl: imgUrl || undefined,
        imagePosition: "right",
      };
      return imageTextData;
    }

    case "process_steps": {
      const parsedSteps = (
        content.length > 0
          ? content
          : [
              "Discovery & Scope: Analyze requirements and define the roadmap",
              "Design & Prototype: Build interactive wireframes and components",
              "Launch & Scale: Deploy to production and optimize outcomes",
            ]
      ).map((item, idx) => {
        let stepTitle = item;
        let stepDesc = "";
        if (item.includes(":")) {
          const [t, d] = item.split(":").map((s) => s.trim());
          stepTitle = t;
          stepDesc = d;
        } else if (item.includes(" - ")) {
          const [t, d] = item.split(" - ").map((s) => s.trim());
          stepTitle = t;
          stepDesc = d;
        }
        // Strip duplicate numbering like "1. Reduce" or "Step 1: Reduce"
        stepTitle = stepTitle.replace(/^(step\s*\d+[:.\s-]*|\d+[:.\s-]*)/i, "").trim() || stepTitle;

        return {
          stepNumber: idx + 1,
          title: stepTitle,
          description: stepDesc || subtitle || "",
        };
      });

      const processData: ProcessStepsSlide = {
        layoutType: "process_steps",
        slideNumber,
        title: title || "Execution Roadmap",
        subtitle: subtitle || "",
        steps: parsedSteps,
      };
      return processData;
    }

    case "comparison": {
      const half = Math.ceil(content.length / 2);
      const left = content.slice(0, Math.max(1, half));
      const right = content.slice(Math.max(1, half));

      // Extract left/right titles from slide title if formatted as "A vs B"
      let leftTitle = "Current State";
      let rightTitle = "Target Future";

      const vsMatch = (title || "").match(/(.+?)\s+(?:vs\.?|versus|\/)\s+(.+)/i);
      if (vsMatch) {
        leftTitle = vsMatch[1].trim();
        rightTitle = vsMatch[2].trim();
      }

      const comparisonData: ComparisonSlide = {
        layoutType: "comparison",
        slideNumber,
        title: title || "Comparative Analysis",
        subtitle: subtitle || "Key differences and strategic advantages",
        leftColumn: {
          title: leftTitle,
          points:
            left.length > 0
              ? left
              : ["Baseline approach", "Standard workflow"],
        },
        rightColumn: {
          title: rightTitle,
          points:
            right.length > 0
              ? right
              : ["Optimized solution", "Accelerated outcomes"],
        },
      };
      return comparisonData;
    }

    case "title_bullets":
    default: {
      const bulletsData: TitleBulletsSlide = {
        layoutType: "title_bullets",
        slideNumber,
        title: title || "Untitled Slide",
        subtitle: subtitle || "",
        bullets: content,
        imgUrl: imgUrl || undefined,
      };
      return bulletsData;
    }
  }
}

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

  return resolveSlideLayoutData({
    title: data.title,
    subtitle: data.subtitle,
    slideLayout: data.slideLayout,
    content: data.content,
    imgUrl: data.imgUrl,
    slideNumber: data.slideNumber || data.slidenumber,
  });
}

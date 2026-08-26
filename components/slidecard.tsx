"use client";

import React, { useMemo } from "react";
import { ThemeColors, allThemes } from "@/lib/theme";
import {
  SlideLayout,
  IntroSlide as IntroSlideType,
  TitleBulletsSlide,
  StatGridSlide,
  QuoteSlide,
  ImageTextSlide,
  ProcessStepsSlide,
  ComparisonSlide,
} from "@/lib/slideLayouts";
import {
  SketchbookGridOverlay,
  HighlighterWashOverlay,
  BotanicalCornerOverlay,
  TerracottaArchOverlay,
  BlueprintGridOverlay,
  BlushDotOverlay,
  EditorialFrameOverlay,
  NavyChevronOverlay,
  HexagonOverlay,
  GeometricFacetsOverlay,
  FramedEditorialOverlay,
  MinimalAuraOverlay,
  MemphisBlueOverlay,
  CorporateCapsuleOverlay,
  CyanStepsOverlay,
  MinimalistOrangeOverlay,
} from "./slide-themes";
import {
  IntroSlide,
  TitleBullets,
  StatGrid,
  Quote,
  ImageText,
  ProcessSteps,
  Comparison,
} from "./slide-layouts";

export interface slidecardProps {
  theme: ThemeColors | string;
  title?: string;
  subtitle?: string;
  slideLayout?: string | SlideLayout;
  content?: string[];
  imgUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isGeneratingImg?: boolean;
  isThumbnail?: boolean;
  slideNumber?: number;
}

function resolveSlideLayoutData({
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
      const introData: IntroSlideType = {
        layoutType: "intro",
        slideNumber,
        title: title || "Untitled Presentation",
        subtitle: subtitle || (content[0] ?? ""),
        eyebrow: content.length > 1 ? content[1] : "Presentation Overview",
        presenter: "SlideAI Studio",
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
        if (item.includes(":")) {
          const [p1, p2] = item.split(":").map((s) => s.trim());
          if (/^[\$\+\d]/.test(p1))
            return { value: p1, label: p2 || "Key Metric" };
          return { value: p2 || `#${idx + 1}`, label: p1 || "Key Metric" };
        }
        const match = item.match(
          /^(\+?\$?\d+[\d\.,]*[%xXkKmMbB\+]?|\+\d+%?)\s+(.+)$/,
        );
        if (match) {
          return { value: match[1], label: match[2] };
        }
        const words = item.split(" ");
        if (words.length > 1 && words[0].length <= 8) {
          return { value: words[0], label: words.slice(1).join(" ") };
        }
        return { value: `#${idx + 1}`, label: item };
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
      const quoteData: QuoteSlide = {
        layoutType: "quote",
        slideNumber,
        quote:
          content[0] ||
          subtitle ||
          title ||
          "Innovation distinguishes between a leader and a follower.",
        author: content[1] || "Visionary Perspective",
        titleOrRole: content[2] || subtitle || "Key Takeaway",
      };
      return quoteData;
    }

    case "image_text": {
      const imageTextData: ImageTextSlide = {
        layoutType: "image_text",
        slideNumber,
        title: title || "Visual Narrative",
        text: subtitle || content[0] || "Comprehensive insight and analysis.",
        bullets: content.length > 1 ? content.slice(1) : content,
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
        return {
          stepNumber: idx + 1,
          title: stepTitle,
          description: stepDesc || subtitle || "Execution phase.",
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

      const comparisonData: ComparisonSlide = {
        layoutType: "comparison",
        slideNumber,
        title: title || "Comparative Analysis",
        subtitle: subtitle || "Key differences and strategic advantages",
        leftColumn: {
          title: "Traditional Approach",
          points:
            left.length > 0
              ? left
              : ["Manual alignment", "Slow revisions", "Static decks"],
        },
        rightColumn: {
          title: "SlideAI Solution",
          points:
            right.length > 0
              ? right
              : [
                  "Autonomous slide design",
                  "Instant theme palettes",
                  "1-click exports",
                ],
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

export default function SlideCard({
  theme,
  title,
  subtitle,
  slideLayout,
  content,
  imgUrl,
  isSelected = false,
  onClick,
  isGeneratingImg = false,
  isThumbnail = false,
  slideNumber,
}: slidecardProps) {
  // Resolve theme object safely whether passed as object or string ID
  const activeTheme: ThemeColors =
    typeof theme === "string"
      ? allThemes.find((t) => t.id === theme) || allThemes[0]
      : theme || allThemes[0];

  const resolvedData = useMemo(() => {
    return resolveSlideLayoutData({
      title,
      subtitle,
      slideLayout,
      content,
      imgUrl,
      slideNumber,
    });
  }, [title, subtitle, slideLayout, content, imgUrl, slideNumber]);

  const overlayType = activeTheme.overlayType || "sketchbook-grid";

  const renderBackgroundOverlay = () => {
    switch (overlayType) {
      case "sketchbook-grid":
        return <SketchbookGridOverlay isThumbnail={isThumbnail} />;
      case "highlighter-wash":
        return <HighlighterWashOverlay isThumbnail={isThumbnail} />;
      case "botanical-corner":
        return <BotanicalCornerOverlay isThumbnail={isThumbnail} />;
      case "terracotta-arch":
        return <TerracottaArchOverlay isThumbnail={isThumbnail} />;
      case "blueprint-grid":
        return <BlueprintGridOverlay isThumbnail={isThumbnail} />;
      case "blush-dot":
        return <BlushDotOverlay isThumbnail={isThumbnail} />;
      case "editorial-frame":
        return <EditorialFrameOverlay isThumbnail={isThumbnail} />;
      case "navy-chevron":
        return <NavyChevronOverlay isThumbnail={isThumbnail} />;
      case "geometric-green":
        return <GeometricFacetsOverlay isThumbnail={isThumbnail} />;
      case "framed-editorial":
        return <FramedEditorialOverlay isThumbnail={isThumbnail} />;
      case "minimal-aura":
        return <MinimalAuraOverlay isThumbnail={isThumbnail} />;
      case "memphis-blue":
        return <MemphisBlueOverlay isThumbnail={isThumbnail} />;
      case "corporate-capsule":
        return <CorporateCapsuleOverlay isThumbnail={isThumbnail} />;
      case "cyan-steps":
        return <CyanStepsOverlay isThumbnail={isThumbnail} />;
      case "minimalist-orange":
        return <MinimalistOrangeOverlay isThumbnail={isThumbnail} />;
      case "hexagon":
      default:
        return <HexagonOverlay isThumbnail={isThumbnail} />;
    }
  };

  const renderLayoutContent = () => {
    switch (resolvedData.layoutType) {
      case "intro":
        return (
          <IntroSlide
            theme={activeTheme}
            data={resolvedData}
            isThumbnail={isThumbnail}
          />
        );
      case "stat_grid":
        return (
          <StatGrid
            theme={activeTheme}
            data={resolvedData}
            isThumbnail={isThumbnail}
          />
        );
      case "quote":
        return (
          <Quote
            theme={activeTheme}
            data={resolvedData}
            isThumbnail={isThumbnail}
          />
        );
      case "image_text":
        return (
          <ImageText
            theme={activeTheme}
            data={resolvedData}
            isGeneratingImg={isGeneratingImg}
            isThumbnail={isThumbnail}
          />
        );
      case "process_steps":
        return (
          <ProcessSteps
            theme={activeTheme}
            data={resolvedData}
            isThumbnail={isThumbnail}
          />
        );
      case "comparison":
        return (
          <Comparison
            theme={activeTheme}
            data={resolvedData}
            isThumbnail={isThumbnail}
          />
        );
      case "title_bullets":
      default:
        return (
          <TitleBullets
            theme={activeTheme}
            data={resolvedData}
            isGeneratingImg={isGeneratingImg}
            isThumbnail={isThumbnail}
          />
        );
    }
  };

  if (isThumbnail) {
    return (
      <div
        onClick={onClick}
        className={`w-full aspect-[16/9] rounded-[6px] border cursor-pointer select-none p-3 overflow-hidden flex flex-col justify-between transition-all relative ${
          activeTheme.background
        } ${
          isSelected
            ? `${activeTheme.activeRing}`
            : "border-slate-300/80 hover:border-slate-400"
        }`}
      >
        {renderBackgroundOverlay()}

        <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden">
          {renderLayoutContent()}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`w-full aspect-[16/9] rounded-[12px] border cursor-pointer transition-all duration-200 relative overflow-hidden select-none p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between shadow-lg ${
        activeTheme.background
      } ${
        isSelected
          ? `${activeTheme.activeRing} scale-[1.01]`
          : `${activeTheme.border} hover:scale-[1.002] hover:border-slate-400 opacity-95 hover:opacity-100`
      }`}
    >
      {/* Decorative Theme Overlay Background */}
      {renderBackgroundOverlay()}

      {/* Dynamic Slide Layout Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
        {renderLayoutContent()}
      </div>
    </div>
  );
}
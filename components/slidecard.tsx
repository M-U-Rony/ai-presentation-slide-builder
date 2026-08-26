"use client";

import React, { useMemo } from "react";
import { ThemeColors, allThemes } from "@/lib/theme";
import { resolveSlideLayoutData, SlideLayout } from "@/lib/slideLayouts";
import {
  SketchbookGridOverlay,
  HighlighterWashOverlay,
  BotanicalCornerOverlay,
  TerracottaArchOverlay,
  BlueprintGridOverlay,
  BlushDotOverlay,
  EditorialFrameOverlay,
  NavyChevronOverlay,
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
  isPrint?: boolean;
  slideNumber?: number;
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
  isPrint = false,
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
      case "sketchbook-grid":
      default:
        return <SketchbookGridOverlay isThumbnail={isThumbnail} />;
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

  if (isPrint) {
    return (
      <div
        className={`w-full h-full relative overflow-hidden select-none p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between ${
          activeTheme.background
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

  return (
    <div
      onClick={onClick}
      className={`w-full aspect-[16/9] rounded-[12px] border cursor-pointer transition-all duration-200 relative overflow-hidden select-none p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between shadow-lg ${
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
"use client";

import React, { useMemo } from "react";
import { ThemeColors } from "@/lib/theme";
import { SlideLayout, parseSlideData } from "@/lib/slideLayouts";
import {
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

interface slidecardProps {
  theme: ThemeColors;
  title: string;
  subtitle: string;
  content?: string[];
  imgUrl?: string;
  data?: SlideLayout;
  isSelected?: boolean;
  onClick?: () => void;
  isGeneratingImg?: boolean;
  isThumbnail?: boolean;
  slideNumber?: number;
}

export default function SlideCard({
  theme,
  title,
  subtitle,
  content,
  imgUrl,
  data,
  isSelected = false,
  onClick,
  isGeneratingImg = false,
  isThumbnail = false,
  slideNumber,
}: slidecardProps) {
  const slideData: SlideLayout = useMemo(() => {
    return data || parseSlideData({ title, subtitle, content, imgUrl, slideNumber });
  }, [data, title, subtitle, content, imgUrl, slideNumber]);

  const overlayType = theme.overlayType || "minimalist-orange";

  const renderBackgroundOverlay = () => {
    switch (overlayType) {
      case "minimalist-orange":
        return <MinimalistOrangeOverlay isThumbnail={isThumbnail} />;
      case "cyan-steps":
        return <CyanStepsOverlay isThumbnail={isThumbnail} />;
      case "corporate-capsule":
        return <CorporateCapsuleOverlay isThumbnail={isThumbnail} />;
      case "memphis-blue":
        return <MemphisBlueOverlay isThumbnail={isThumbnail} />;
      case "minimal-aura":
        return <MinimalAuraOverlay isThumbnail={isThumbnail} />;
      case "framed-editorial":
        return <FramedEditorialOverlay isThumbnail={isThumbnail} />;
      case "navy-chevron":
        return <NavyChevronOverlay isThumbnail={isThumbnail} />;
      case "geometric-green":
        return <GeometricFacetsOverlay isThumbnail={isThumbnail} />;
      case "hexagon":
      default:
        return <HexagonOverlay isThumbnail={isThumbnail} />;
    }
  };

  const renderLayoutContent = () => {
    switch (slideData.layoutType) {
      case "intro":
        return <IntroSlide theme={theme} data={slideData} isThumbnail={isThumbnail} />;
      case "stat_grid":
        return <StatGrid theme={theme} data={slideData} isThumbnail={isThumbnail} />;
      case "quote":
        return <Quote theme={theme} data={slideData} isThumbnail={isThumbnail} />;
      case "image_text":
        return (
          <ImageText
            theme={theme}
            data={slideData}
            isGeneratingImg={isGeneratingImg}
            isThumbnail={isThumbnail}
          />
        );
      case "process_steps":
        return <ProcessSteps theme={theme} data={slideData} isThumbnail={isThumbnail} />;
      case "comparison":
        return <Comparison theme={theme} data={slideData} isThumbnail={isThumbnail} />;
      case "title_bullets":
      default:
        return (
          <TitleBullets
            theme={theme}
            data={slideData}
            isGeneratingImg={isGeneratingImg}
            isThumbnail={isThumbnail}
          />
        );
    }
  };

  const isOrange = overlayType === "minimalist-orange";
  const isSteps = overlayType === "cyan-steps";
  const isCapsule = overlayType === "corporate-capsule";
  const isMemphis = overlayType === "memphis-blue";
  const isAura = overlayType === "minimal-aura";
  const isEditorial = overlayType === "framed-editorial";
  const isHexagon = overlayType === "hexagon";
  const isNavy = overlayType === "navy-chevron";

  if (isThumbnail) {
    return (
      <div
        onClick={onClick}
        className={`w-full aspect-[16/9] rounded-[6px] border cursor-pointer select-none p-2.5 overflow-hidden flex flex-col justify-between transition-all relative ${
          theme.background
        } ${
          isEditorial || isMemphis || isSteps
            ? "px-3.5 py-2.5"
            : isOrange
            ? "pl-3 pr-5 pb-3.5"
            : isCapsule
            ? "pl-3 pr-7"
            : isNavy
            ? "pl-5 pr-2"
            : isHexagon
            ? "pl-3 pr-5"
            : "pl-3.5 pr-3.5"
        } ${
          isSelected
            ? `${theme.activeRing}`
            : "border-slate-300 hover:border-slate-400"
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
      className={`w-full aspect-[16/9] rounded-[12px] border cursor-pointer transition-all duration-200 relative overflow-hidden select-none p-6 sm:p-10 md:p-14 flex flex-col justify-between shadow-lg ${
        isOrange
          ? "pl-10 sm:pl-16 md:pl-20 pr-16 sm:pr-24 md:pr-32 pt-8 sm:pt-12 md:pt-14 pb-14 sm:pb-20 md:pb-24"
          : isSteps
          ? "px-12 sm:px-20 md:px-28 py-10 sm:py-14 md:py-16"
          : isCapsule
          ? "pl-10 sm:pl-16 md:pl-20 pr-16 sm:pr-28 md:pr-40 lg:pr-52 py-10 sm:py-14 md:py-16"
          : isMemphis
          ? "px-12 sm:px-20 md:px-28 py-10 sm:py-14 md:py-16"
          : isAura
          ? "px-8 sm:px-14 md:px-20 py-8 sm:py-12 md:py-14"
          : isEditorial
          ? "px-10 sm:px-16 md:px-24 py-8 sm:py-12 md:py-16"
          : isNavy
          ? "pl-16 sm:pl-28 md:pl-36 lg:pl-44 pr-6 sm:pr-10 md:pr-14"
          : isHexagon
          ? "pl-8 sm:pl-14 md:pl-20 pr-16 sm:pr-24 md:pr-36"
          : "pl-10 sm:pl-16 md:pl-20 pr-16 sm:pr-24 md:pr-32"
      } ${theme.background} ${
        isSelected
          ? `${theme.activeRing} scale-[1.01]`
          : `${theme.border} hover:scale-[1.002] hover:border-slate-400 opacity-95 hover:opacity-100`
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
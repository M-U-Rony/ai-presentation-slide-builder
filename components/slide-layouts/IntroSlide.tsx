"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { IntroSlide as IntroSlideType } from "@/lib/slideLayouts";
import { Calendar, User } from "lucide-react";

interface IntroSlideProps {
  theme: ThemeColors;
  data: IntroSlideType;
  isThumbnail?: boolean;
}

export default function IntroSlide({
  theme,
  data,
  isThumbnail = false,
}: IntroSlideProps) {
  if (isThumbnail) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center overflow-hidden p-1 space-y-1 my-auto">
        {data.eyebrow && (
          <span className={`text-[7px] font-mono font-bold tracking-wider uppercase opacity-70 ${theme.accentText}`}>
            {data.eyebrow}
          </span>
        )}
        <h4 className={`text-[12px] font-display font-black line-clamp-2 leading-tight ${theme.primaryText}`}>
          {data.title}
        </h4>
        {data.subtitle && (
          <p className={`text-[8px] line-clamp-1 opacity-80 leading-tight ${theme.secondaryText}`}>
            {data.subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center text-center h-full max-w-4xl mx-auto py-4 sm:py-6 px-2 my-auto overflow-hidden">
      {/* Top Eyebrow Tag */}
      <div>
        {data.eyebrow ? (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 bg-current/[0.04]">
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${theme.accentText}`}>
              {data.eyebrow}
            </span>
          </div>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {/* Main Hero Title & Subtitle */}
      <div className="my-auto space-y-3 sm:space-y-4 max-w-3xl">
        <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] [text-wrap:balance] ${theme.primaryText}`}>
          {data.title}
        </h1>
        {data.subtitle && (
          <p className={`text-sm sm:text-base md:text-xl font-normal leading-relaxed opacity-85 max-w-2xl mx-auto ${theme.secondaryText}`}>
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Bottom Presenter & Date Metadata */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 pt-3 border-t border-current/15 w-full max-w-md">
        {data.presenter && (
          <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${theme.secondaryText}`}>
            <User className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <span className="line-clamp-1">{data.presenter}</span>
          </div>
        )}
        {data.date && (
          <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium opacity-70 ${theme.secondaryText}`}>
            <Calendar className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <span className="line-clamp-1">{data.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}

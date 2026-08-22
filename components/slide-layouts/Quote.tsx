"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { QuoteSlide } from "@/lib/slideLayouts";
import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  theme: ThemeColors;
  data: QuoteSlide;
  isThumbnail?: boolean;
}

export default function Quote({
  theme,
  data,
  isThumbnail = false,
}: QuoteProps) {
  if (isThumbnail) {
    return (
      <div className="flex-1 flex flex-col justify-between overflow-hidden p-1 text-center my-auto">
        <QuoteIcon className={`w-3.5 h-3.5 mx-auto opacity-40 ${theme.accentText}`} />
        <p className={`text-[9px] italic font-serif line-clamp-2 leading-tight my-auto ${theme.primaryText}`}>
          &ldquo;{data.quote}&rdquo;
        </p>
        <div className="border-t border-current/10 pt-0.5">
          <span className={`text-[8px] font-bold block line-clamp-1 ${theme.accentText}`}>
            — {data.author}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center h-full max-w-3xl mx-auto py-4 sm:py-6 px-4 text-center my-auto overflow-hidden">
      {/* Decorative quote icon */}
      <div className="mx-auto">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-current/20 flex items-center justify-center bg-current/[0.04] ${theme.accentText}`}>
          <QuoteIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current opacity-85" />
        </div>
      </div>

      {/* Main Quote Content */}
      <blockquote className="my-auto px-2 sm:px-6">
        <p className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium italic leading-relaxed sm:leading-snug line-clamp-4 [text-wrap:balance] ${theme.primaryText}`}>
          &ldquo;{data.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author & Attribution */}
      <div className="space-y-1 pt-3 border-t border-current/15 max-w-sm mx-auto w-full">
        <div className={`font-display text-base sm:text-lg font-bold tracking-wide ${theme.primaryText}`}>
          {data.author}
        </div>
        {data.titleOrRole && (
          <div className={`text-xs sm:text-sm font-normal opacity-80 ${theme.secondaryText}`}>
            {data.titleOrRole}
          </div>
        )}
      </div>
    </div>
  );
}

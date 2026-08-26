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
  // Strip any accidental leading or trailing quotation marks
  const cleanStr = (str?: string) =>
    (str || "").replace(/^["'“‘«„`]+/, "").replace(/["'”’»‟`]+$/, "").trim();

  const cleanQuote = cleanStr(data.quote);
  const cleanAuthor = cleanStr(data.author);
  const cleanRole = cleanStr(data.titleOrRole);

  if (isThumbnail) {
    return (
      <div className="flex-1 flex flex-col justify-between overflow-hidden p-1 text-center my-auto">
        <QuoteIcon className={`w-3 h-3 mx-auto opacity-40 ${theme.accentText}`} />
        <p className={`text-[9px] italic font-serif line-clamp-2 leading-tight my-auto ${theme.primaryText}`}>
          &ldquo;{cleanQuote}&rdquo;
        </p>
        <div className="border-t border-current/10 pt-0.5">
          <span className={`text-[8px] font-bold block line-clamp-1 ${theme.accentText}`}>
            — {cleanAuthor}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center h-full max-w-2xl mx-auto py-4 sm:py-6 px-4 text-center my-auto overflow-hidden">
      {/* Decorative quote icon */}
      <div className="mx-auto shrink-0">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-current/20 flex items-center justify-center bg-current/[0.04] ${theme.accentText}`}>
          <QuoteIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current opacity-85" />
        </div>
      </div>

      {/* Main Quote Content */}
      <blockquote className="my-auto px-2 sm:px-4 py-2">
        <p className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium italic leading-relaxed sm:leading-snug line-clamp-4 [text-wrap:balance] ${theme.primaryText}`}>
          &ldquo;{cleanQuote}&rdquo;
        </p>
      </blockquote>

      {/* Author & Attribution */}
      <div className="space-y-0.5 pt-2.5 border-t border-current/15 max-w-sm mx-auto w-full shrink-0">
        <div className={`font-display text-sm sm:text-base font-bold tracking-wide line-clamp-1 ${theme.primaryText}`}>
          {cleanAuthor}
        </div>
        {cleanRole && (
          <div className={`text-[11px] sm:text-xs font-normal opacity-80 line-clamp-1 ${theme.secondaryText}`}>
            {cleanRole}
          </div>
        )}
      </div>
    </div>
  );
}

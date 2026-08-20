"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { Loader2 } from "lucide-react";

interface slidecardProps {
  theme: ThemeColors;
  title: string;
  subtitle: string;
  content?: string[];
  imgUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isGeneratingImg?: boolean;
  isThumbnail?: boolean;
}

export default function SlideCard({
  theme,
  title,
  subtitle,
  content,
  imgUrl,
  isSelected = false,
  onClick,
  isGeneratingImg = false,
  isThumbnail = false,
}: slidecardProps) {
  const hasRightSide = Boolean(imgUrl || isGeneratingImg);

  if (isThumbnail) {
    return (
      <div
        onClick={onClick}
        className={`w-full aspect-[16/9] rounded-[6px] border cursor-pointer select-none p-2.5 overflow-hidden flex flex-col justify-between transition-all ${
          theme.background
        } ${
          isSelected
            ? "border-2 border-[#1a3300] shadow-[0_0_0_2px_#ffe95c]"
            : "border-[#b6b6b6] hover:border-[#1a3300]/60"
        }`}
      >
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="space-y-1">
            <h4 className={`text-[11px] font-display font-bold line-clamp-1 leading-tight ${theme.primaryText}`}>
              {title}
            </h4>
            {subtitle && (
              <p className={`text-[9px] line-clamp-1 opacity-80 leading-tight ${theme.secondaryText}`}>
                {subtitle}
              </p>
            )}
          </div>

          {content && content.length > 0 && (
            <div className="space-y-0.5 mt-1 border-t border-current/10 pt-1">
              {content.slice(0, 2).map((point, index) => (
                <div key={index} className="flex items-center gap-1 text-[8px] leading-none">
                  <span className="w-1 h-1 rounded-full bg-[#1a3300] shrink-0" />
                  <span className={`line-clamp-1 ${theme.secondaryText}`}>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`w-full aspect-[16/9] rounded-[12px] border cursor-pointer transition-all duration-200 relative overflow-hidden select-none p-6 sm:p-8 flex flex-col justify-between ${
        theme.border
      } ${theme.background} ${
        isSelected
          ? `${theme.activeRing} scale-[1.01]`
          : "hover:scale-[1.005] hover:border-[#1a3300] opacity-95 hover:opacity-100 shadow-sm"
      }`}
    >
      {/* Inner Card Presentation Canvas Container */}
      <div className={`w-full h-full rounded-[10px] ${theme.cardBg} border border-current/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative`}>
        <div className={`grid grid-cols-1 ${hasRightSide ? "md:grid-cols-12 gap-8" : "gap-6"} items-center h-full my-auto overflow-y-auto`}>
          
          {/* Left Column: Slide Typography & Bullets */}
          <div className={`${hasRightSide ? "md:col-span-7" : "col-span-full"} space-y-4 my-auto`}>
            <div className="space-y-2">
              <h2 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-[0.04em] leading-[1.1] [text-wrap:balance] ${theme.primaryText}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`text-sm sm:text-base font-normal leading-relaxed ${theme.secondaryText}`}>
                  {subtitle}
                </p>
              )}
            </div>

            {content && content.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-current/15">
                {content.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] mt-2 shrink-0" />
                    <span className={theme.secondaryText}>{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Slide Image Visual Container */}
          {hasRightSide && (
            <div className="md:col-span-5 w-full flex items-center justify-center h-full my-auto">
              {isGeneratingImg ? (
                <div className="w-full h-44 md:h-52 rounded-[12px] bg-black/5 border border-dashed border-[#1a3300]/40 flex flex-col items-center justify-center p-4 text-center gap-2.5 animate-pulse">
                  <div className="p-2.5 rounded-full bg-[#ffe95c] text-[#1a3300]">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="space-y-0.5">
                    <span className={`text-xs font-bold block ${theme.primaryText}`}>
                      Generating Visual Illustration...
                    </span>
                    <span className="text-[10px] text-[#1a3300]/60">Sketching visual artwork</span>
                  </div>
                </div>
              ) : imgUrl ? (
                <div className="relative w-full overflow-hidden rounded-[12px] border border-[#1a3300]/20 shadow-sm group/img max-h-52">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-44 md:h-52 object-cover rounded-[12px] transition-transform duration-500 group-hover/img:scale-105"
                  />
                </div>
              ) : null}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
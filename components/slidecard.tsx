"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { Check, Loader2 } from "lucide-react";

interface slidecardProps {
  theme: ThemeColors;
  title: string;
  subtitle: string;
  content?: string[];
  imgUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isGeneratingImg?: boolean;
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
}: slidecardProps) {
  const hasRightSide = Boolean(imgUrl || isGeneratingImg);

  return (
    <div
      onClick={onClick}
      className={`w-full rounded-[20px] border cursor-pointer transition-all duration-300 relative overflow-hidden select-none p-6 sm:p-8 shadow-md ${
        theme.border
      } ${theme.background} ${
        isSelected
          ? "ring-4 ring-[#22C55E] border-[#22C55E] shadow-xl shadow-[#22C55E]/20 scale-[1.02]"
          : "hover:scale-[1.01] hover:border-gray-400 hover:shadow-lg opacity-90 hover:opacity-100"
      }`}
    >
      {isSelected && (
        <div className="flex justify-end mb-3">
          <span className="bg-[#22C55E] text-white px-3 py-1 rounded-[16px] text-xs font-extrabold flex items-center gap-1 shadow-sm animate-in fade-in zoom-in duration-200">
            <Check className="w-3.5 h-3.5" />
            Selected
          </span>
        </div>
      )}

      {/* Inner Card Box */}
      <div className={`w-full rounded-[16px] ${theme.cardBg} border ${theme.border} p-6 shadow-inner`}>
        <div className={`grid grid-cols-1 ${hasRightSide ? "md:grid-cols-12 gap-6" : "gap-4"} items-center`}>
          {/* Left Column: Slide Content */}
          <div className={`${hasRightSide ? "md:col-span-7" : "col-span-full"} space-y-3`}>
            <h2 className={`text-xl font-bold tracking-tight ${theme.primaryText}`}>
              {title}
            </h2>
            <p className={`text-sm ${theme.secondaryText}`}>
              {subtitle}
            </p>

            {content && content.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-gray-200/20">
                {content.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                    <span className={theme.secondaryText}>{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Slide Image / AI Loading State */}
          {hasRightSide && (
            <div className="md:col-span-5 w-full flex items-center justify-center">
              {isGeneratingImg ? (
                <div className="w-full h-48 md:h-56 rounded-[16px] bg-gray-100/10 border-2 border-dashed border-gray-300/40 flex flex-col items-center justify-center p-4 text-center gap-2.5 animate-pulse">
                  <Loader2 className="w-6 h-6 text-[#22C55E] animate-spin" />
                  <span className={`text-xs font-semibold ${theme.secondaryText}`}>
                    Generating AI Image...
                  </span>
                </div>
              ) : imgUrl ? (
                <div className="relative w-full overflow-hidden rounded-[16px] border border-gray-200/30 shadow-md group/img">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-48 md:h-56 object-cover rounded-[16px] transition-transform duration-300 group-hover/img:scale-105"
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
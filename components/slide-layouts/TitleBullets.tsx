"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { TitleBulletsSlide } from "@/lib/slideLayouts";
import { Loader2 } from "lucide-react";

interface TitleBulletsProps {
  theme: ThemeColors;
  data: TitleBulletsSlide;
  isGeneratingImg?: boolean;
  isThumbnail?: boolean;
}

export default function TitleBullets({
  theme,
  data,
  isGeneratingImg = false,
  isThumbnail = false,
}: TitleBulletsProps) {
  const hasRightSide = Boolean(data.imgUrl || isGeneratingImg);

  if (isThumbnail) {
    return (
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-0.5">
          <h4 className={`text-[11px] font-display font-bold line-clamp-1 leading-tight ${theme.primaryText}`}>
            {data.title}
          </h4>
          {data.subtitle && (
            <p className={`text-[8px] line-clamp-1 opacity-80 leading-tight ${theme.secondaryText}`}>
              {data.subtitle}
            </p>
          )}
        </div>

        {data.bullets && data.bullets.length > 0 && (
          <div className="space-y-0.5 mt-1 border-t border-current/10 pt-0.5">
            {data.bullets.slice(0, 2).map((point, index) => (
              <div key={index} className="flex items-center gap-1 text-[7px] leading-none">
                <span className="w-1 h-1 rounded-full bg-current shrink-0 opacity-60" />
                <span className={`line-clamp-1 ${theme.secondaryText}`}>{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${hasRightSide ? "md:grid-cols-12 gap-8" : "gap-6"} items-center h-full my-auto overflow-hidden`}>
      {/* Left Column: Slide Typography & Bullets */}
      <div className={`${hasRightSide ? "md:col-span-7" : "col-span-full"} space-y-4 my-auto overflow-hidden`}>
        <div className="space-y-2">
          <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.12] [text-wrap:balance] ${theme.primaryText}`}>
            {data.title}
          </h2>
          {data.subtitle && (
            <p className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${theme.secondaryText}`}>
              {data.subtitle}
            </p>
          )}
        </div>

        {data.bullets && data.bullets.length > 0 && (
          <div className="space-y-2.5 pt-3 border-t border-current/15">
            {data.bullets.map((point, index) => (
              <div key={index} className="flex items-start gap-3 text-xs sm:text-sm md:text-base leading-relaxed">
                <span className={`w-2 h-2 rounded-full mt-2 shrink-0 opacity-80 ${theme.accentText}`} style={{ backgroundColor: "currentColor" }} />
                <span className={theme.secondaryText}>{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Slide Image Visual Container */}
      {hasRightSide && (
        <div className="md:col-span-5 w-full flex items-center justify-center h-full my-auto overflow-hidden">
          {isGeneratingImg ? (
            <div className="w-full h-44 md:h-52 rounded-[10px] bg-black/10 border border-dashed border-current/30 flex flex-col items-center justify-center p-4 text-center gap-2.5 animate-pulse">
              <div className={`p-2.5 rounded-full ${theme.accentBg}`}>
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block ${theme.primaryText}`}>
                  Generating Visual Illustration...
                </span>
                <span className={`text-[10px] ${theme.secondaryText}`}>Sketching artwork</span>
              </div>
            </div>
          ) : data.imgUrl ? (
            <div className="relative w-full overflow-hidden rounded-[10px] border border-current/20 shadow-md group/img max-h-52">
              <img
                src={data.imgUrl}
                alt={data.title}
                className="w-full h-44 md:h-52 object-cover rounded-[10px] transition-transform duration-500 group-hover/img:scale-105"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

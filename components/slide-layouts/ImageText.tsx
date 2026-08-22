"use client";

import { ThemeColors } from "@/lib/theme";
import { ImageTextSlide } from "@/lib/slideLayouts";
import { Loader2 } from "lucide-react";

interface ImageTextProps {
  theme: ThemeColors;
  data: ImageTextSlide;
  isGeneratingImg?: boolean;
  isThumbnail?: boolean;
}

export default function ImageText({
  theme,
  data,
  isGeneratingImg = false,
  isThumbnail = false,
}: ImageTextProps) {
  const isImageLeft = data.imagePosition === "left";

  if (isThumbnail) {
    return (
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-0.5">
          <h4 className={`text-[11px] font-display font-bold line-clamp-1 leading-tight ${theme.primaryText}`}>
            {data.title}
          </h4>
          <p className={`text-[8px] line-clamp-2 opacity-80 leading-tight ${theme.secondaryText}`}>
            {data.text}
          </p>
        </div>

        {data.bullets && data.bullets.length > 0 && (
          <div className="border-t border-current/10 pt-0.5 mt-0.5">
            <span className={`text-[7px] line-clamp-1 ${theme.secondaryText}`}>
              • {data.bullets[0]}
            </span>
          </div>
        )}
      </div>
    );
  }

  const textSection = (
    <div className="md:col-span-6 space-y-4 my-auto overflow-hidden">
      <div className="space-y-2">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] [text-wrap:balance] ${theme.primaryText}`}>
          {data.title}
        </h2>
        <p className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed line-clamp-4 ${theme.secondaryText}`}>
          {data.text}
        </p>
      </div>

      {data.bullets && data.bullets.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-current/15">
          {data.bullets.slice(0, 3).map((point, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 opacity-80 ${theme.accentText}`} style={{ backgroundColor: "currentColor" }} />
              <span className={`line-clamp-2 ${theme.secondaryText}`}>{point}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const imageSection = (
    <div className="md:col-span-6 w-full flex items-center justify-center h-full my-auto overflow-hidden">
      {isGeneratingImg ? (
        <div className="w-full h-44 md:h-56 rounded-[12px] bg-black/10 border border-dashed border-current/30 flex flex-col items-center justify-center p-4 text-center gap-2.5 animate-pulse">
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
        <div className="relative w-full overflow-hidden rounded-[12px] border border-current/20 shadow-md group/img max-h-56">
          <img
            src={data.imgUrl}
            alt={data.title}
            className="w-full h-44 md:h-56 object-cover rounded-[12px] transition-transform duration-500 group-hover/img:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-44 md:h-56 rounded-[12px] border border-dashed border-current/20 bg-current/[0.02] flex items-center justify-center text-center p-4">
          <p className={`text-xs opacity-60 ${theme.secondaryText}`}>Visual illustration placeholder</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full my-auto overflow-hidden">
      {isImageLeft ? (
        <>
          {imageSection}
          {textSection}
        </>
      ) : (
        <>
          {textSection}
          {imageSection}
        </>
      )}
    </div>
  );
}

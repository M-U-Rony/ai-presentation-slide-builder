"use client";

import { ThemeColors } from "@/lib/theme";
import { ComparisonSlide } from "@/lib/slideLayouts";

interface ComparisonProps {
  theme: ThemeColors;
  data: ComparisonSlide;
  isThumbnail?: boolean;
}

export default function Comparison({
  theme,
  data,
  isThumbnail = false,
}: ComparisonProps) {
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

        <div className="grid grid-cols-2 gap-1 mt-1">
          <div className="p-1 rounded-[4px] border border-current/15 bg-current/[0.04]">
            <span className={`text-[8px] font-bold block line-clamp-1 ${theme.primaryText}`}>
              {data.leftColumn.title}
            </span>
          </div>
          <div className="p-1 rounded-[4px] border border-current/15 bg-current/[0.04]">
            <span className={`text-[8px] font-bold block line-clamp-1 ${theme.primaryText}`}>
              {data.rightColumn.title}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full space-y-4 my-auto overflow-hidden">
      {/* Header */}
      <div className="space-y-1.5">
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] [text-wrap:balance] ${theme.primaryText}`}>
          {data.title}
        </h2>
        {data.subtitle && (
          <p className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${theme.secondaryText}`}>
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Side-by-side comparison columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-auto items-stretch">
        {/* Left Column */}
        <div className="p-5 sm:p-6 rounded-[12px] border border-current/15 bg-current/[0.03] flex flex-col justify-between space-y-3 shadow-xs">
          <div className="space-y-2.5">
            <h3 className={`text-base sm:text-lg font-display font-bold pb-2 border-b border-current/15 ${theme.primaryText}`}>
              {data.leftColumn.title}
            </h3>
            <ul className="space-y-2.5 pt-1">
              {data.leftColumn.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-base leading-relaxed">
                  <span className={`w-2 h-2 rounded-full mt-2 shrink-0 opacity-80 ${theme.accentText}`} style={{ backgroundColor: "currentColor" }} />
                  <span className={theme.secondaryText}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-5 sm:p-6 rounded-[12px] border border-current/15 bg-current/[0.03] flex flex-col justify-between space-y-3 shadow-xs">
          <div className="space-y-2.5">
            <h3 className={`text-base sm:text-lg font-display font-bold pb-2 border-b border-current/15 ${theme.primaryText}`}>
              {data.rightColumn.title}
            </h3>
            <ul className="space-y-2.5 pt-1">
              {data.rightColumn.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-base leading-relaxed">
                  <span className={`w-2 h-2 rounded-full mt-2 shrink-0 opacity-80 ${theme.accentText}`} style={{ backgroundColor: "currentColor" }} />
                  <span className={theme.secondaryText}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

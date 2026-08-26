"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { StatGridSlide } from "@/lib/slideLayouts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatGridProps {
  theme: ThemeColors;
  data: StatGridSlide;
  isThumbnail?: boolean;
}

export default function StatGrid({
  theme,
  data,
  isThumbnail = false,
}: StatGridProps) {
  const stats = data.stats || [];
  const statCount = stats.length;
  const gridColsClass =
    statCount === 2
      ? "grid-cols-2"
      : statCount === 3
      ? "grid-cols-3"
      : "grid-cols-4";

  const getValueFontSize = (val: string) => {
    const len = (val || "").length;
    if (len <= 4) return "text-3xl sm:text-4xl lg:text-5xl";
    if (len <= 7) return "text-2xl sm:text-3xl lg:text-4xl";
    if (len <= 11) return "text-xl sm:text-2xl lg:text-3xl";
    return "text-lg sm:text-xl lg:text-2xl";
  };

  const getThumbFontSize = (val: string) => {
    const len = (val || "").length;
    if (len <= 4) return "text-[10px]";
    if (len <= 7) return "text-[8.5px]";
    return "text-[7px]";
  };

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
          {stats.slice(0, 4).map((stat, idx) => (
            <div
              key={idx}
              className="p-1 rounded-[4px] border border-current/15 bg-current/[0.04] flex flex-col justify-center overflow-hidden"
            >
              <div className={`${getThumbFontSize(stat.value)} font-extrabold font-mono leading-tight truncate ${theme.accentText}`}>
                {stat.value}
              </div>
              <div className={`text-[6.5px] line-clamp-1 opacity-75 mt-0.5 ${theme.secondaryText}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full space-y-4 my-auto overflow-hidden">
      {/* Header section */}
      <div className="space-y-1.5">
        <h2
          className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.15] [text-wrap:balance] ${theme.primaryText}`}
        >
          {data.title}
        </h2>
        {data.subtitle && (
          <p
            className={`text-xs sm:text-sm lg:text-base font-normal leading-relaxed ${theme.secondaryText}`}
          >
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div className={`grid ${gridColsClass} gap-3 sm:gap-4 my-auto items-stretch`}>
        {stats.map((stat, idx) => {
          const isPositive = stat.change?.startsWith("+") || stat.change?.toLowerCase().includes("up");
          const isNegative = stat.change?.startsWith("-") || stat.change?.toLowerCase().includes("down");

          return (
            <div
              key={idx}
              className="p-3.5 sm:p-4 md:p-5 rounded-[12px] border border-current/15 bg-current/[0.03] backdrop-blur-xs flex flex-col justify-between transition-all hover:bg-current/[0.06] shadow-xs overflow-hidden"
            >
              <div className="overflow-hidden">
                <div className={`${getValueFontSize(stat.value)} font-black font-mono tracking-tight leading-none break-words line-clamp-1 ${theme.accentText}`}>
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-medium mt-2 leading-snug line-clamp-2 ${theme.primaryText}`}>
                  {stat.label}
                </div>
              </div>

              {stat.change && (
                <div className="mt-2.5 pt-2 border-t border-current/10 flex items-center gap-1.5 text-xs font-semibold">
                  {isPositive && <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                  {isNegative && <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                  <span className={isPositive ? "text-emerald-500" : isNegative ? "text-rose-500" : theme.secondaryText}>
                    {stat.change}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

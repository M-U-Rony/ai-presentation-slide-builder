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
      : "grid-cols-2 md:grid-cols-4";

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
              className="p-1 rounded-[4px] border border-current/15 bg-current/[0.04] flex flex-col justify-center"
            >
              <div className={`text-[10px] font-extrabold font-mono leading-none ${theme.accentText}`}>
                {stat.value}
              </div>
              <div className={`text-[7px] line-clamp-1 opacity-75 mt-0.5 ${theme.secondaryText}`}>
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
        <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] [text-wrap:balance] ${theme.primaryText}`}>
          {data.title}
        </h2>
        {data.subtitle && (
          <p className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${theme.secondaryText}`}>
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div className={`grid ${gridColsClass} gap-3 sm:gap-5 my-auto items-stretch`}>
        {stats.map((stat, idx) => {
          const isPositive = stat.change?.startsWith("+") || stat.change?.toLowerCase().includes("up");
          const isNegative = stat.change?.startsWith("-") || stat.change?.toLowerCase().includes("down");

          return (
            <div
              key={idx}
              className="p-4 sm:p-5 md:p-6 rounded-[12px] border border-current/15 bg-current/[0.03] backdrop-blur-xs flex flex-col justify-between transition-all hover:bg-current/[0.06] shadow-xs"
            >
              <div>
                <div className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight ${theme.accentText}`}>
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm md:text-base font-medium mt-2 leading-snug line-clamp-2 ${theme.primaryText}`}>
                  {stat.label}
                </div>
              </div>

              {stat.change && (
                <div className="mt-3 pt-2.5 border-t border-current/10 flex items-center gap-1.5 text-xs font-semibold">
                  {isPositive && <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {isNegative && <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />}
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

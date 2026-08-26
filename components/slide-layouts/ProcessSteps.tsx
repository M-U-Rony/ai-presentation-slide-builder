"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { ProcessStepsSlide } from "@/lib/slideLayouts";
import { ArrowRight } from "lucide-react";

interface ProcessStepsProps {
  theme: ThemeColors;
  data: ProcessStepsSlide;
  isThumbnail?: boolean;
}

export default function ProcessSteps({
  theme,
  data,
  isThumbnail = false,
}: ProcessStepsProps) {
  const steps = data.steps || [];
  const gridColsClass =
    steps.length === 2
      ? "grid-cols-2"
      : steps.length === 3
      ? "grid-cols-3"
      : "grid-cols-4";

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

        <div className="grid grid-cols-3 gap-1 mt-1">
          {steps.slice(0, 3).map((step, idx) => (
            <div
              key={idx}
              className="p-1 rounded-[4px] border border-current/15 bg-current/[0.04] flex flex-col justify-center"
            >
              <span className={`text-[8px] font-mono font-bold leading-none ${theme.accentText}`}>
                0{step.stepNumber || idx + 1}
              </span>
              <span className={`text-[7px] font-semibold line-clamp-1 mt-0.5 ${theme.primaryText}`}>
                {step.title}
              </span>
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

      {/* Process Steps Cards */}
      <div className={`grid ${gridColsClass} gap-3 sm:gap-4 my-auto items-stretch`}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-[12px] border border-current/15 bg-current/[0.03] flex flex-col justify-between relative group hover:bg-current/[0.06] transition-all shadow-xs overflow-hidden"
          >
            <div>
              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-xs ${theme.accentBg}`}
                >
                  {step.stepNumber || idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight className={`w-3.5 h-3.5 opacity-40 ${theme.secondaryText}`} />
                )}
              </div>

              {/* Step title */}
              <h3 className={`text-xs sm:text-sm font-display font-bold leading-snug line-clamp-2 mb-1 ${theme.primaryText}`}>
                {step.title}
              </h3>

              {/* Step description */}
              <p className={`text-[11px] sm:text-xs leading-relaxed line-clamp-3 opacity-80 ${theme.secondaryText}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

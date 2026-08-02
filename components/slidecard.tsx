"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { Check } from "lucide-react";

interface slidecardProps {
  theme: ThemeColors;
  title: string;
  subtitle: string;
  content?: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SlideCard({
  theme,
  title,
  subtitle,
  content,
  isSelected = false,
  onClick,
}: slidecardProps) {
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
      <div className={`w-full rounded-[16px] ${theme.cardBg} border ${theme.border} p-6 space-y-3 shadow-inner`}>
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
    </div>
  );
}
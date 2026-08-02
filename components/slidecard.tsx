"use client";

import React from "react";
import { ThemeColors } from "@/lib/theme";
import { Check, Sparkles } from "lucide-react";

interface slidecardProps {
  theme: ThemeColors;
  title: string;
  subtitle: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SlideCard({
  theme,
  title,
  subtitle,
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
      {/* Top Header with Theme Name & Selected Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-[16px] text-xs font-bold uppercase tracking-wider border capitalize ${theme.badge}`}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          {theme.id} Theme
        </span>

        {isSelected && (
          <span className="bg-[#22C55E] text-white px-3 py-1 rounded-[16px] text-xs font-extrabold flex items-center gap-1 shadow-sm animate-in fade-in zoom-in duration-200">
            <Check className="w-3.5 h-3.5" />
            Selected
          </span>
        )}
      </div>

      {/* Inner Preview Box */}
      <div className={`w-full rounded-[16px] ${theme.cardBg} border ${theme.border} p-6 space-y-3 shadow-inner`}>
        <h2 className={`text-xl font-bold tracking-tight ${theme.primaryText}`}>
          {title}
        </h2>
        <p className={`text-sm ${theme.secondaryText}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
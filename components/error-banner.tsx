"use client";

import React from "react";
import { AlertTriangle, RotateCcw, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorBanner({ message, onRetry, onDismiss, className = "" }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={`w-full flex items-start gap-3 p-3.5 rounded-[6px] border border-[#b3261e] bg-[#fdecea] text-[#5c1510] ${className}`}
    >
      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#b3261e]" />
      <p className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">{message}</p>
      <div className="flex items-center gap-1.5 shrink-0">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] border border-[#b3261e] bg-white hover:bg-[#fbd5d1] text-[11px] font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Try again
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="p-1 rounded-[4px] hover:bg-[#fbd5d1] transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function HighlighterWashOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        {/* Subtle diagonal highlighter accents in top-right perimeter */}
        <g stroke="#ffe95c" strokeLinecap="round" opacity="0.15">
          <line x1="1400" y1="20" x2="1580" y2="20" strokeWidth="6" />
          <line x1="1450" y1="35" x2="1580" y2="35" strokeWidth="4" />
        </g>

        {/* Minimal perimeter framing line */}
        <rect
          x="30"
          y="30"
          width="1540"
          height="840"
          fill="none"
          stroke="#ffe95c"
          strokeWidth="1"
          strokeOpacity="0.12"
          rx="8"
        />

        {/* Bottom accent dot cluster */}
        {!isThumbnail && (
          <g fill="#ffe95c" opacity="0.2">
            <circle cx="60" cy="840" r="3" />
            <circle cx="80" cy="840" r="3" />
            <circle cx="100" cy="840" r="3" />
          </g>
        )}
      </svg>
    </div>
  );
}

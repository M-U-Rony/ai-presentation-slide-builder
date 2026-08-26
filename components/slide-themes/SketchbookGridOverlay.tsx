"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function SketchbookGridOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <pattern id="sketchbook-grid-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3300" strokeWidth="0.75" strokeOpacity="0.04" />
          </pattern>
        </defs>

        {/* Subtle background grid pattern */}
        <rect width="1600" height="900" fill="url(#sketchbook-grid-pat)" />

        {/* Top-left artistic highlight wash marker */}
        {!isThumbnail && (
          <path
            d="M 60 20 L 220 20"
            stroke="#ffe95c"
            strokeWidth="8"
            strokeLinecap="round"
            strokeOpacity="0.65"
          />
        )}

        {/* Corner registration tick marks */}
        <g stroke="#1a3300" strokeWidth="1.5" strokeOpacity="0.2">
          <line x1="40" y1="40" x2="60" y2="40" />
          <line x1="40" y1="40" x2="40" y2="60" />
          <line x1="1560" y1="40" x2="1540" y2="40" />
          <line x1="1560" y1="40" x2="1560" y2="60" />
          <line x1="40" y1="860" x2="60" y2="860" />
          <line x1="40" y1="860" x2="40" y2="840" />
          <line x1="1560" y1="860" x2="1540" y2="860" />
          <line x1="1560" y1="860" x2="1560" y2="840" />
        </g>
      </svg>
    </div>
  );
}

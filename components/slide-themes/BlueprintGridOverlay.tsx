"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function BlueprintGridOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <pattern id="blueprint-pat" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0e7490" strokeWidth="0.5" strokeOpacity="0.06" />
          </pattern>
        </defs>

        <rect width="1600" height="900" fill="url(#blueprint-pat)" />

        {/* Outer technical coordinate marks */}
        <g stroke="#0e7490" strokeWidth="1" strokeOpacity="0.2">
          <line x1="20" y1="20" x2="40" y2="20" />
          <line x1="20" y1="20" x2="20" y2="40" />
          <line x1="1580" y1="20" x2="1560" y2="20" />
          <line x1="1580" y1="20" x2="1580" y2="40" />
        </g>
      </svg>
    </div>
  );
}

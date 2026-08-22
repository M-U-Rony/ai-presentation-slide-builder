"use client";

import React from "react";

interface CorporateCapsuleOverlayProps {
  isThumbnail?: boolean;
}

export default function CorporateCapsuleOverlay({
  isThumbnail = false,
}: CorporateCapsuleOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <filter id="capsule-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-4" dy="8" stdDeviation="12" floodColor="#071938" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Base Crisp White Canvas */}
        <rect width="1600" height="900" fill="#ffffff" />

        {/* 2. Bottom-Right Deep Navy Diagonal Corner Polygon */}
        <polygon
          points="830,900 1600,160 1600,900"
          fill="#071938"
        />


        {/* 5. Minimalist Dot Matrix Pattern (Bottom Left) */}
        {!isThumbnail && (
          <g fill="#071938">
            <circle cx="480" cy="800" r="7" />
            <circle cx="520" cy="800" r="7" />
            <circle cx="560" cy="800" r="7" />
            <circle cx="600" cy="800" r="7" />
            <circle cx="640" cy="800" r="7" />
            <circle cx="680" cy="800" r="7" />
            <circle cx="560" cy="760" r="7" />
            <circle cx="600" cy="760" r="7" />
            <circle cx="640" cy="760" r="7" />
            <circle cx="680" cy="760" r="7" />
          </g>
        )}
      </svg>
    </div>
  );
}

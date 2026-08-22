"use client";

import React from "react";

interface NavyChevronOverlayProps {
  isThumbnail?: boolean;
}

export default function NavyChevronOverlay({
  isThumbnail = false,
}: NavyChevronOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle diagonal background texture */}
          <pattern
            id="bg-hatch-pattern"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="#0e3d66" strokeWidth="1" opacity="0.7" />
          </pattern>

          {/* Dense cyan diagonal hatch for the left geometric chevrons */}
          <pattern
            id="cyan-stripe-pattern"
            width="6"
            height="6"
            patternTransform="rotate(-45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#38bdf8" strokeWidth="1.5" />
          </pattern>

          {/* Alternate cyan stripe pattern */}
          <pattern
            id="cyan-stripe-dense"
            width="5"
            height="5"
            patternTransform="rotate(-45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="5" stroke="#0284c7" strokeWidth="1.2" />
          </pattern>

          {/* Deep drop shadow filter */}
          <filter id="navy-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="8" dy="12" stdDeviation="10" floodColor="#031220" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Base Dark Navy Fill */}
        <rect width="1600" height="900" fill="#0b3153" />

        {/* 2. Global Diagonal Texture Overlay */}
        <rect width="1600" height="900" fill="url(#bg-hatch-pattern)" />

        {/* ================= LEFT CHEVRONS & ANGLED RIBBONS ================= */}

        {/* Top Left Deep Shadow Plate */}
        <polygon
          points="0,0 520,0 280,240 0,520"
          fill="#051c30"
          opacity="0.9"
        />

        {/* Top Left Angled Royal Blue Ribbon */}
        <polygon
          points="280,0 510,0 310,200 80,200"
          fill="#0284c7"
          filter="url(#navy-shadow)"
        />

        {/* Top Left Angled Cyan Accent Ribbon */}
        <polygon
          points="310,0 490,0 330,160 150,160"
          fill="#0ea5e9"
          opacity="0.9"
        />

        {/* Top Left Cyan Striped Polygon */}
        <polygon
          points="0,0 320,0 160,160 0,320"
          fill="url(#cyan-stripe-pattern)"
          filter="url(#navy-shadow)"
        />

        {/* Middle Left Shadow Backplate */}
        <polygon
          points="0,220 260,480 0,740"
          fill="#041525"
          opacity="0.95"
        />

        {/* Middle Left Main Cyan Striped Chevron Diamond */}
        <polygon
          points="0,240 230,470 0,700"
          fill="url(#cyan-stripe-pattern)"
          filter="url(#navy-shadow)"
        />

        {/* Middle Left Inner Core Chevron */}
        <polygon
          points="0,320 150,470 0,620"
          fill="#0284c7"
          opacity="0.25"
        />

        {/* Bottom Left Shadow Plate */}
        <polygon
          points="0,620 140,760 0,900"
          fill="#041525"
          opacity="0.95"
        />

        {/* Bottom Left Cyan Striped Chevron */}
        <polygon
          points="0,640 120,760 0,880"
          fill="url(#cyan-stripe-pattern)"
          filter="url(#navy-shadow)"
        />

        {/* Accent Edge Outlines */}
        <polyline
          points="0,240 230,470 0,700"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <polyline
          points="0,640 120,760 0,880"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.8"
        />
        <polyline
          points="80,200 310,200 510,0"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

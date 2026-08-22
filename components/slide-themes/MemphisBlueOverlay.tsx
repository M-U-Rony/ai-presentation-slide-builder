"use client";

import React from "react";

interface MemphisBlueOverlayProps {
  isThumbnail?: boolean;
}

export default function MemphisBlueOverlay({
  isThumbnail = false,
}: MemphisBlueOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle soft backdrop gradient */}
          <linearGradient id="memphis-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f7ff" />
          </linearGradient>

          {/* Top-Right Grid Texture */}
          <pattern
            id="memphis-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.2"
              opacity="0.65"
            />
          </pattern>

          {/* Bottom-Left Diagonal Hatch Texture */}
          <pattern
            id="memphis-diag"
            width="12"
            height="12"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="#3b82f6"
              strokeWidth="1.4"
              opacity="0.65"
            />
          </pattern>

          {/* Bottom-Right Vertical Line Texture */}
          <pattern
            id="memphis-vert"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="9"
              stroke="#38bdf8"
              strokeWidth="1.4"
              opacity="0.8"
            />
          </pattern>
        </defs>

        {/* 1. Base Canvas Fill */}
        <rect width="1600" height="900" fill="url(#memphis-bg-grad)" />

        {/* 2. Top-Left Outline Rounded Rectangle */}
        <rect
          x="-40"
          y="-40"
          width="630"
          height="280"
          rx="50"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* 3. Top-Right Semi-Circle Grid */}
        <circle
          cx="1260"
          cy="0"
          r="190"
          fill="url(#memphis-grid)"
        />
        <circle
          cx="1260"
          cy="0"
          r="190"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          opacity="0.7"
        />

        {/* 4. Top-Right Periwinkle Pill Bar */}
        <rect
          x="1380"
          y="155"
          width="240"
          height="42"
          rx="21"
          fill="#818cf8"
          opacity="0.85"
        />

        {/* 5. Bottom-Left Diagonal Circle */}
        <circle
          cx="100"
          cy="520"
          r="140"
          fill="url(#memphis-diag)"
        />

        {/* 6. Bottom-Left Cyan Block */}
        <rect
          x="-30"
          y="570"
          width="250"
          height="280"
          rx="35"
          fill="#7dd3fc"
          opacity="0.75"
        />

        {/* 7. Bottom-Left Periwinkle Horizontal Bar */}
        <rect
          x="-20"
          y="840"
          width="420"
          height="60"
          rx="30"
          fill="#93c5fd"
          opacity="0.8"
        />

        {/* 8. Bottom-Right Cyan Floating Backplate */}
        <rect
          x="970"
          y="800"
          width="320"
          height="100"
          rx="40"
          fill="#7dd3fc"
          opacity="0.75"
        />

        {/* 9. Bottom-Right Deep Navy Geometric Block */}
        <rect
          x="1080"
          y="730"
          width="540"
          height="170"
          rx="50"
          fill="#07153a"
        />

        {/* 10. Bottom-Right Vertical Hatched Tower */}
        <rect
          x="1340"
          y="390"
          width="170"
          height="370"
          rx="12"
          stroke="#38bdf8"
          strokeWidth="2"
          fill="url(#memphis-vert)"
        />
      </svg>
    </div>
  );
}

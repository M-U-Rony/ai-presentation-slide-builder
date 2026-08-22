"use client";

import React from "react";

interface MinimalistOrangeOverlayProps {
  isThumbnail?: boolean;
}

export default function MinimalistOrangeOverlay({
  isThumbnail = false,
}: MinimalistOrangeOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* 1. Base White Canvas */}
        <rect width="1600" height="900" fill="#ffffff" />

        {/* 2. Vibrant Warm Orange Bottom Horizon Bar */}
        <rect
          x="0"
          y="700"
          width="1600"
          height="200"
          fill="#f59e42"
        />

        {/* 3. Top-Left Solid Black Square Icon */}
        {!isThumbnail && (
          <rect
            x="145"
            y="240"
            width="34"
            height="34"
            fill="#111827"
          />
        )}

        {/* 4. Top-Right Architectural Curve & Line */}
        <path
          d="M 900 0 V 60 Q 900 200 1040 200 H 1600"
          fill="none"
          stroke="#111827"
          strokeWidth="2.5"
        />

        {/* 5. Right-Hand Vertical Grid Dividing Line */}
        <line
          x1="1360"
          y1="0"
          x2="1360"
          y2="900"
          stroke="#111827"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function EditorialFrameOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        {/* Luxury double hairline border */}
        <rect
          x="20"
          y="20"
          width="1560"
          height="860"
          fill="none"
          stroke="#f5f0e6"
          strokeWidth="0.75"
          strokeOpacity="0.15"
          rx="4"
        />

        {/* Gold corner registration ticks */}
        <g stroke="#ffe95c" strokeWidth="1.5" strokeOpacity="0.3">
          <line x1="30" y1="30" x2="50" y2="30" />
          <line x1="30" y1="30" x2="30" y2="50" />
          <line x1="1570" y1="30" x2="1550" y2="30" />
          <line x1="1570" y1="30" x2="1570" y2="50" />
          <line x1="30" y1="870" x2="50" y2="870" />
          <line x1="30" y1="870" x2="30" y2="850" />
          <line x1="1570" y1="870" x2="1550" y2="870" />
          <line x1="1570" y1="870" x2="1570" y2="850" />
        </g>
      </svg>
    </div>
  );
}

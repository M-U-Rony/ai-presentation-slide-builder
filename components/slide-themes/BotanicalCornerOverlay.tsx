"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function BotanicalCornerOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        {/* Subtle botanical perimeter corner arcs */}
        <g fill="none" stroke="#15803d" strokeOpacity="0.12" strokeWidth="1.5">
          <path d="M 0 120 C 60 120 120 60 120 0" />
          <path d="M 0 180 C 100 180 180 100 180 0" />
          <path d="M 1600 780 C 1540 780 1480 840 1480 900" />
          <path d="M 1600 720 C 1500 720 1420 800 1420 900" />
        </g>

        {/* Minimal dot matrix in top right */}
        {!isThumbnail && (
          <g fill="#15803d" opacity="0.12">
            <circle cx="1520" cy="50" r="3" />
            <circle cx="1540" cy="50" r="3" />
            <circle cx="1560" cy="50" r="3" />
            <circle cx="1520" cy="70" r="3" />
            <circle cx="1540" cy="70" r="3" />
            <circle cx="1560" cy="70" r="3" />
          </g>
        )}
      </svg>
    </div>
  );
}

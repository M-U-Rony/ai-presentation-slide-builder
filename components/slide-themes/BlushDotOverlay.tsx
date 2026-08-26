"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function BlushDotOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        {/* Soft corner dot matrix */}
        {!isThumbnail && (
          <g fill="#9333ea" opacity="0.08">
            <circle cx="1520" cy="820" r="4" />
            <circle cx="1545" cy="820" r="4" />
            <circle cx="1570" cy="820" r="4" />
            <circle cx="1520" cy="845" r="4" />
            <circle cx="1545" cy="845" r="4" />
            <circle cx="1570" cy="845" r="4" />
            <circle cx="1520" cy="870" r="4" />
            <circle cx="1545" cy="870" r="4" />
            <circle cx="1570" cy="870" r="4" />
          </g>
        )}

        {/* Minimal pastel top line */}
        <line x1="40" y1="20" x2="160" y2="20" stroke="#9333ea" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round" />
      </svg>
    </div>
  );
}

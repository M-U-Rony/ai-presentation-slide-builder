"use client";

import React from "react";

interface OverlayProps {
  isThumbnail?: boolean;
}

export default function TerracottaArchOverlay({ isThumbnail = false }: OverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="w-full h-full">
        {/* Subtle terracotta corner arches (staying strictly outside content canvas) */}
        <g fill="none" stroke="#cb5521" strokeOpacity="0.12" strokeWidth="1.5">
          <circle cx="1600" cy="0" r="160" />
          <circle cx="1600" cy="0" r="220" />
          <circle cx="0" cy="900" r="140" />
        </g>

        {/* Minimal registration mark */}
        {!isThumbnail && (
          <g stroke="#cb5521" strokeOpacity="0.2" strokeWidth="1">
            <line x1="50" y1="30" x2="90" y2="30" />
            <line x1="50" y1="30" x2="50" y2="70" />
          </g>
        )}
      </svg>
    </div>
  );
}

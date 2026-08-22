"use client";

import React from "react";

interface FramedEditorialOverlayProps {
  isThumbnail?: boolean;
}

export default function FramedEditorialOverlay({
  isThumbnail = false,
}: FramedEditorialOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Deep cinematic charcoal vignette background gradient */}
          <radialGradient id="editorial-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1c1d22" />
            <stop offset="100%" stopColor="#0c0d10" />
          </radialGradient>

          {/* Soft shadow for the bold framing brackets */}
          <filter id="bracket-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Base Dark Charcoal Canvas */}
        <rect width="1600" height="900" fill="url(#editorial-vignette)" />

        {/* 2. Top-Left Bold Bracket */}
        {/* Top Horizontal Bar */}
        <rect
          x="80"
          y="80"
          width="440"
          height="52"
          fill="#ede8dc"
          filter="url(#bracket-shadow)"
        />
        {/* Left Vertical Bar */}
        <rect
          x="80"
          y="80"
          width="52"
          height="620"
          fill="#ede8dc"
          filter="url(#bracket-shadow)"
        />

        {/* 3. Bottom-Right Bold Bracket */}
        {/* Bottom Horizontal Bar */}
        <rect
          x="1080"
          y="768"
          width="440"
          height="52"
          fill="#ede8dc"
          filter="url(#bracket-shadow)"
        />
        {/* Right Vertical Bar */}
        <rect
          x="1468"
          y="200"
          width="52"
          height="620"
          fill="#ede8dc"
          filter="url(#bracket-shadow)"
        />
      </svg>
    </div>
  );
}

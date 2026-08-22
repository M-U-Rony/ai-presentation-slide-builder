"use client";

import React from "react";

interface HexagonOverlayProps {
  isThumbnail?: boolean;
}

/**
 * Calculates SVG polygon points for a point-topped hexagon
 */
function getHexagonPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = -90 + i * 60;
    const angleRad = (Math.PI / 180) * angleDeg;
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export default function HexagonOverlay({
  isThumbnail = false,
}: HexagonOverlayProps) {
  // Hexagon geometry points
  const mainHex = getHexagonPoints(1150, 450, 330);
  const blueOutlineHex = getHexagonPoints(1400, 240, 125);
  const peachHex = getHexagonPoints(890, 620, 115);
  const sandHex = getHexagonPoints(1000, 790, 60);
  const smallAccentHex = getHexagonPoints(1360, 640, 45);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle warm backdrop gradient */}
          <linearGradient id="warm-ivory-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faf8f5" />
            <stop offset="100%" stopColor="#f5f1eb" />
          </linearGradient>

          {/* Main central hexagon glass gradient */}
          <linearGradient id="main-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f1ede6" stopOpacity="0.6" />
          </linearGradient>

          {/* Hexagon shadow */}
          <filter id="hex-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#4a4036" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* 1. Base Warm Linen Canvas */}
        <rect width="1600" height="900" fill="url(#warm-ivory-bg)" />

        {/* 2. Main Large Central Hexagon */}
        <polygon
          points={mainHex}
          fill="url(#main-hex-grad)"
          stroke="#e2ded7"
          strokeWidth="2"
          filter="url(#hex-shadow)"
        />

        {/* 3. Top-Right Blue Outline Hexagon */}
        <polygon
          points={blueOutlineHex}
          fill="#f0f9ff"
          fillOpacity="0.3"
          stroke="#60a5fa"
          strokeWidth="3.5"
        />

        {/* 4. Bottom-Left Pastel Peach Filled Hexagon */}
        <polygon
          points={peachHex}
          fill="#fed7aa"
          fillOpacity="0.85"
          filter="url(#hex-shadow)"
        />

        {/* 5. Bottom-Center Sand/Grey Filled Hexagon */}
        <polygon
          points={sandHex}
          fill="#e2dcd5"
          fillOpacity="0.9"
        />

        {/* 6. Subtle Small Floating Accent Hexagon */}
        <polygon
          points={smallAccentHex}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

"use client";

import React from "react";

interface MinimalAuraOverlayProps {
  isThumbnail?: boolean;
}

export default function MinimalAuraOverlay({
  isThumbnail = false,
}: MinimalAuraOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Top-Right Sky Blue Radial Glow */}
          <radialGradient id="top-right-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.65" />
            <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#e0f2fe" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fcfaf7" stopOpacity="0" />
          </radialGradient>

          {/* Bottom-Left Soft Glow */}
          <radialGradient id="bottom-left-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fcfaf7" stopOpacity="0" />
          </radialGradient>

          {/* Blur filter for ultra-smooth aesthetic diffusion */}
          <filter id="aura-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>

        {/* 1. Base Off-White Warm Canvas */}
        <rect width="1600" height="900" fill="#fcfaf7" />

        {/* 2. Top-Right Soft Diffused Aura Sphere */}
        <circle
          cx="1150"
          cy="180"
          r="480"
          fill="url(#top-right-glow)"
          filter="url(#aura-blur)"
        />

        {/* 3. Bottom-Left Soft Aura Sphere */}
        <circle
          cx="120"
          cy="850"
          r="380"
          fill="url(#bottom-left-glow)"
          filter="url(#aura-blur)"
        />

        {/* 4. Top-Left Architectural Arrow Icon (rendered when not thumbnail) */}
        {!isThumbnail && (
          <g stroke="#0f0f10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="90" y1="110" x2="165" y2="110" />
            <polyline points="154,103 166,110 154,117" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
}

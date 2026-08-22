"use client";

import React from "react";

interface GeometricFacetsOverlayProps {
  isThumbnail?: boolean;
  slideNumber?: number | string;
}

export default function GeometricFacetsOverlay({
  isThumbnail = false,
  slideNumber = 1,
}: GeometricFacetsOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="geom-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>

          <linearGradient id="geom-right-deep" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#558b2f" />
            <stop offset="100%" stopColor="#3f6e1f" />
          </linearGradient>

          <linearGradient id="geom-right-lime" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>

          <linearGradient id="geom-right-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
        </defs>

        {/* ================= LEFT WING FACETS ================= */}
        {/* Main Left Sharp Facet */}
        <polygon
          points="0,0 120,0 15,900 0,900"
          fill="url(#geom-left-grad)"
        />
        {/* Subtle Left Upper Triangle Accent */}
        <polygon
          points="0,0 70,0 0,620"
          fill="#a3e635"
          opacity="0.5"
        />

        {/* ================= RIGHT WING FACETS ================= */}
        {/* Background Deep Green Facet */}
        <polygon
          points="1230,0 1600,0 1600,900 1180,900"
          fill="url(#geom-right-deep)"
          opacity="0.9"
        />

        {/* Midtone Sweeping Angular Facet */}
        <polygon
          points="1420,0 1600,0 1600,900 1320,900"
          fill="url(#geom-right-mid)"
          opacity="0.85"
        />

        {/* Overlapping Bright Lime Triangle (Top-Right to Bottom-Center) */}
        <polygon
          points="1480,0 1600,0 1600,680 1440,900"
          fill="url(#geom-right-lime)"
          opacity="0.88"
        />

        {/* Bottom Right Diagonal Triangle */}
        <polygon
          points="1180,900 1600,420 1600,900"
          fill="#84cc16"
          opacity="0.92"
        />

        {/* Bottom Right Darker Corner Facet */}
        <polygon
          points="1260,900 1600,600 1600,900"
          fill="#65a30d"
          opacity="0.75"
        />

        {/* ================= GEOMETRIC ACCENT LINES ================= */}
        <line
          x1="1250"
          y1="0"
          x2="1600"
          y2="760"
          stroke="#e2e8f0"
          strokeWidth="1"
          opacity="0.45"
        />
        <line
          x1="1120"
          y1="900"
          x2="1520"
          y2="180"
          stroke="#cbd5e1"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="1280"
          y1="900"
          x2="1600"
          y2="380"
          stroke="#f1f5f9"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Slide number in bottom right area (like the screenshot) */}
        {!isThumbnail && (
          <text
            x="1200"
            y="810"
            fill="#94a3b8"
            fontSize="14"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {slideNumber}
          </text>
        )}
      </svg>
    </div>
  );
}

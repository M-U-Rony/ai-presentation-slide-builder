"use client";

import React from "react";

interface CyanStepsOverlayProps {
  isThumbnail?: boolean;
}

export default function CyanStepsOverlay({
  isThumbnail = false,
}: CyanStepsOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Cyan to Royal Blue Horizontal Gradients */}
          <linearGradient id="cyan-band-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0088ff" />
          </linearGradient>

          <linearGradient id="cyan-band-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#0055ff" />
          </linearGradient>

          <linearGradient id="cyan-band-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0088ff" />
          </linearGradient>
        </defs>

        {/* 1. Base White Canvas */}
        <rect width="1600" height="900" fill="#ffffff" />

        {/* ================= TOP-RIGHT STEPPED CYLINDER BANDS ================= */}
        {/* Top Tier Band */}
        <rect
          x="1020"
          y="30"
          width="580"
          height="150"
          fill="url(#cyan-band-grad1)"
        />
        <circle
          cx="1020"
          cy="105"
          r="75"
          fill="#004de6"
        />

        {/* Middle Tier Band */}
        <rect
          x="1180"
          y="180"
          width="420"
          height="120"
          fill="#0066ff"
        />
        <circle
          cx="1180"
          cy="240"
          r="60"
          fill="#00d4ff"
        />

        {/* Bottom Tier Band */}
        <rect
          x="1360"
          y="300"
          width="240"
          height="120"
          fill="#0099ff"
        />
        <circle
          cx="1360"
          cy="360"
          r="60"
          fill="#004de6"
        />

        {/* ================= BOTTOM-LEFT STEPPED CYLINDER BANDS ================= */}
        {/* Top Lower Tier Band */}
        <rect
          x="0"
          y="600"
          width="340"
          height="120"
          fill="#0066ff"
        />
        <circle
          cx="340"
          cy="660"
          r="60"
          fill="#00d4ff"
        />

        {/* Bottom Lower Tier Band */}
        <rect
          x="0"
          y="720"
          width="510"
          height="150"
          fill="url(#cyan-band-reverse)"
        />
        <circle
          cx="510"
          cy="795"
          r="75"
          fill="#004de6"
        />

        {/* ================= DOTTED LINE ACCENTS ================= */}
        {/* Top-Left Dotted Line */}
        <line
          x1="50"
          y1="60"
          x2="280"
          y2="60"
          stroke="#00d4ff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 18"
          opacity="0.85"
        />

        {/* Bottom-Right Dotted Line */}
        <line
          x1="1310"
          y1="840"
          x2="1550"
          y2="840"
          stroke="#00d4ff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 18"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

'use client';

import React from 'react';
import { Wand2, Layers, Sparkles, ArrowRight, Loader2, Compass } from 'lucide-react';

interface promtpageProps {
  promt: string;
  setpromt: React.Dispatch<React.SetStateAction<string>>;
  slidecnt: number;
  setslidecnt: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function Promtpage({
  promt,
  setpromt,
  slidecnt,
  setslidecnt,
  loading,
  handleSubmit,
}: promtpageProps) {
  const suggestions = [
    "5-slide pitch deck for AI SaaS startup",
    "3-slide quarterly roadmap update",
    "8-slide marketing strategy overview",
    "10-slide product launch presentation"
  ];

  return (
    <div className="w-full bg-[#fcfaf5] p-6 sm:p-8 rounded-[12px] border border-[#1a3300] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] relative overflow-hidden">

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        {/* Text Prompt Input Container */}
        <div className="relative group">
          <div className="absolute top-4 left-4 text-[#1a3300]/60 group-focus-within:text-[#1a3300] transition-colors">
            <Wand2 className="w-5 h-5" />
          </div>
          <textarea
            value={promt}
            onChange={(e) => setpromt(e.target.value)}
            disabled={loading}
            placeholder="Type your presentation topic or paste raw outline notes here... (e.g. '5-slide pitch deck for AI productivity app')"
            rows={4}
            className="w-full pl-12 pr-4 pt-3.5 pb-3 bg-white text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm sm:text-base font-normal resize-none outline-none transition-all disabled:opacity-50"
          />
        </div>

        {/* Quick Suggestion Chips */}
        {!promt && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Compass className="w-3.5 h-3.5 text-[#1a3300]/60 shrink-0" />
            <span className="text-[12px] font-mono-tag text-[#1a3300]/70 font-semibold shrink-0">Try:</span>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setpromt(item)}
                className="text-[12px] text-[#1a3300] bg-[#f1f1f1] hover:bg-[#ffe95c] border border-[#b6b6b6] px-3 py-1 rounded-[6px] whitespace-nowrap transition-colors cursor-pointer font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Controls Bar: Slide Count Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#b6b6b6]/60">
          
          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            <span className="text-xs font-mono-tag font-semibold text-[#1a3300]/80 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#1a3300]" />
              Slide Count:
            </span>

            {/* Slide Count Options */}
            <div className="flex items-center gap-1 bg-[#1a3300]/5 p-1 rounded-[6px] border border-[#b6b6b6]">
              {[1, 3, 5, 8, 10].map((count) => (
                <button
                  key={count}
                  type="button"
                  disabled={loading}
                  onClick={() => setslidecnt(count)}
                  className={`min-h-[36px] px-3 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                    slidecnt === count
                      ? 'bg-[#1a3300] text-[#fcfaf5] shadow-xs'
                      : 'text-[#1a3300] hover:bg-[#ffe95c]'
                  }`}
                >
                  {count} {count === 1 ? 'Slide' : 'Slides'}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Count Input */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tag text-[#1a3300]/80 font-medium">Custom (Max 20):</span>
              <input
                type="number"
                min={1}
                max={20}
                value={slidecnt || ""}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setslidecnt(val);
                }}
                className={`w-16 min-h-[36px] px-2 py-1 bg-white text-[#1a3300] text-center font-bold text-xs rounded-[6px] border ${
                  slidecnt > 20 || slidecnt < 1
                    ? 'border-[#cb5521] ring-1 ring-[#cb5521]'
                    : 'border-[#b6b6b6] focus:border-[#1a3300]'
                } outline-none transition-colors`}
              />
            </div>
            {slidecnt > 20 && (
              <p className="text-[11px] font-semibold text-[#cb5521] animate-in fade-in duration-150">
                ⚠️ At maximum 20 slides can be generated.
              </p>
            )}
            {slidecnt < 1 && (
              <p className="text-[11px] font-semibold text-[#cb5521] animate-in fade-in duration-150">
                ⚠️ Minimum 1 slide required.
              </p>
            )}
          </div>

        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={loading || !promt.trim() || slidecnt > 20 || slidecnt < 1}
          className="w-full min-h-[48px] px-6 py-3.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 disabled:bg-[#b6b6b6] disabled:text-white disabled:cursor-not-allowed text-[#fcfaf5] font-semibold text-base flex items-center justify-center gap-2.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all active:scale-[0.99] cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#fcfaf5]" />
              <span>Generating Presentation Content...</span>
            </>
          ) : slidecnt > 20 ? (
            <span>Maximum 20 slides allowed</span>
          ) : (
            <>
              <span className="font-mono text-lg leading-none">→</span>
              <span>Generate Presentation</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>

      </form>

      {/* Loading Progress Feedback */}
      {loading && (
        <div className="mt-5 p-4 rounded-[6px] bg-[#d5f5c2] border border-[#1a3300] flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-full bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-spin text-[#ffe95c]" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-[#1a3300]">AI is creating {slidecnt} slides in sketchbook format...</div>
            <div className="w-full bg-[#1a3300]/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#1a3300] h-full rounded-full w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
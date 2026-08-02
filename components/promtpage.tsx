'use client';

import React from 'react';
import { Wand2, Layers, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

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
  return (
    <div className="w-full bg-[#F3F4F6] p-6 sm:p-8 rounded-[20px] border border-gray-200 shadow-md shadow-gray-200/50">
      
      {/* Header Pill Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          <span>AI Slide Prompt Engine</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">Powered by OpenRouter</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Text Prompt Input */}
        <div className="relative">
          <div className="absolute top-4 left-4 text-[#22C55E]">
            <Wand2 className="w-5 h-5" />
          </div>
          <textarea
            value={promt}
            onChange={(e) => setpromt(e.target.value)}
            disabled={loading}
            placeholder="Type your presentation topic or paste slide notes here... (e.g., '5-slide pitch deck for an AI app')"
            rows={3}
            className="w-full pl-12 pr-4 pt-3.5 pb-3 bg-white text-gray-900 placeholder-gray-400 rounded-[20px] border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 text-base font-normal resize-none outline-none transition-all disabled:opacity-60"
          />
        </div>

        {/* Controls Bar: Slide Count Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-gray-200">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#3B82F6]" />
              Slide Count:
            </span>

            {/* Slide Count Options */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-[20px] border border-gray-200">
              {[1, 3, 5, 8, 10].map((count) => (
                <button
                  key={count}
                  type="button"
                  disabled={loading}
                  onClick={() => setslidecnt(count)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded-[20px] text-xs font-bold transition-all ${
                    slidecnt === count
                      ? 'bg-[#3B82F6] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {count} {count === 1 ? 'Slide' : 'Slides'}
                </button>
              ))}
            </div>
          </div>

          {/* Number Input Fallback / Custom Count */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Custom:</span>
            <input
              type="number"
              min={1}
              max={20}
              value={slidecnt}
              onChange={(e) => setslidecnt(Math.max(1, Number(e.target.value)))}
              className="w-16 min-h-[44px] px-3 py-1.5 bg-white text-gray-900 text-center font-bold text-xs rounded-[20px] border border-gray-200 focus:border-[#3B82F6] outline-none"
            />
          </div>

        </div>

        {/* Primary Submit Button according to DESIGN.md */}
        <button
          type="submit"
          disabled={loading || !promt.trim()}
          className="w-full min-h-[44px] px-6 py-3 rounded-[20px] bg-[#22C55E] hover:bg-[#16a34a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base flex items-center justify-center gap-2 shadow-md shadow-[#22C55E]/25 transition-all active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Slide Content...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate Presentation</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </>
          )}
        </button>

      </form>

      {/* Loading Progress Feedback */}
      {loading && (
        <div className="mt-4 p-4 rounded-[20px] bg-white border border-[#22C55E]/30 animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#22C55E] animate-spin" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-900">AI is structuring {slidecnt} slide deck cards...</div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#22C55E] h-full rounded-full w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
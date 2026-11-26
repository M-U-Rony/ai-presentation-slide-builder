'use client';

import React from 'react';
import { Wand2, Layers, Sparkles, ArrowRight, Loader2, Compass, Gauge } from 'lucide-react';
import { MAX_PROMPT_LENGTH } from '@/lib/constants';
import type { UsageSummary } from '@/lib/api-client';

interface PromptFormProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  slideCount: number;
  setSlideCount: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  /** Decks left today, or null while unknown. */
  decksLeft: number | null;
  usage: UsageSummary | null;
}

export default function PromptForm({
  prompt,
  setPrompt,
  slideCount,
  setSlideCount,
  loading,
  handleSubmit,
  decksLeft,
  usage,
}: PromptFormProps) {
  const outOfDecks = decksLeft === 0;
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            maxLength={MAX_PROMPT_LENGTH}
            placeholder="Type your presentation topic or paste raw outline notes here... (e.g. '5-slide pitch deck for AI productivity app')"
            rows={4}
            className="w-full pl-12 pr-4 pt-3.5 pb-6 bg-white text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm sm:text-base font-normal resize-none outline-none transition-all disabled:opacity-50"
          />
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono-tag text-[#1a3300]/50 pointer-events-none">
            {prompt.length}/{MAX_PROMPT_LENGTH}
          </span>
        </div>

        {/* Quick Suggestion Chips */}
        {!prompt && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Compass className="w-3.5 h-3.5 text-[#1a3300]/60 shrink-0" />
            <span className="text-[12px] font-mono-tag text-[#1a3300]/70 font-semibold shrink-0">Try:</span>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(item)}
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
                  onClick={() => setSlideCount(count)}
                  className={`min-h-[36px] px-3 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                    slideCount === count
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
                value={slideCount || ""}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSlideCount(val);
                }}
                className={`w-16 min-h-[36px] px-2 py-1 bg-white text-[#1a3300] text-center font-bold text-xs rounded-[6px] border ${
                  slideCount > 20 || slideCount < 1
                    ? 'border-[#cb5521] ring-1 ring-[#cb5521]'
                    : 'border-[#b6b6b6] focus:border-[#1a3300]'
                } outline-none transition-colors`}
              />
            </div>
            {slideCount > 20 && (
              <p className="text-[11px] font-semibold text-[#cb5521] animate-in fade-in duration-150">
                ⚠️ At maximum 20 slides can be generated.
              </p>
            )}
            {slideCount < 1 && (
              <p className="text-[11px] font-semibold text-[#cb5521] animate-in fade-in duration-150">
                ⚠️ Minimum 1 slide required.
              </p>
            )}
          </div>

        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={loading || outOfDecks || !prompt.trim() || slideCount > 20 || slideCount < 1}
          className="w-full min-h-[48px] px-6 py-3.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 disabled:bg-[#b6b6b6] disabled:text-white disabled:cursor-not-allowed text-[#fcfaf5] font-semibold text-base flex items-center justify-center gap-2.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all active:scale-[0.99] cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#fcfaf5]" />
              <span>Generating Presentation Content...</span>
            </>
          ) : outOfDecks ? (
            <span>Daily deck limit reached, try again tomorrow</span>
          ) : slideCount > 20 ? (
            <span>Maximum 20 slides allowed</span>
          ) : (
            <>
              <span className="font-mono text-lg leading-none">→</span>
              <span>Generate Presentation</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>

        {usage && (
          <div className="flex items-center justify-center gap-2 text-[12px] font-mono-tag text-[#1a3300]/70">
            <Gauge className="w-3.5 h-3.5" />
            <span>
              Left today: {Math.max(0, usage.deck.limit - usage.deck.used)}/{usage.deck.limit} decks
              {" · "}
              {Math.max(0, usage.image.limit - usage.image.used)}/{usage.image.limit} images
            </span>
          </div>
        )}

      </form>

      {/* Loading Progress Feedback */}
      {loading && (
        <div className="mt-5 p-4 rounded-[6px] bg-[#d5f5c2] border border-[#1a3300] flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-full bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-spin text-[#ffe95c]" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-[#1a3300]">AI is creating {slideCount} slides in sketchbook format...</div>
            <div className="w-full bg-[#1a3300]/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#1a3300] h-full rounded-full w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
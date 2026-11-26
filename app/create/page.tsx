'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PromptForm from "@/components/prompt-form";
import SlideCard from "@/components/slidecard";
import Navbar from "@/components/navbar";
import { displayThemes } from "@/lib/theme";
import { Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { apiFetch, isRetryable, type ApiFailure, type UsageSummary } from '@/lib/api-client';
import ErrorBanner from '@/components/error-banner';


export default function Create() {

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const [prompt, setPrompt] = useState<string>('');
  const [slideCount, setSlideCount] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(displayThemes[0].id);
  const [error, setError] = useState<ApiFailure | null>(null);
  const [usage, setUsage] = useState<UsageSummary | null>(null);

  const refreshUsage = useCallback(async () => {
    const res = await apiFetch<UsageSummary>('/api/usage');
    if (res.ok) setUsage(res.data);
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;
    apiFetch<UsageSummary>('/api/usage').then((res) => {
      if (!cancelled && res.ok) setUsage(res.data);
    });
    return () => {
      cancelled = true;
    };
  }, [session?.user]);

  const decksLeft = usage ? Math.max(0, usage.deck.limit - usage.deck.used) : null;

  async function generate() {
    if (prompt.trim().length === 0 || slideCount > 20 || slideCount < 1) return;

    setLoading(true);
    setError(null);
    const res = await apiFetch<{ presentationId: string }>('/api/generateSlides', {
      method: 'POST',
      body: JSON.stringify({ prompt, slideCount, themeId: selectedThemeId }),
    });

    if (res.ok) {
      router.push(`/slides?id=${res.data.presentationId}`);
      return;
    }

    setLoading(false);
    if (res.code === 'UNAUTHORIZED') {
      router.push('/signin');
      return;
    }
    setError(res);
    void refreshUsage();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void generate();
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] flex flex-col">
      
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
              <div className="w-full max-w-4xl space-y-10">
      
      {/* Header Title */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1a3300] tracking-[0.04em] [text-wrap:balance]">
          Create Presentation Decks
        </h1>
        <p className="text-[#1a3300]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed [text-wrap:balance]">
          Type your topic or prompt below, pick your slide count, and choose an aesthetic sketchbook theme.
        </p>
      </div>

      {error && (
        <ErrorBanner
          message={error.message}
          onRetry={isRetryable(error) ? () => void generate() : undefined}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Prompt Engine Container */}
      <PromptForm 
        decksLeft={decksLeft}
        usage={usage}
        prompt={prompt} 
        setPrompt={setPrompt} 
        loading={loading} 
        slideCount={slideCount} 
        setSlideCount={setSlideCount} 
        handleSubmit={handleSubmit}
      />

      {/* Theme Selection Grid with Active Halo Ring */}
      <div className="space-y-6 pt-6 border-t border-[#b6b6b6]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#1a3300]" />
            <h2 className="font-display text-xl font-bold text-[#1a3300]">Select Visual Theme</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayThemes.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`rounded-[14px] transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-offset-2 ring-emerald-500 shadow-xl scale-[1.02]"
                    : "hover:scale-[1.01] opacity-90 hover:opacity-100"
                }`}
              >
                <SlideCard 
                  theme={theme} 
                  title={theme.name} 
                  subtitle={"Click to apply this visual palette"}
                  isSelected={isSelected}
                />
              </div>
            );
          })}
        </div>
      </div>

    </div>
      </main>
    </div>
  );
}
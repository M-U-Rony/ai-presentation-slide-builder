'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Promtpage from "@/components/promtpage";
import SlideCard from "@/components/slidecard";
import { displayThemes, allThemes } from "@/lib/theme";
import { Presentation, Sparkles, ArrowLeft, Palette, LogOut, Lightbulb } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

function CreateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const initialPrompt = searchParams.get('prompt') || '';
  const initialSlides = Number(searchParams.get('slides')) || 5;
  const initialTheme = searchParams.get('theme') || displayThemes[0].id;

  const [promt, setpromt] = useState<string>(initialPrompt);
  const [slidecnt, setslidecnt] = useState<number>(initialSlides);
  const [loading, setloading] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(initialTheme);

  useEffect(() => {
    if (initialPrompt) setpromt(initialPrompt);
    if (initialSlides) setslidecnt(initialSlides);
    if (initialTheme && allThemes.some(t => t.id === initialTheme)) {
      setSelectedThemeId(initialTheme);
    }
  }, [initialPrompt, initialSlides, initialTheme]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setloading(true);

      if (promt.trim().length === 0) {
        setloading(false);
        return;
      }
      
      const res = await fetch('/api/generateSlides', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ promt, slidecnt, selectedThemeId })
      });

      if (!res.ok) {
        console.error("Failed to generate content");
        setloading(false);
        return;
      }

      const data = await res.json();

      setloading(false);
      router.push(`/slides?id=${data.presentationId}`);

    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  return (
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

      {/* Prompt Engine Container */}
      <Promtpage 
        promt={promt} 
        setpromt={setpromt} 
        loading={loading} 
        slidecnt={slidecnt} 
        setslidecnt={setslidecnt} 
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
          {displayThemes.map((theme) => (
            <SlideCard 
              key={theme.id} 
              theme={theme} 
              title={theme.name} 
              subtitle={"Click to apply this palette preset"}
              isSelected={selectedThemeId === theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default function Create() {
  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] flex flex-col">
      
      {/* ==================== FLOATING NAVBAR ==================== */}
      <div className="sticky top-4 z-50 max-w-6xl mx-auto w-full px-4 sm:px-6">
        <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-4 py-2.5 nav-glow flex items-center justify-between">
          
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center font-display font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
                lo
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-[#1a3300]">
                  SlideAI
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Navbar Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Dashboard</span>
            </Link>

            <Link
              href="/"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <button
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/signin";
                    }
                  }
                });
              }}
              className="min-h-[36px] px-3 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300]/70 hover:text-[#cb5521] hover:border-[#cb5521] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </nav>
      </div>

      {/* ==================== MAIN PAGE CONTAINER ==================== */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <Suspense fallback={
          <div className="text-[#1a3300] text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-[#1a3300]" /> Loading Studio...
          </div>
        }>
          <CreateForm />
        </Suspense>
      </main>

    </div>
  );
}
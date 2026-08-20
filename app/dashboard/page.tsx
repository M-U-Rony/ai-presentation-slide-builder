'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Presentation, 
  Sparkles, 
  Plus, 
  History, 
  ArrowLeft, 
  Layers, 
  Loader2, 
  Clock, 
  ArrowRight,
  Palette,
  ChevronRight,
  LogOut,
  Lightbulb
} from 'lucide-react';
import { allThemes } from '@/lib/theme';
import { Slide } from '@/lib/types';
import { authClient } from '@/lib/auth-client';

interface PresentationItem {
  id: number;
  title: string;
  totalSlides: number;
  themeColors: string;
  userId: number;
  slides?: Slide[];
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [presentations, setPresentations] = useState<PresentationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    async function fetchPresentations() {
      try {
        setLoading(true);
        // Using userId = 1 as specified in TASK.md
        const res = await fetch('/api/getUserPresentations?userId=1');
        if (!res.ok) {
          console.error("Failed to fetch user presentations");
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.success) {
          setPresentations(data.data || []);
        }
      } catch (error) {
        console.error("Error loading dashboard history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPresentations();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] flex flex-col">
      
      {/* ==================== FLOATING NAVIGATION BAR ==================== */}
      <div className="sticky top-4 z-50 max-w-6xl mx-auto w-full px-4 sm:px-6">
        <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-4 py-2.5 nav-glow flex items-center justify-between">
          
          {/* Brand Logo */}
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

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              href="/create"
              className="min-h-[36px] px-4 py-1.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New</span>
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

      {/* ==================== MAIN DASHBOARD CONTENT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* TOP HERO SECTION */}
        <div className="p-6 sm:p-8 rounded-[12px] bg-[#ffe95c] border border-[#1a3300] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl z-10">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em] [text-wrap:balance]">
              Your Presentation Decks
            </h1>
            <p className="text-[#1a3300]/80 text-xs sm:text-sm leading-relaxed">
              Generate new slide presentations or resume editing your saved presentation decks below.
            </p>
          </div>

          <Link
            href="/create"
            className="min-h-[44px] px-6 py-2.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0 z-10"
          >
            <span className="font-mono text-base leading-none">→</span>
            <span>Create New Deck</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        {/* HISTORY SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#b6b6b6] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-[6px] bg-white border border-[#1a3300] text-[#1a3300]">
                <History className="w-4 h-4" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1a3300] tracking-[0.04em]">
                Saved History
              </h2>
            </div>
            <span className="text-xs font-mono-tag text-[#1a3300] bg-white px-3 py-1 rounded-[6px] border border-[#b6b6b6]">
              {presentations.length} {presentations.length === 1 ? 'Deck' : 'Decks'} Saved
            </span>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#1a3300]/70">
              <Loader2 className="w-7 h-7 animate-spin text-[#1a3300]" />
              <p className="text-xs sm:text-sm font-semibold">Fetching your deck history...</p>
            </div>
          ) : presentations.length === 0 ? (
            /* EMPTY STATE */
            <div className="p-10 sm:p-14 rounded-[12px] bg-white border border-[#1a3300] text-center space-y-4 max-w-md mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center mx-auto border border-[#1a3300]/20 font-bold">
                <Presentation className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-[#1a3300]">No Presentations Found</h3>
                <p className="text-[#1a3300]/70 text-xs leading-relaxed">
                  You haven't generated any slide presentations yet. Click below to build your first deck!
                </p>
              </div>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 min-h-[40px] px-5 py-2 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-xs transition-all shadow-xs"
              >
                <span className="font-mono text-base leading-none">→</span>
                <span>Build First Presentation</span>
              </Link>
            </div>
          ) : (
            /* PRESENTATION HISTORY GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {presentations.map((item) => {
                const theme = allThemes.find((t) => t.id === item.themeColors) || allThemes[0];
                const firstSlide = item.slides?.[0];

                return (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/slides?id=${item.id}`)}
                    className="group cursor-pointer rounded-[12px] bg-white border border-[#b6b6b6] hover:border-[#1a3300] transition-all duration-200 p-4 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] flex flex-col justify-between space-y-3 hover:scale-[1.01] select-none"
                  >
                    {/* Visual Card Preview Window */}
                    <div className={`w-full h-40 rounded-[8px] ${theme.background} border ${theme.border} p-3 flex flex-col justify-between overflow-hidden relative transition-transform duration-200 group-hover:scale-[1.01]`}>
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className={`px-2 py-0.5 rounded-[4px] capitalize ${theme.badge}`}>
                          {item.themeColors}
                        </span>
                        <span className="flex items-center gap-1 font-mono-tag text-current opacity-80">
                          <Layers className="w-3 h-3" /> {item.totalSlides} slides
                        </span>
                      </div>

                      <div className="space-y-1 my-auto">
                        <h4 className={`font-display text-xs sm:text-sm font-bold line-clamp-2 leading-tight ${theme.primaryText}`}>
                          {firstSlide?.title || item.title}
                        </h4>
                        {firstSlide?.subtitle && (
                          <p className={`text-[10px] line-clamp-1 opacity-80 ${theme.secondaryText}`}>
                            {firstSlide.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] opacity-70 border-t border-current/15 pt-1.5">
                        <span>Deck Preview</span>
                        <span className="font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-[#1a3300]">
                          Open <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* Title Label below card */}
                    <div className="space-y-0.5 px-0.5">
                      <div className="text-[10px] font-mono-tag font-semibold text-[#1a3300]/60 uppercase tracking-wider">
                        Topic:
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#1a3300] line-clamp-1 group-hover:underline decoration-[#ffe95c] decoration-2 transition-all">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

    </div>
  );
}

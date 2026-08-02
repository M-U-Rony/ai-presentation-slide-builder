'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Promtpage from "@/components/promtpage";
import SlideCard from "@/components/slidecard";
import { allThemes } from "@/lib/theme";
import { Presentation, Sparkles, ArrowLeft, Palette, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Create() {
  const [promt, setpromt] = useState<string>('');
  const [slidecnt, setslidecnt] = useState<number>(1);
  const [loading, setloading] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(allThemes[0].id);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setloading(true);

      if (promt.length === 0) {
        console.log("Give prompt first");
        setloading(false);
        return;
      }
      
      const res = await fetch('/api/generateSlides', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ promt, slidecnt,selectedThemeId })
      });

      if (!res.ok) {
        console.error("Failed to generate content");
        setloading(false);
        return;
      }

      const data = await res.json();

      setloading(false);
      router.push(`/slides?id=${data.presentationId}`)

    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#22C55E]/20 flex flex-col">
      
      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo & Navigation */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-[20px] bg-[#22C55E] text-white flex items-center justify-center shadow-sm shadow-[#22C55E]/20 group-hover:scale-105 transition-transform">
                  <Presentation className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight text-gray-900 flex items-center gap-1.5">
                    SlideAI <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#A855F7]/10 text-[#A855F7] uppercase">WORKSPACE</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Gamma-Inspired Builder</span>
                </div>
              </Link>
            </div>

            {/* Right: Navbar Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="min-h-[44px] px-4 py-2.5 rounded-[20px] bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold text-xs flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-gray-500" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/create"
                className="min-h-[44px] px-5 py-2.5 rounded-[20px] bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-[#22C55E]/25 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Create New</span>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* ==================== MAIN PAGE CONTAINER ==================== */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-4xl space-y-10">
          
          {/* Header Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Slide Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Create AI Presentation Slides
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Enter your topic or prompt below, set your slide count, and click any theme preset to select it.
            </p>
          </div>

          {/* Prompt Engine Box */}
          <Promtpage 
            promt={promt} 
            setpromt={setpromt} 
            loading={loading} 
            slidecnt={slidecnt} 
            setslidecnt={setslidecnt} 
            handleSubmit={handleSubmit}
          />

          {/* Theme Selection Grid with Active Border */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#A855F7]" />
                <h2 className="text-xl font-bold text-gray-900">Select Theme</h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#22C55E]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="capitalize">Active: {selectedThemeId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allThemes.map((theme) => (
                <SlideCard 
                  key={theme.id} 
                  theme={theme} 
                  title={`${theme.id.charAt(0).toUpperCase() + theme.id.slice(1)} Theme`} 
                  subtitle={"Click to select this visual theme preset"}
                  isSelected={selectedThemeId === theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
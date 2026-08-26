'use client';

import React, { useState, useEffect } from 'react';
import Promtpage from "@/components/promtpage";
import SlideCard from "@/components/slidecard";
import Navbar from "@/components/navbar";
import { displayThemes } from "@/lib/theme";
import { Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';


export default function Create() {

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const [promt, setpromt] = useState<string>('');
  const [slidecnt, setslidecnt] = useState<number>(5);
  const [loading, setloading] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(displayThemes[0].id);

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setloading(true);

      if (promt.trim().length === 0) {
        setloading(false);
        return;
      }

      if (slidecnt > 20 || slidecnt < 1) {
        alert("At maximum 20 slides can be generated.");
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
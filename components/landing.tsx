'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import SlideCard from '@/components/slidecard';
import { 
  Sparkles, 
  Presentation, 
  Wand2, 
  Layers, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  ChevronRight, 
  Monitor, 
  Layout, 
  Image as ImageIcon, 
  Compass, 
  Check, 
  LogIn, 
  Lightbulb, 
  FileSpreadsheet, 
  FileText 
} from 'lucide-react';
import { displayThemes, ThemeColors } from '@/lib/theme';

export function LandingPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push('/dashboard');
    }
  }, [session, isPending, router]);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState('cream-sketchbook');

  const sampleSlides = [
    {
      number: 1,
      tag: "Intro",
      slideLayout: "IntroSlide",
      title: "The Productivity Crisis in Modern Work",
      subtitle: "Why knowledge workers lose 3.5 hours daily to digital clutter & context switching",
      content: [
        "78% of workers report feeling overwhelmed by fragmented SaaS tools",
        "Scattered documentation leads to missed deadlines and burnt-out teams",
      ],
    },
    {
      number: 2,
      tag: "Metrics",
      slideLayout: "StatGrid",
      title: "Key Performance & Time Savings",
      subtitle: "Measurable impact across 10,000+ early adopters",
      content: [
        "10x Faster Deck Creation",
        "99.8% Presentation Readiness",
        "3.5 hrs Saved Per Week",
      ],
    },
    {
      number: 3,
      tag: "Process",
      slideLayout: "ProcessSteps",
      title: "How SlideSpark Works",
      subtitle: "From rough concept to pitch-ready slides in three seamless steps",
      content: [
        "1. Input Prompt or Outline",
        "2. AI Structures Cards & Layouts",
        "3. Export PPTX or Present Live",
      ],
    },
    {
      number: 4,
      tag: "Comparison",
      slideLayout: "Comparison",
      title: "Old Way vs SlideSpark",
      subtitle: "Rethinking presentation authoring from first principles",
      content: [
        "Traditional: Hours tweaking box alignments, messy formatting",
        "SlideSpark: Intelligent cards, automated aesthetic themes, instant export",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans antialiased selection:bg-[#ffe95c] selection:text-[#1a3300]">
      
      {/* ==================== FLOATING NAVIGATION BAR ==================== */}
      <div className="sticky top-4 z-50 max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-3 sm:px-5 py-2.5 nav-glow flex items-center justify-between transition-all">
          
          {/* Logo Mark */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[8px] overflow-hidden border border-[#1a3300]/20 shadow-xs group-hover:scale-105 transition-transform bg-[#ffe95c] shrink-0">
              <img
                src="/logo.jpg"
                alt="SlideSpark Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-[#1a3300]">
                SlideSpark
              </span>
            </div>
          </Link>

          {/* Centered Nav Links (Inter 500, 14px in Forest Ink) */}
          <div className="hidden md:flex items-center gap-7 font-medium text-sm text-[#1a3300]">
            <a href="#interactive-preview" className="hover:underline underline-offset-4 decoration-[#ffe95c] decoration-2 transition-all">Themes</a>
            <a href="#how-it-works" className="hover:underline underline-offset-4 decoration-[#ffe95c] decoration-2 transition-all">Workflow</a>
            <a href="#features" className="hover:underline underline-offset-4 decoration-[#ffe95c] decoration-2 transition-all">Features</a>
          </div>

          {/* Auth CTA Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/signin"
              className="min-h-[38px] px-3.5 py-1.5 rounded-[6px] border border-[#1a3300] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </Link>

            <Link
              href="/create"
              className="min-h-[38px] px-4 py-1.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all cursor-pointer"
            >
              <span className="font-mono text-base leading-none">→</span>
              <span>Create</span>
            </Link>
          </div>

        </nav>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero-prompt" className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">

          {/* Main Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1a3300] tracking-[0.04em] leading-[1.05] mb-6 [text-wrap:balance]">
            Turn raw ideas into <br />
            <span className="bg-[#ffe95c] px-2.5 py-0.5 rounded-[4px] inline-block shadow-xs">
              high-impact decks
            </span>
          </h1>

          {/* Subhead Paragraph */}
          <p className="text-base sm:text-lg md:text-[19px] text-[#1a3300]/80 max-w-[620px] mx-auto mb-8 leading-relaxed font-normal [text-wrap:balance]">
            Type your presentation topic or paste bullet notes. SlideSpark structures titles, content cards, and sketchbook themes in seconds.
          </p>

          {/* Hero CTA Button */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <Link
              href="/create"
              className="min-h-[44px] px-6 py-2.5 rounded-[8px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative max-w-4xl mx-auto rounded-[12px] overflow-hidden border border-[#b6b6b6] shadow-[0_12px_36px_rgba(26,51,0,0.12)] bg-[#fcfaf5]">
            <img
              src="/hero.jpg"
              alt="SlideSpark Presentation Studio Interface"
              className="w-full h-auto object-cover block"
            />
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE SLIDE PREVIEW STAGE ==================== */}
      <section id="interactive-preview" className="py-20 bg-[#fcfaf5] border-y border-[#b6b6b6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              Sketchbook Card Layouts & Themes
            </h2>
            <p className="mt-2 text-[#1a3300]/70 text-sm sm:text-base">
              Explore how SlideSpark structures presentation cards across our curated sketchbook aesthetic palettes.
            </p>
          </div>

          {/* Actual Themes Switcher Bar */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {displayThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                  selectedThemeId === theme.id
                    ? 'bg-[#1a3300] text-[#fcfaf5] border-[#1a3300] shadow-sm'
                    : 'bg-white text-[#1a3300] border-[#b6b6b6] hover:bg-[#ffe95c]'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${theme.swatch}`} />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>

          {/* Slide Tab Switcher */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {sampleSlides.map((slide, idx) => (
              <button
                key={slide.number}
                onClick={() => setActiveTab(idx)}
                className={`min-h-[36px] px-4 py-1.5 rounded-[8px] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === idx
                    ? 'bg-[#ffe95c] text-[#1a3300] border-[#1a3300] font-bold'
                    : 'bg-white text-[#1a3300]/80 border-[#b6b6b6] hover:border-[#1a3300]'
                }`}
              >
                <span>Slide #{slide.number}</span>
                <span className="text-[11px] opacity-75">({slide.tag})</span>
              </button>
            ))}
          </div>

          {/* Active Preview Card Stage using real SlideCard */}
          <div className="max-w-3xl mx-auto shadow-xl rounded-[12px] overflow-hidden border border-[#b6b6b6]">
            <SlideCard
              theme={selectedThemeId}
              slideLayout={sampleSlides[activeTab].slideLayout}
              title={sampleSlides[activeTab].title}
              subtitle={sampleSlides[activeTab].subtitle}
              content={sampleSlides[activeTab].content}
              slideNumber={sampleSlides[activeTab].number}
              isSelected={false}
            />
          </div>

        </div>
      </section>

      {/* ==================== WORKFLOW SECTION ==================== */}
      <section id="how-it-works" className="py-20 bg-[#fcfaf5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              How SlideSpark Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Mint Sticky Note Card */}
            <div className="p-6 rounded-[12px] bg-[#d5f5c2] border border-[#1a3300] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center font-display font-extrabold text-base">
                  1
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a3300]">Enter Prompt or Notes</h3>
                <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                  Provide a single topic prompt, bullet points from a meeting, or raw outline notes.
                </p>
              </div>
              <div className="pt-3 border-t border-[#1a3300]/15 text-xs font-mono-tag font-semibold text-[#1a3300]">
                Natural Language Ingestion
              </div>
            </div>

            {/* Step 2: Teal Sticky Note Card */}
            <div className="p-6 rounded-[12px] bg-[#a8e5e5] border border-[#1a3300] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center font-display font-extrabold text-base">
                  2
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a3300]">Pick Slides & Theme</h3>
                <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                  Choose from 1 to 20 slides and select warm sketchbook, mint, teal, blush, or terracotta themes.
                </p>
              </div>
              <div className="pt-3 border-t border-[#1a3300]/15 text-xs font-mono-tag font-semibold text-[#1a3300]">
                Curated Color System
              </div>
            </div>

            {/* Step 3: Blush Sticky Note Card */}
            <div className="p-6 rounded-[12px] bg-[#f6d0ff] border border-[#1a3300] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-[6px] bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center font-display font-extrabold text-base">
                  3
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a3300]">Edit & Export Anywhere</h3>
                <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                  Browse slides in the filmstrip studio, generate visual sketches, and export instantly to PPTX or PDF.
                </p>
              </div>
              <div className="pt-3 border-t border-[#1a3300]/15 text-xs font-mono-tag font-semibold text-[#1a3300]">
                PowerPoint & PDF Ready
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== CAPABILITIES GRID ==================== */}
      <section id="features" className="py-20 bg-[#fcfaf5] border-t border-[#b6b6b6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              Everything You Need to Create & Present
            </h2>
            <p className="mt-2 text-[#1a3300]/70 text-sm sm:text-base">
              Powerful generative AI slide creation combined with modern design aesthetics and instant export options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: AI Slide Generation */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center font-bold">
                <Wand2 className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Autonomous Slide Generation</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Enter any topic or paste raw notes. AI instantly writes structured headlines, concise takeaways, and crafts your complete deck in seconds.
              </p>
            </div>

            {/* Feature 2: 7 Dynamic Layouts */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#d5f5c2] text-[#1a3300] flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">7 Context-Aware Layouts</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Adaptive layouts tailored for each slide: Intro Covers, Stat Grids, Sequential Process Steps, Side-by-Side Comparisons, Quotes, and Image Storytelling.
              </p>
            </div>

            {/* Feature 3: Curated Themes */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#a8e5e5] text-[#1a3300] flex items-center justify-center font-bold">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">8 Curated Editorial Themes</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Switch between Cream Sketchbook, Forest Ink, Mint Botanical, Terracotta Studio, Obsidian Editorial, and more with custom artistic background overlays.
              </p>
            </div>

            {/* Feature 4: AI Visuals */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#f6d0ff] text-[#1a3300] flex items-center justify-center font-bold">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Contextual AI Image Generation</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Generate high-resolution commercial photography and illustrations tailored specifically to your slide topic with 1-click generation and caching.
              </p>
            </div>

            {/* Feature 5: PPTX Export */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Editable PowerPoint (.pptx) Export</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Export native editable PPTX presentation files with matching color palettes, shapes, and formatted text boxes compatible with PowerPoint and Keynote.
              </p>
            </div>

            {/* Feature 6: Fullscreen Presenter */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#d5f5c2] text-[#1a3300] flex items-center justify-center font-bold">
                <Monitor className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Live Presentation Mode</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Deliver presentations seamlessly with true browser fullscreen, proportional 16:9 canvas scaling, slide counter, and arrow/spacebar keyboard navigation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-20 bg-[#fcfaf5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-[12px] bg-[#ffe95c] border border-[#1a3300] text-[#1a3300] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-lg">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.04em] leading-[1.1]">
                Ready to create your next slide deck?
              </h2>
              <p className="text-[#1a3300]/80 text-sm sm:text-base font-normal">
                Enter your topic prompt and generate complete presentations in seconds.
              </p>
            </div>

            <Link
              href="/create"
              className="min-h-[48px] px-6 py-3 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-sm shadow-sm flex items-center gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <span className="font-mono text-base leading-none">→</span>
              <span>Start Generator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#fcfaf5] text-[#1a3300]/70 py-10 border-t border-[#b6b6b6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[6px] overflow-hidden border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center bg-[#ffe95c] shrink-0">
              <img
                src="/logo.jpg"
                alt="SlideSpark Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#1a3300] font-bold text-sm">SlideSpark Presentation Studio</span>
          </div>

          <div className="text-xs font-mono-tag text-[#1a3300]/60">
            Creative Agency Sketchbook System &bull; &copy; {new Date().getFullYear()} SlideSpark
          </div>

        </div>
      </footer>

    </div>
  );
}
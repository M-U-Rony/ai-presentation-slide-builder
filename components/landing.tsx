'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
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

  const [prompt, setPrompt] = useState('Create a 5-slide pitch deck for an AI-powered personal productivity app');
  const [slideCount, setSlideCount] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState('cream');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/create?prompt=${encodeURIComponent(prompt)}&slides=${slideCount}&theme=${selectedThemeId}`);
  };

  const sampleSlides = [
    {
      number: 1,
      title: "The Productivity Crisis in Modern Work",
      subtitle: "Why knowledge workers lose 3.5 hours daily to digital clutter & context switching",
      bullets: [
        "78% of workers report feeling overwhelmed by fragmented SaaS tools",
        "Scattered docs lead to missed deadlines and burnt-out creative teams",
        "Legacy presentation builders require tedious manual alignment"
      ],
      tag: "Problem Statement"
    },
    {
      number: 2,
      title: "Introducing FlowAI: Context-Aware Slides",
      subtitle: "Autonomous presentation orchestration powered by generative intelligence",
      bullets: [
        "Automatically writes titles, structured bullets & layout cards",
        "1-click exports to PowerPoint PPTX & crisp landscape PDF",
        "Sketchbook and moodboard aesthetic presets tailored for creative minds"
      ],
      tag: "The Solution"
    },
    {
      number: 3,
      title: "Market Opportunity & Growth Projection",
      subtitle: "Capturing the $42B presentation and workflow automation market",
      bullets: [
        "TAM: $42B global presentation ecosystem growing at 24% CAGR",
        "Initial Target: 50M founders, agencies, and knowledge creators",
        "Freemium conversion strategy with team workspace collaboration"
      ],
      tag: "Business Model"
    }
  ];

  const currentTheme = displayThemes.find(t => t.id === selectedThemeId) || displayThemes[0];

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans antialiased selection:bg-[#ffe95c] selection:text-[#1a3300]">
      
      {/* ==================== FLOATING NAVIGATION BAR ==================== */}
      <div className="sticky top-4 z-50 max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-3 sm:px-5 py-2.5 nav-glow flex items-center justify-between transition-all">
          
          {/* Logo Mark: 40x40 #ffe95c square with hand-drawn monogram + 'SlideAI' Inter 700 20px in Forest Ink */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center font-display font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
              lo
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-[#1a3300]">
                SlideAI
              </span>
            </div>
          </Link>

          {/* Centered Nav Links (Inter 500, 14px in Forest Ink) */}
          <div className="hidden md:flex items-center gap-7 font-medium text-sm text-[#1a3300]">
            <a href="#hero-prompt" className="hover:underline underline-offset-4 decoration-[#ffe95c] decoration-2 transition-all">Generator</a>
            <Link href="/dashboard" className="hover:underline underline-offset-4 decoration-[#ffe95c] decoration-2 transition-all">Dashboard</Link>
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
      <section id="hero-prompt" className="relative pt-12 pb-20 md:pt-18 md:pb-28 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">

          {/* Main Display Headline (Bricolage Grotesque 800 with yellow marker wash) */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1a3300] tracking-[0.04em] leading-[1.05] mb-6 [text-wrap:balance]">
            Turn raw ideas into <br />
            <span className="bg-[#ffe95c] px-2.5 py-0.5 rounded-[4px] inline-block shadow-xs">
              high-impact decks
            </span>
          </h1>

          {/* Subhead Paragraph (Inter 400 at 18-20px, max-width ~600px) */}
          <p className="text-base sm:text-lg md:text-[19px] text-[#1a3300]/80 max-w-[600px] mx-auto mb-10 leading-relaxed font-normal [text-wrap:balance]">
            Type your presentation topic or paste bullet notes. SlideAI structures titles, content cards, and sketchbook themes in seconds.
          </p>

          {/* ==================== HERO PROMPT GENERATOR CONTAINER ==================== */}
          <div className="max-w-2xl mx-auto bg-[#fcfaf5] p-5 sm:p-7 rounded-[12px] border border-[#1a3300] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] text-left">
            <form onSubmit={handleGenerate} className="space-y-4">
              
              {/* Text Input */}
              <div className="relative group">
                <div className="absolute top-3.5 left-3.5 text-[#1a3300]/60 group-focus-within:text-[#1a3300] transition-colors">
                  <Wand2 className="w-4 h-4" />
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your presentation topic or paste raw outline notes..."
                  rows={3}
                  className="w-full pl-10 pr-3.5 pt-3 pb-2.5 bg-white text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm sm:text-base font-normal resize-none outline-none transition-all"
                />
              </div>

              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#b6b6b6]/60">
                
                {/* Slide Count Options */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono-tag font-semibold text-[#1a3300]/80 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Length:
                  </span>
                  <div className="flex items-center gap-1 bg-[#1a3300]/5 p-0.5 rounded-[6px] border border-[#b6b6b6]">
                    {[3, 5, 8, 10].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setSlideCount(count)}
                        className={`min-h-[32px] px-2.5 py-1 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
                          slideCount === count
                            ? 'bg-[#1a3300] text-[#fcfaf5]'
                            : 'text-[#1a3300] hover:bg-[#ffe95c]'
                        }`}
                      >
                        {count} Slides
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono-tag font-semibold text-[#1a3300]/80 uppercase tracking-wider flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5" />
                    Palette:
                  </span>
                  <div className="flex items-center gap-1 bg-[#1a3300]/5 p-0.5 rounded-[6px] border border-[#b6b6b6]">
                    {displayThemes.slice(0, 4).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedThemeId(t.id)}
                        className={`min-h-[32px] px-2 py-1 rounded-[6px] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          selectedThemeId === t.id
                            ? 'bg-[#1a3300] text-[#fcfaf5] font-bold'
                            : 'text-[#1a3300] hover:bg-[#ffe95c]'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${t.swatch}`} />
                        {t.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full min-h-[48px] px-6 py-3 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-medium text-base flex items-center justify-center gap-2 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all active:scale-[0.99] cursor-pointer"
              >
                <span className="font-mono text-lg leading-none">→</span>
                <span>Generate {slideCount}-Slide Presentation Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </form>

            {/* Reassurance Caption below CTA (Inter 400 12-14px) */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-[#b6b6b6]/40 text-xs text-[#1a3300]/70 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" /> No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" /> Instant PPTX & PDF exports
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3300]" /> Clean moodboard layout
              </span>
            </div>
          </div>

          {/* Backed-by Logo Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[#b6b6b6] text-xs font-mono-tag">
            <span className="text-[#1a3300]/60 font-sans text-xs">Backed by design principles of:</span>
            <div className="flex items-center gap-6 font-display text-sm tracking-wider font-bold text-[#1a3300]/50 uppercase">
              <span className="hover:text-[#1a3300] transition-colors">Notion</span>
              <span>&bull;</span>
              <span className="hover:text-[#1a3300] transition-colors">Pitch</span>
              <span>&bull;</span>
              <span className="hover:text-[#1a3300] transition-colors">Linear</span>
              <span>&bull;</span>
              <span className="hover:text-[#1a3300] transition-colors">Framer</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE SLIDE PREVIEW STAGE ==================== */}
      <section id="interactive-preview" className="py-20 bg-[#fcfaf5] border-y border-[#b6b6b6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              Sketchbook Card Layouts
            </h2>
            <p className="mt-2 text-[#1a3300]/70 text-sm sm:text-base">
              Explore how SlideAI structures presentation cards across pastel sticky-note aesthetics.
            </p>
          </div>

          {/* Theme Switcher Bar */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {displayThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`min-h-[36px] px-3.5 py-1 rounded-[6px] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  selectedThemeId === theme.id
                    ? 'bg-[#1a3300] text-[#fcfaf5] border-[#1a3300] shadow-xs'
                    : 'bg-white text-[#1a3300] border-[#b6b6b6] hover:bg-[#ffe95c]'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${theme.swatch}`} />
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
                className={`min-h-[36px] px-4 py-1.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
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

          {/* Active Preview Card Stage */}
          <div className="max-w-3xl mx-auto">
            <div className={`p-6 sm:p-10 rounded-[12px] border ${currentTheme.border} ${currentTheme.background} transition-all duration-200 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] relative overflow-hidden`}>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono-tag font-bold uppercase tracking-wider text-current opacity-80">
                  {sampleSlides[activeTab].tag}
                </span>
                <span className="text-xs font-mono-tag font-medium text-current opacity-70">
                  Slide {sampleSlides[activeTab].number} of {sampleSlides.length}
                </span>
              </div>

              {/* Headline */}
              <h3 className={`font-display text-2xl sm:text-3xl font-extrabold mb-2 tracking-[0.04em] leading-[1.15] [text-wrap:balance] ${currentTheme.primaryText}`}>
                {sampleSlides[activeTab].title}
              </h3>
              <p className={`text-sm sm:text-base mb-6 font-normal ${currentTheme.secondaryText}`}>
                {sampleSlides[activeTab].subtitle}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3">
                {sampleSlides[activeTab].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-[6px] bg-white/70 border border-[#1a3300]/15">
                    <div className="w-5 h-5 rounded-full bg-[#1a3300] text-[#fcfaf5] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-normal leading-relaxed text-[#1a3300]">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-current/15 flex items-center justify-between text-xs opacity-75">
                <span className="flex items-center gap-1.5 font-semibold text-current">
                  <Sparkles className="w-3.5 h-3.5" /> 16:9 Presentation Format
                </span>
                <span className="font-mono-tag text-[11px]">SlideAI Sketch Engine</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== WORKFLOW SECTION ==================== */}
      <section id="how-it-works" className="py-20 bg-[#fcfaf5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              How SlideAI Works
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
              Designed For Presentation Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Capability 1 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center font-bold">
                <Wand2 className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">OpenRouter AI Brain</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Generates concise titles, bullet points, and key takeaways structured specifically for presentation slides.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#d5f5c2] text-[#1a3300] flex items-center justify-center font-bold">
                <Layout className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Filmstrip Studio</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Google Slides and PowerPoint style left sidebar for fluid navigation between presentation cards.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#a8e5e5] text-[#1a3300] flex items-center justify-center font-bold">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Visual Sketches</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Render graphics and atmospheric artwork directly onto presentation cards with 1-click generation.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#f6d0ff] text-[#1a3300] flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Instant PPTX Download</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Export native editable PowerPoint (.pptx) slide files compatible with Microsoft PowerPoint & Keynote.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Landscape PDF Print</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                One-click print engine formatted for crisp landscape slide PDF export with zero UI clutter.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="p-6 rounded-[12px] bg-white border border-[#1a3300] space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[6px] bg-[#d5f5c2] text-[#1a3300] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1a3300]">Prisma Deck History</h3>
              <p className="text-xs sm:text-sm text-[#1a3300]/80 leading-relaxed">
                Save presentations reliably into PostgreSQL database for quick retrieval on your user dashboard.
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
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#ffe95c] border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center font-display font-extrabold text-sm">
              lo
            </div>
            <span className="text-[#1a3300] font-bold text-sm">SlideAI Presentation Studio</span>
          </div>

          <div className="text-xs font-mono-tag text-[#1a3300]/60">
            Creative Agency Sketchbook System &bull; &copy; {new Date().getFullYear()} SlideAI
          </div>

        </div>
      </footer>

    </div>
  );
}
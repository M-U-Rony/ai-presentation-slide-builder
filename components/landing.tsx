'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Presentation, 
  Wand2, 
  Layers, 
  Palette, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Sliders, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Monitor,
  Layout,
  MousePointer
} from 'lucide-react';

export function LandingPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('Create a 5-slide pitch deck for an AI-powered personal productivity app');
  const [slideCount, setSlideCount] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('modern');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/create?prompt=${encodeURIComponent(prompt)}&slides=${slideCount}&theme=${selectedTheme}`);
  };

  const sampleSlides = [
    {
      number: 1,
      title: "The Productivity Crisis in Modern Workplaces",
      subtitle: "Why knowledge workers lose 3.5 hours daily to context switching",
      bullets: [
        "78% of workers report feeling overwhelmed by digital clutter",
        "Fragmented tools lead to missed deadlines and burnt-out teams",
        "Existing solutions require tedious manual setup and tagging"
      ],
      tag: "Problem Statement"
    },
    {
      number: 2,
      title: "Introducing FlowAI: Your Context-Aware Assistant",
      subtitle: "Autonomous task orchestration powered by generative intelligence",
      bullets: [
        "Automatically prioritizes action items based on urgency & energy",
        "Seamless 1-click integration with Slack, Google Workspace, & Notion",
        "Zero setup required — learns your workflow habits in 48 hours"
      ],
      tag: "The Solution"
    },
    {
      number: 3,
      title: "Market Opportunity & Growth Projection",
      subtitle: "Capturing the $42B productivity and workflow automation market",
      bullets: [
        "TAM: $42B global market growing at 24% CAGR",
        "Initial Target: 50M remote technology workers in NA & EU",
        "Freemium conversion strategy with $15/user/month enterprise tier"
      ],
      tag: "Business Model"
    }
  ];

  const themeStyles: Record<string, { bg: string; text: string; accent: string; border: string; badge: string }> = {
    modern: {
      bg: "bg-gray-950",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-cyan-500/30",
      badge: "bg-cyan-500/20 text-cyan-300"
    },
    emerald: {
      bg: "bg-emerald-950",
      text: "text-emerald-50",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      badge: "bg-emerald-500/20 text-emerald-300"
    },
    professional: {
      bg: "bg-slate-950",
      text: "text-slate-50",
      accent: "text-amber-400",
      border: "border-blue-500/30",
      badge: "bg-amber-500/20 text-amber-300"
    },
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      accent: "text-[#22C55E]",
      border: "border-gray-200",
      badge: "bg-[#22C55E]/10 text-[#22C55E]"
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-[#22C55E]/20 selection:text-[#22C55E]">
      
      {/* ==================== NAVIGATION BAR ==================== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-[20px] bg-[#22C55E] text-white flex items-center justify-center shadow-md shadow-[#22C55E]/20 group-hover:scale-105 transition-transform">
                <Presentation className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900 flex items-center gap-1.5">
                  SlideAI <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#A855F7]/10 text-[#A855F7] uppercase">PRO</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">Gamma-Inspired Builder</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
              <a href="#hero-prompt" className="hover:text-[#22C55E] transition-colors">Instant Generator</a>
              <a href="#how-it-works" className="hover:text-[#22C55E] transition-colors">How It Works</a>
              <a href="#interactive-preview" className="hover:text-[#22C55E] transition-colors">Slide Themes</a>
              <a href="#features" className="hover:text-[#22C55E] transition-colors">Features</a>
            </div>

            {/* CTA Action */}
            <div className="flex items-center gap-3">
              <Link
                href="/create"
                className="min-h-[44px] px-6 py-2.5 rounded-[20px] bg-[#22C55E] hover:bg-[#16a34a] text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-[#22C55E]/25 transition-all hover:shadow-lg hover:shadow-[#22C55E]/35 active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                Create Presentation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero-prompt" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F3F4F6]/60 via-white to-white">
        {/* Background Decorative Blur Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#22C55E]/30 rounded-full mix-blend-multiply" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#3B82F6]/30 rounded-full mix-blend-multiply" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-[#A855F7]/25 rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-medium text-xs sm:text-sm mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#22C55E]" />
            <span>AI Slide Content Engine & Realtime Themes</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
            Turn Any Idea or Prompt into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#22C55E] via-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
              Stunning Presentation Slides
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Type your prompt or outline, pick your slide count, and watch AI generate high-impact slide content formatted into curated themes in seconds.
          </p>

          {/* ==================== INTERACTIVE PROMPT GENERATOR BOX ==================== */}
          <div className="max-w-3xl mx-auto bg-[#F3F4F6] p-4 sm:p-6 rounded-[20px] border border-gray-200/80 shadow-lg shadow-gray-200/50">
            <form onSubmit={handleGenerate} className="space-y-4">
              
              {/* Prompt Input Bubble */}
              <div className="relative">
                <div className="absolute top-4 left-4 text-gray-400">
                  <Wand2 className="w-5 h-5 text-[#22C55E]" />
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your presentation topic or paste raw notes here..."
                  rows={3}
                  className="w-full pl-12 pr-4 pt-3.5 pb-3 bg-white text-gray-900 placeholder-gray-400 rounded-[20px] border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 text-base font-normal resize-none outline-none transition-all"
                />
              </div>

              {/* Controls Row: Slide Count & Theme Selection */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-200/60">
                
                {/* Slide Count Selector */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                    Slides:
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {[3, 5, 8, 10].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setSlideCount(count)}
                        className={`min-h-[36px] px-3 py-1 rounded-[16px] text-xs font-semibold transition-all ${
                          slideCount === count
                            ? 'bg-[#3B82F6] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {count} Cards
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#A855F7]" />
                    Theme:
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[20px] border border-gray-200">
                    {[
                      { id: 'modern', label: 'Modern', color: 'bg-cyan-500' },
                      { id: 'emerald', label: 'Emerald', color: 'bg-[#22C55E]' },
                      { id: 'professional', label: 'Pro', color: 'bg-blue-600' },
                      { id: 'light', label: 'Light', color: 'bg-gray-400' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTheme(t.id)}
                        className={`min-h-[36px] px-2.5 py-1 rounded-[16px] text-xs font-medium flex items-center gap-1.5 transition-all ${
                          selectedTheme === t.id
                            ? 'bg-gray-900 text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${t.color}`} />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full min-h-[48px] px-6 py-3.5 rounded-[20px] bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md shadow-[#22C55E]/30 transition-all hover:shadow-lg hover:shadow-[#22C55E]/40 active:scale-[0.99]"
              >
                <Wand2 className="w-5 h-5 fill-current" />
                <span>Generate {slideCount} Presentation Slides Now</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Free instant generation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" /> Export & copy slides
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A855F7]" /> 6 Custom design themes
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE SLIDE PREVIEW SECTION ==================== */}
      <section id="interactive-preview" className="py-20 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-2">Live AI Output Preview</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              See How AI Formats Your Slide Content
            </p>
            <p className="mt-3 text-gray-600 text-base">
              Click through generated slide cards below and toggle themes to test live aesthetics.
            </p>
          </div>

          {/* Slide Switcher Controls */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {sampleSlides.map((slide, idx) => (
              <button
                key={slide.number}
                onClick={() => setActiveTab(idx)}
                className={`min-h-[44px] px-5 py-2 rounded-[20px] text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-[#22C55E] text-white shadow-md shadow-[#22C55E]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span>Card #{slide.number}</span>
                <span className="text-xs opacity-80">({slide.tag})</span>
              </button>
            ))}
          </div>

          {/* Active Preview Card Container */}
          <div className="max-w-4xl mx-auto">
            <div className={`p-8 sm:p-12 rounded-[20px] border ${themeStyles[selectedTheme].bg} ${themeStyles[selectedTheme].text} ${themeStyles[selectedTheme].border} transition-all duration-300 shadow-xl relative overflow-hidden`}>
              
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-[16px] text-xs font-bold uppercase tracking-wider ${themeStyles[selectedTheme].badge}`}>
                  {sampleSlides[activeTab].tag}
                </span>
                <span className="text-xs font-mono font-medium opacity-60">
                  Slide {sampleSlides[activeTab].number} of {sampleSlides.length}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight ${themeStyles[selectedTheme].text}`}>
                {sampleSlides[activeTab].title}
              </h3>
              <p className={`text-base sm:text-lg mb-8 opacity-80 ${themeStyles[selectedTheme].accent}`}>
                {sampleSlides[activeTab].subtitle}
              </p>

              {/* Bullet Points Grid */}
              <div className="space-y-4">
                {sampleSlides[activeTab].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-[16px] bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    </div>
                    <span className="text-sm sm:text-base font-normal leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Interactive Prompt refinement mock */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs opacity-70">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#A855F7]" />
                  <span>Refine content with chat prompt...</span>
                </div>
                <span className="font-semibold text-[#22C55E]">Gamma Layout Engine</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== 3-STEP WORKFLOW ==================== */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#3B82F6] uppercase mb-2">Simplicity First</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Decks in 3 Simple Steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-[#F3F4F6] p-8 rounded-[20px] border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-[20px] bg-[#22C55E] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Provide Topic or Prompt</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enter a sentence, paste your meeting notes, or outline your key business objectives into our prompt box.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-semibold text-[#22C55E] flex items-center gap-1">
                <span>Prompt Input Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F3F4F6] p-8 rounded-[20px] border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-[20px] bg-[#3B82F6] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Select Slide Count & Theme</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose how many slides you need (3 to 10) and pick from curated theme presets like Modern, Emerald, or Lucrative.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-semibold text-[#3B82F6] flex items-center gap-1">
                <span>Custom Aesthetics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F3F4F6] p-8 rounded-[20px] border border-gray-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-[20px] bg-[#A855F7] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant AI Slide Generation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our OpenRouter AI model writes titles, bullet points, and key takeaways formatted directly into presentation cards.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-semibold text-[#A855F7] flex items-center gap-1">
                <span>OpenRouter Power</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section id="features" className="py-20 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#A855F7] uppercase mb-2">Built For Speed</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Everything You Need For High-Impact Slides
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mb-4 font-bold">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Prompt-to-Presentation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transform single prompts or messy notes into organized, multi-slide decks with clear hierarchy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-4 font-bold">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Live Theme Switcher</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Preview your presentation across 6 custom themes without re-generating your underlying text content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center mb-4 font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chat Bubble Refinement</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use natural language chat bubble inputs to request revisions, expand bullets, or simplify slide text.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mb-4 font-bold">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Slide Counts</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Need a quick 3-slide summary or a detailed 10-slide deck? Choose your exact slide length easily.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-4 font-bold">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Responsive Presentation View</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Present directly from your browser on desktop, tablet, or mobile with touch-optimized controls.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-[20px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-[16px] bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center mb-4 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Response & API</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Powered by fast LLM endpoints via OpenRouter SDK for rapid content generation without lag.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-10 sm:p-14 rounded-[20px] bg-gradient-to-r from-[#22C55E] via-emerald-600 to-[#3B82F6] text-white shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            
            <div className="max-w-xl z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Ready to Build Your Next Presentation?
              </h2>
              <p className="text-emerald-100 text-base sm:text-lg">
                Enter your prompt now and let AI generate complete slide content in seconds.
              </p>
            </div>

            <Link
              href="/create"
              className="min-h-[48px] px-8 py-3.5 rounded-[20px] bg-white text-gray-900 hover:bg-emerald-50 font-bold text-base shadow-lg flex items-center gap-2 shrink-0 transition-transform active:scale-95 z-10"
            >
              <Sparkles className="w-5 h-5 text-[#22C55E]" />
              Start Free Generator
            </Link>

          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[14px] bg-[#22C55E] text-white flex items-center justify-center font-bold">
              <Presentation className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">SlideAI Builder</span>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Designed with ChatBubble System &bull; Gamma-Inspired Slide Engine &bull; &copy; {new Date().getFullYear()}
          </div>

        </div>
      </footer>

    </div>
  );
}
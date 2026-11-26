"use client";

import SlideCard from "@/components/slidecard";
import Navbar from "@/components/navbar";
import { allThemes } from "@/lib/theme";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  Loader2,
  Presentation as PresentationIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Image as ImageIcon,
  RefreshCw,
  X,
  FileSpreadsheet,
  FileText,
  Play,
} from "lucide-react";
import Link from "next/link";
import { Presentation } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { exportPresentationToPPTX } from "@/lib/pptxExport";

function SlideshowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Re-generate / generate image for current active slide
  async function generateImg() {
    if (!presentation || !presentation.slides?.length) return;
    const currentSlide = presentation.slides[activeSlideIndex];
    if (!currentSlide || !currentSlide.id) return;

    try {
      setIsGeneratingImg(true);
      const res = await fetch("/api/generateImg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slideId: currentSlide.id }),
      });

      const data = await res.json();
      if (data.success && data.data?.image) {
        setPresentation((prev) => {
          if (!prev) return prev;
          const updatedSlides = [...prev.slides];
          updatedSlides[activeSlideIndex] = {
            ...updatedSlides[activeSlideIndex],
            imgUrl: data.data.image,
          };
          return { ...prev, slides: updatedSlides };
        });
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGeneratingImg(false);
    }
  }

  async function exportToPPTX() {
    if (!presentation || !presentation.slides?.length) return;

    try {
      setIsExporting(true);
      await exportPresentationToPPTX(presentation);
    } catch (error) {
      console.error("Failed to export PPTX:", error);
    } finally {
      setIsExporting(false);
    }
  }

  function exportToPDF() {
    if (!presentation) return;
    const originalTitle = document.title;
    if (presentation.title) {
      document.title = presentation.title;
    }
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function getPresentation() {
      try {
        setLoading(true);
        const res = await fetch(`/api/getPresentation?id=${id}`);
        if (!res.ok) {
          console.error("Error in fetching presentation");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPresentation(data.data);
      } catch (error) {
        console.error("Failed to load presentation:", error);
      } finally {
        setLoading(false);
      }
    }

    getPresentation();
  }, [id]);

  // Fullscreen presentation handlers
  const enterFullscreen = () => {
    setIsFullscreen(true);
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (err) {
      console.error("Exit fullscreen error:", err);
    }
  };

  // Sync state if browser fullscreen changes (e.g. user pressed Escape)
  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard navigation for presentation & studio
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!presentation?.slides?.length) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (
        e.key === "ArrowRight" ||
        e.key === "PageDown" ||
        (isFullscreen && (e.key === " " || e.key === "Enter"))
      ) {
        if (isFullscreen && (e.key === " " || e.key === "Enter"))
          e.preventDefault();
        setActiveSlideIndex((prev) =>
          Math.min(presentation.slides.length - 1, prev + 1),
        );
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "PageUp" ||
        (isFullscreen && e.key === "Backspace")
      ) {
        if (isFullscreen && e.key === "Backspace") e.preventDefault();
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentation, isFullscreen]);

  const currentSlide = presentation?.slides?.[activeSlideIndex];

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#fcfaf5] flex flex-col items-center justify-center gap-3 text-[#1a3300]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a3300]" />
        <p className="text-sm font-semibold">Opening presentation studio...</p>
      </div>
    );
  }

  if (!presentation || !presentation.slides?.length) {
    return (
      <div className="h-screen w-screen bg-[#fcfaf5] flex flex-col items-center justify-center p-6 text-center text-[#1a3300]">
        <div className="bg-white p-8 rounded-[12px] shadow-sm border border-[#1a3300] max-w-md w-full">
          <div className="w-12 h-12 rounded-[6px] bg-[#ffe95c] text-[#1a3300] flex items-center justify-center mx-auto mb-4 border border-[#1a3300]/20 font-bold">
            <PresentationIcon className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold mb-2">
            No Presentation Found
          </h2>
          <p className="text-xs text-[#1a3300]/70 mb-6">
            Could not find slides for this presentation ID.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-xs rounded-[6px] transition shadow-sm cursor-pointer"
          >
            <span className="font-mono text-base leading-none">→</span>
            <span>Create New Presentation</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* PRINT-ONLY CONTAINER (EXPORT PDF RENDERS ALL SLIDES IN DECK) */}
      <div className="print-container">
        {presentation.slides.map((slide, idx) => (
          <div key={slide.id || idx} className="print-slide-page">
            <SlideCard
              theme={presentation.themeColors}
              title={slide.title}
              subtitle={slide.subtitle}
              content={slide.content}
              imgUrl={slide.imgUrl}
              slideLayout={slide.slideLayout}
              isSelected={false}
              slideNumber={idx + 1}
              isPrint={true}
            />
          </div>
        ))}
      </div>

      {/* INTERACTIVE WEB SCREEN CONTAINER (HIDDEN WHEN PRINTING TO PDF) */}
      <div className="screen-wrapper no-print h-screen w-screen max-h-screen overflow-hidden bg-[#fcfaf5] text-[#1a3300] flex flex-col font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] select-none">
        {/* FULLSCREEN PRESENTATION MODE OVERLAY */}
        {isFullscreen && currentSlide && (
          <div className="fixed inset-0 z-[100] bg-[#0b0d10] text-white flex flex-col items-center justify-center animate-in fade-in duration-200 select-none">
            {/* Top Right Presenter Status & Exit */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2.5 z-50">
              <span className="text-xs font-mono font-bold text-white/90 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-[6px]">
                {activeSlideIndex + 1} / {presentation.slides.length}
              </span>
              <button
                onClick={exitFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white transition cursor-pointer text-xs font-semibold"
                title="Exit Presentation (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>

            {/* Presentation 16:9 Canvas Stage */}
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden relative">
              <div className="w-full max-w-[calc((100vh-100px)*16/9)] max-h-[calc(100vh-100px)] aspect-[16/9] shadow-2xl rounded-[12px] overflow-hidden relative flex flex-col justify-between">
                <SlideCard
                  theme={presentation.themeColors}
                  slideLayout={currentSlide.slideLayout}
                  title={currentSlide.title}
                  subtitle={currentSlide.subtitle}
                  content={currentSlide.content}
                  imgUrl={currentSlide.imgUrl}
                  isGeneratingImg={isGeneratingImg}
                  isSelected={false}
                  slideNumber={activeSlideIndex + 1}
                />
              </div>
            </div>

            {/* Bottom Floating Presenter Navigation Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 backdrop-blur-lg text-white px-4 py-2 rounded-full border border-white/20 shadow-2xl z-50">
              <button
                onClick={() =>
                  setActiveSlideIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={activeSlideIndex === 0}
                className="p-1.5 rounded-full hover:bg-white/20 text-white disabled:opacity-25 transition cursor-pointer"
                title="Previous Slide (← / Space)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold px-2 text-white/90">
                Slide {activeSlideIndex + 1} of {presentation.slides.length}
              </span>

              <button
                onClick={() =>
                  setActiveSlideIndex((prev) =>
                    Math.min(presentation.slides.length - 1, prev + 1),
                  )
                }
                disabled={
                  activeSlideIndex === presentation.slides.length - 1
                }
                className="p-1.5 rounded-full hover:bg-white/20 text-white disabled:opacity-25 transition cursor-pointer"
                title="Next Slide (→ / Space / Enter)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== TOP NAVBAR STUDIO ZONE ==================== */}
        <header className="w-full shrink-0 py-2.5 bg-[#fcfaf5] border-b border-[#b6b6b6] z-40">
          <Navbar className="relative" />
        </header>

        {/* ==================== WORKSPACE ==================== */}
        <div className="flex-1 h-0 overflow-hidden flex">
          {/* POWERPOINT LEFT FILMSTRIP SIDEBAR */}
          <aside className="w-44 sm:w-52 md:w-60 h-full border-r border-[#b6b6b6] bg-[#fcfaf5] p-3 flex flex-col gap-2.5 overflow-y-auto shrink-0 select-none">
            <div className="flex flex-col gap-2.5">
              {presentation.slides.map((slide, index) => {
                const isSelected = index === activeSlideIndex;
                return (
                  <div
                    key={slide.id || index}
                    onClick={() => setActiveSlideIndex(index)}
                    className="flex items-start gap-1.5 cursor-pointer group"
                  >
                    {/* Slide Index Number on left side */}
                    <span
                      className={`text-xs font-mono-tag mt-1 min-w-[14px] text-right ${
                        isSelected
                          ? "text-[#1a3300] font-bold"
                          : "text-[#1a3300]/50 group-hover:text-[#1a3300]"
                      }`}
                    >
                      {index + 1}
                    </span>

                    {/* 16:9 Thumbnail Preview Card */}
                    <div
                      className={`flex-1 rounded-[6px] transition-all duration-150 overflow-hidden ${
                        isSelected
                          ? "border-2 border-[#1a3300] ring-2 ring-[#ffe95c]"
                          : "border border-[#b6b6b6] hover:border-[#1a3300]"
                      }`}
                    >
                      <SlideCard
                        theme={presentation.themeColors}
                        slideLayout={slide.slideLayout}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        content={slide.content}
                        imgUrl={slide.imgUrl}
                        isThumbnail={true}
                        isSelected={false}
                        slideNumber={index + 1}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* CENTER MAIN STAGE */}
          <main className="flex-1 h-full bg-[#f1f1f1] p-4 md:p-6 lg:p-8 flex flex-col items-center justify-between overflow-auto relative">
            <div className="flex-1 w-full max-w-4xl flex items-center justify-center min-h-0">
              <div className="w-full shadow-[rgba(0,0,0,0.06)_0px_2px_8px_0px] rounded-[12px] overflow-hidden border border-[#b6b6b6] transition-all duration-200 relative group bg-[#fcfaf5]">
                {/* Options Dropdown Menu Button */}
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    className="p-2 rounded-[6px] bg-white/90 backdrop-blur-md hover:bg-white text-[#1a3300] border border-[#1a3300] shadow-xs transition flex items-center justify-center cursor-pointer"
                    title="Slide Options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute top-11 left-0 w-48 bg-white border border-[#1a3300] rounded-[6px] shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          generateImg();
                        }}
                        disabled={isGeneratingImg}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1a3300] hover:bg-[#ffe95c] rounded-[4px] transition w-full text-left cursor-pointer disabled:opacity-50"
                      >
                        <ImageIcon className="w-4 h-4 text-[#1a3300]" />
                        <span>Generate Visual</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          generateImg();
                        }}
                        disabled={isGeneratingImg}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1a3300] hover:bg-[#ffe95c] rounded-[4px] transition w-full text-left cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className="w-4 h-4 text-[#1a3300]" />
                        <span>Re-generate Image</span>
                      </button>
                    </div>
                  )}
                </div>

                {currentSlide && (
                  <SlideCard
                    theme={presentation.themeColors}
                    title={currentSlide.title}
                    slideLayout={currentSlide.slideLayout}
                    subtitle={currentSlide.subtitle}
                    content={currentSlide.content}
                    imgUrl={currentSlide.imgUrl}
                    isGeneratingImg={isGeneratingImg}
                    isSelected={false}
                    slideNumber={activeSlideIndex + 1}
                  />
                )}
              </div>
            </div>

            {/* BOTTOM SLIDE CONTROLS (DIRECTLY BELOW CENTER SLIDE) */}
            <div className="shrink-0 pt-3 pb-2 flex items-center justify-center gap-3 select-none flex-wrap">
              {/* Slide page switcher */}
              <div className="flex items-center gap-1.5 bg-white border border-[#b6b6b6] rounded-[8px] px-2 py-1 shadow-xs">
                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={activeSlideIndex === 0}
                  className="p-1.5 rounded-[5px] hover:bg-[#ffe95c] text-[#1a3300] disabled:opacity-25 transition cursor-pointer"
                  title="Previous Slide (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono-tag font-bold text-[#1a3300] px-3 min-w-[75px] text-center select-none">
                  {activeSlideIndex + 1} / {presentation.slides.length}
                </span>

                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) =>
                      Math.min(presentation.slides.length - 1, prev + 1),
                    )
                  }
                  disabled={
                    activeSlideIndex === presentation.slides.length - 1
                  }
                  className="p-1.5 rounded-[5px] hover:bg-[#ffe95c] text-[#1a3300] disabled:opacity-25 transition cursor-pointer"
                  title="Next Slide (→)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="h-5 w-[1px] bg-[#b6b6b6] mx-0.5 hidden sm:block" />

              {/* Action Buttons (PPTX, PDF, Present) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={exportToPPTX}
                  disabled={isExporting}
                  className="min-h-[36px] px-3.5 py-1.5 rounded-[8px] border border-[#1a3300] bg-white hover:bg-[#ffe95c] disabled:bg-[#f1f1f1] text-[#1a3300] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="Export PowerPoint (.pptx)"
                >
                  {isExporting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  )}
                  <span>PPTX</span>
                </button>

                <button
                  onClick={exportToPDF}
                  className="min-h-[36px] px-3.5 py-1.5 rounded-[8px] border border-[#1a3300] bg-white hover:bg-[#ffe95c] text-[#1a3300] font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="Export PDF (All Slides)"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={enterFullscreen}
                  className="min-h-[36px] px-4 py-1.5 rounded-[8px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  title="Present Fullscreen"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Present</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default function Slideshow() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#fcfaf5] flex items-center justify-center text-[#1a3300] text-sm font-semibold gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#1a3300]" /> Loading
          Studio...
        </div>
      }
    >
      <SlideshowContent />
    </Suspense>
  );
}

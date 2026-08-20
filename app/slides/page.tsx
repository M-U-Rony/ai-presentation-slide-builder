"use client";

import SlideCard from "@/components/slidecard";
import { allThemes } from "@/lib/theme";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  Loader2,
  ArrowLeft,
  Presentation as PresentationIcon,
  Play,
  ChevronLeft,
  ChevronRight,
  Layers,
  MoreVertical,
  Image as ImageIcon,
  RefreshCw,
  X,
  Maximize2,
  Download,
  FileText,
  FileSpreadsheet,
  LogOut,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Slide } from "@/lib/types";
import pptxgen from "pptxgenjs";
import { authClient } from "@/lib/auth-client";

interface PresentationData {
  id: number;
  title: string;
  totalSlides: number;
  themeColors: string;
  userId: number;
  slides: Slide[];
}

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

  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  async function generateImg() {
    const currentSlide = presentation?.slides?.[activeSlideIndex];
    if (!currentSlide) return;

    try {
      setIsGeneratingImg(true);
      const res = await fetch(`/api/generateImg`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          slideId: currentSlide.id,
          title: currentSlide.title,
          content: currentSlide.content
        })
      });

      if (!res.ok) {
        console.log("error in generating img");
        return;
      }

      const data = await res.json();
      const rawImgUrl = data.image || data.slide?.imgUrl || data.imgUrl;

      if (rawImgUrl && presentation) {
        const newImgUrl = rawImgUrl.includes('?') ? rawImgUrl : `${rawImgUrl}?t=${Date.now()}`;
        setPresentation((prev) => {
          if (!prev) return null;
          const updatedSlides = [...prev.slides];
          updatedSlides[activeSlideIndex] = {
            ...updatedSlides[activeSlideIndex],
            imgUrl: newImgUrl
          };
          return { ...prev, slides: updatedSlides };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingImg(false);
    }
  }

  async function exportToPPTX() {
    if (!presentation || !presentation.slides?.length) return;

    try {
      setIsExporting(true);
      const pptx = new pptxgen();
      pptx.layout = "LAYOUT_16x9";

      presentation.slides.forEach((slide) => {
        const pptxSlide = pptx.addSlide();

        // Slide Title
        pptxSlide.addText(slide.title, {
          x: 0.5,
          y: 0.5,
          w: "90%",
          h: 0.8,
          fontSize: 24,
          bold: true,
          color: "1A3300",
        });

        // Subtitle
        if (slide.subtitle) {
          pptxSlide.addText(slide.subtitle, {
            x: 0.5,
            y: 1.3,
            w: "90%",
            h: 0.5,
            fontSize: 14,
            color: "556B2F",
          });
        }

        // Bullet points
        if (slide.content && slide.content.length > 0) {
          const bullets = slide.content.map((point) => ({
            text: point,
            options: { bullet: true, fontSize: 13, color: "1A3300" },
          }));
          pptxSlide.addText(bullets, {
            x: 0.5,
            y: 2.0,
            w: slide.imgUrl ? "55%" : "90%",
            h: 4.5,
          });
        }

        // Image
        if (slide.imgUrl) {
          pptxSlide.addImage({
            path: slide.imgUrl,
            x: 6.0,
            y: 1.5,
            w: 3.8,
            h: 3.8,
          });
        }
      });

      await pptx.writeFile({
        fileName: `${presentation.title || "presentation"}.pptx`,
      });
    } catch (error) {
      console.error("Failed to export PPTX:", error);
    } finally {
      setIsExporting(false);
    }
  }

  function exportToPDF() {
    window.print();
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

  const currentTheme =
    allThemes.find((t) => t.id === presentation?.themeColors) || allThemes[0];

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
          <h2 className="font-display text-xl font-bold mb-2">No Presentation Found</h2>
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
            <div className="w-full max-w-[1200px] aspect-[16/9] shadow-none">
              <SlideCard
                theme={currentTheme}
                title={slide.title}
                subtitle={slide.subtitle}
                content={slide.content}
                imgUrl={slide.imgUrl}
                isSelected={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE WEB SCREEN CONTAINER (HIDDEN WHEN PRINTING TO PDF) */}
      <div className="screen-wrapper no-print h-screen w-screen max-h-screen overflow-hidden bg-[#fcfaf5] text-[#1a3300] flex flex-col font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] select-none">
        
        {/* FULLSCREEN PRESENTATION MODE OVERLAY */}
        {isFullscreen && currentSlide && (
          <div className="fixed inset-0 z-[100] bg-[#1a3300] text-[#fcfaf5] flex flex-col items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200 select-none">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-50">
              <span className="text-xs font-mono-tag text-[#1a3300] bg-[#ffe95c] px-3.5 py-1.5 rounded-[6px] font-bold">
                Slide {activeSlideIndex + 1} / {presentation.slides.length}
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-[6px] bg-[#fcfaf5] text-[#1a3300] hover:bg-[#ffe95c] transition cursor-pointer"
                title="Exit Slideshow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Page Width & Height 16:9 Presentation Canvas Container */}
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
              <div className="w-full max-w-[1400px] h-full max-h-[85vh] flex items-center justify-center rounded-[12px] overflow-hidden">
                <SlideCard
                  theme={currentTheme}
                  title={currentSlide.title}
                  subtitle={currentSlide.subtitle}
                  content={currentSlide.content}
                  imgUrl={currentSlide.imgUrl}
                  isGeneratingImg={isGeneratingImg}
                  isSelected={false}
                />
              </div>
            </div>

            {/* Fullscreen Navigation Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#fcfaf5] text-[#1a3300] px-5 py-2 rounded-[6px] border border-[#1a3300] shadow-xl z-50">
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSlideIndex === 0}
                className="p-1.5 rounded-[4px] hover:bg-[#ffe95c] disabled:opacity-30 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono-tag font-bold px-2">
                {activeSlideIndex + 1} of {presentation.slides.length}
              </span>
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.min(presentation.slides.length - 1, prev + 1))}
                disabled={activeSlideIndex === presentation.slides.length - 1}
                className="p-1.5 rounded-[4px] hover:bg-[#ffe95c] disabled:opacity-30 transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== UNIVERSAL TOP NAVBAR & STUDIO TOOLBAR ==================== */}
        <header className="h-14 shrink-0 bg-[#fcfaf5] border-b border-[#b6b6b6] px-4 py-2 flex items-center justify-between gap-4 select-none">
          {/* Left: Navigation Links & Presentation Title */}
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-[4px] bg-[#ffe95c] border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center font-display font-bold text-xs group-hover:scale-105 transition-transform">
                lo
              </div>
              <span className="font-bold text-sm tracking-tight text-[#1a3300] hidden sm:inline">
                SlideAI
              </span>
            </Link>

            <div className="h-4 w-[1px] bg-[#b6b6b6]" />

            <div className="flex items-center gap-2.5 text-xs font-medium text-[#1a3300]">
              <Link href="/" className="hover:underline decoration-[#ffe95c] transition-all">Home</Link>
              <Link href="/dashboard" className="hover:underline decoration-[#ffe95c] transition-all">Dashboard</Link>
              <Link href="/create" className="hover:underline decoration-[#ffe95c] transition-all">Create</Link>
            </div>

            <div className="h-4 w-[1px] bg-[#b6b6b6] hidden md:block" />

            <h1 className="text-xs sm:text-sm font-display font-bold text-[#1a3300] line-clamp-1 hidden md:block">
              {presentation.title}
            </h1>
          </div>

          {/* Center: Slide Navigator Controls */}
          <div className="flex items-center gap-1.5 bg-white border border-[#b6b6b6] rounded-[6px] px-2 py-0.5">
            <button
              onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeSlideIndex === 0}
              className="p-1 rounded-[4px] hover:bg-[#ffe95c] text-[#1a3300] disabled:opacity-30 transition cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono-tag font-bold text-[#1a3300] px-2 min-w-[65px] text-center select-none">
              {activeSlideIndex + 1} / {presentation.slides.length}
            </span>
            <button
              onClick={() => setActiveSlideIndex((prev) => Math.min(presentation.slides.length - 1, prev + 1))}
              disabled={activeSlideIndex === presentation.slides.length - 1}
              className="p-1 rounded-[4px] hover:bg-[#ffe95c] text-[#1a3300] disabled:opacity-30 transition cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Export Buttons & Slideshow Present Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportToPPTX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#ffe95c] border border-[#1a3300] disabled:bg-[#f1f1f1] text-[#1a3300] font-semibold text-xs rounded-[6px] transition cursor-pointer"
              title="Export PowerPoint (.pptx)"
            >
              {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">PPTX</span>
            </button>

            <button
              onClick={exportToPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#ffe95c] border border-[#1a3300] text-[#1a3300] font-semibold text-xs rounded-[6px] transition cursor-pointer"
              title="Export PDF (All Slides)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-semibold text-xs rounded-[6px] transition shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Present</span>
            </button>

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
              className="p-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300]/70 hover:text-[#cb5521] hover:border-[#cb5521] transition flex items-center justify-center cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
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
                        isSelected ? "text-[#1a3300] font-bold" : "text-[#1a3300]/50 group-hover:text-[#1a3300]"
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
                        theme={currentTheme}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        content={slide.content}
                        imgUrl={slide.imgUrl}
                        isThumbnail={true}
                        isSelected={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* CENTER MAIN STAGE */}
          <main className="flex-1 h-full bg-[#f1f1f1] p-4 md:p-8 flex flex-col items-center justify-center overflow-auto relative">
            <div className="w-full max-w-4xl shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] rounded-[12px] overflow-hidden border border-[#b6b6b6] transition-all duration-200 relative group bg-[#fcfaf5] shrink-0 my-auto">
              
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
                  theme={currentTheme}
                  title={currentSlide.title}
                  subtitle={currentSlide.subtitle}
                  content={currentSlide.content}
                  imgUrl={currentSlide.imgUrl}
                  isGeneratingImg={isGeneratingImg}
                  isSelected={false}
                />
              )}
            </div>
          </main>

        </div>
      </div>
    </>
  );
}

export default function Slideshow() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#fcfaf5] flex items-center justify-center text-[#1a3300] text-sm font-semibold gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#1a3300]" /> Loading Studio...
      </div>
    }>
      <SlideshowContent />
    </Suspense>
  );
}

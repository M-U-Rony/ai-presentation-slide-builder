"use client";

import SlideCard from "@/components/slidecard";
import { allThemes } from "@/lib/theme";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { Slide } from "@/lib/types";

interface PresentationData {
  id: number;
  title: string;
  totalSlides: number;
  themeColors: string;
  userId: number;
  slides: Slide[];
}

export default function Slideshow() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

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
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#22C55E]" />
        <p className="text-sm font-semibold text-gray-600">Loading your presentation...</p>
      </div>
    );
  }

  if (!presentation || !presentation.slides?.length) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-200 max-w-md w-full">
          <PresentationIcon className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Presentation Found</h2>
          <p className="text-sm text-gray-600 mb-6">
            Could not find slides for this presentation ID.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] bg-[#22C55E] hover:bg-[#1ea750] text-white font-semibold rounded-[20px] transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Create New Presentation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-gray-900 flex flex-col font-sans selection:bg-[#22C55E]/20">
      {/* ==================== GOOGLE SLIDES / POWERPOINT TOP TOOLBAR ==================== */}
      <header className="bg-white border-b border-gray-300 px-4 py-2.5 flex items-center justify-between gap-4 shadow-xs select-none">
        {/* Left: Branding & Presentation Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="p-2 rounded-[10px] hover:bg-gray-100 text-gray-600 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Back to Create"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Workspace</span>
          </Link>
          <div className="h-5 w-[1px] bg-gray-300" />
          <div className="flex items-center gap-2">
            <PresentationIcon className="w-5 h-5 text-[#22C55E]" />
            <h1 className="text-base font-bold text-gray-900 line-clamp-1">{presentation.title}</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 capitalize hidden md:inline">
              {presentation.themeColors} Theme
            </span>
          </div>
        </div>

        {/* Center: Slide Counter & Navigator Controls */}
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-xl px-2 py-1">
          <button
            onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-30 transition"
            title="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-gray-800 px-2 min-w-[70px] text-center select-none">
            {activeSlideIndex + 1} / {presentation.slides.length}
          </span>
          <button
            onClick={() => setActiveSlideIndex((prev) => Math.min(presentation.slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === presentation.slides.length - 1}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-30 transition"
            title="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Present Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#22C55E] hover:bg-[#1ea750] text-white font-semibold text-xs md:text-sm rounded-[16px] transition shadow-sm shadow-[#22C55E]/20"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Slideshow</span>
          </button>
        </div>
      </header>

      {/* ==================== WORKSPACE: LEFT FILMSTRIP + CENTER STAGE ==================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT FILMSTRIP (SLIDE NAVIGATION PANEL) */}
        <aside className="w-64 md:w-80 border-r border-gray-300 bg-gray-100 p-3 md:p-4 flex flex-col gap-3 overflow-y-auto shrink-0 select-none">
          <div className="flex items-center justify-between px-1 pb-2 border-b border-gray-300 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#22C55E]" />
              Filmstrip
            </span>
            <span>{presentation.slides.length} Slides</span>
          </div>

          <div className="flex flex-col gap-3">
            {presentation.slides.map((slide, index) => {
              const isSelected = index === activeSlideIndex;
              return (
                <div
                  key={slide.id || index}
                  onClick={() => setActiveSlideIndex(index)}
                  className="flex items-start gap-2.5 cursor-pointer group"
                >
                  {/* Slide Number (PowerPoint / Google Slides Filmstrip Index) */}
                  <span
                    className={`text-xs font-bold mt-2 min-w-[18px] text-right ${
                      isSelected ? "text-[#22C55E]" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Thumbnail Card */}
                  <div
                    className={`flex-1 rounded-[16px] border transition-all duration-200 overflow-hidden bg-white p-3 shadow-xs ${
                      isSelected
                        ? "border-[#22C55E] ring-2 ring-[#22C55E]/40 shadow-md scale-[1.01]"
                        : "border-gray-300 hover:border-gray-400 hover:shadow-sm opacity-90 hover:opacity-100"
                    }`}
                  >
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#22C55E] transition-colors">
                      {slide.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER MAIN STAGE (16:9 PRESENTATION CANVAS) */}
        <main className="flex-1 bg-[#D1D5DB] p-4 md:p-10 flex flex-col items-center justify-center overflow-auto relative">
          <div className="w-full max-w-4xl shadow-2xl rounded-[20px] overflow-hidden transition-all duration-300 relative group">
            {/* 3-Dot Options Button in Top-Left Corner */}
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="p-2 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200/80 shadow-md transition flex items-center justify-center cursor-pointer"
                title="Slide Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute top-11 left-0 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      generateImg();
                    }}
                    disabled={isGeneratingImg}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#22C55E] rounded-lg transition w-full text-left cursor-pointer disabled:opacity-50"
                  >
                    <ImageIcon className="w-4 h-4 text-[#22C55E]" />
                    <span>Add Image</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      generateImg();
                    }}
                    disabled={isGeneratingImg}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#3B82F6] rounded-lg transition w-full text-left cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className="w-4 h-4 text-[#3B82F6]" />
                    <span>Change Image</span>
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

          {/* Bottom Canvas Controls */}
          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-md border border-gray-300 px-4 py-1.5 rounded-full shadow-xs">
            <span>Canvas 16:9</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>Slide {activeSlideIndex + 1} of {presentation.slides.length}</span>
          </div>
        </main>
      </div>
    </div>
  );
}




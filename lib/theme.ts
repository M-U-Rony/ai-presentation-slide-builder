export interface ThemeColors {
  id: string;
  background: string;       // Outer & slide stage background
  cardBg: string;           // Inner card container background
  border: string;           // Border color & opacity
  primaryText: string;      // Main heading text color
  secondaryText: string;    // Subtitle / body text color
  accentText: string;       // Accent / highlight color (labels, slide numbers)
  accentBg: string;         // Active button / active card background
  activeRing: string;       // Highlight border ring for selected slide
  badge: string;            // Tag / badge pill style
}

const light: ThemeColors = {
  id: "light",
  background: "bg-slate-100 text-slate-900",
  cardBg: "bg-white",
  border: "border-slate-300",
  primaryText: "text-slate-900",
  secondaryText: "text-slate-600",
  accentText: "text-indigo-600",
  accentBg: "bg-indigo-600 text-white hover:bg-indigo-700",
  activeRing: "ring-2 ring-indigo-500 border-indigo-500",
  badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const dark: ThemeColors = {
  id: "dark",
  background: "bg-zinc-950 text-zinc-100",
  cardBg: "bg-zinc-900/70",
  border: "border-emerald-500/60",
  primaryText: "text-zinc-100",
  secondaryText: "text-zinc-400",
  accentText: "text-emerald-400",
  accentBg: "bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50",
  activeRing: "ring-1 ring-emerald-400 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]",
  badge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
};

const professional: ThemeColors = {
  id: "professional",
  background: "bg-slate-950 text-slate-100",
  cardBg: "bg-slate-900",
  border: "border-blue-500/40",
  primaryText: "text-slate-50",
  secondaryText: "text-slate-400",
  accentText: "text-amber-400",
  accentBg: "bg-blue-600 text-white hover:bg-blue-700",
  activeRing: "ring-2 ring-blue-500 border-blue-400",
  badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const lucrative: ThemeColors = {
  id: "lucrative",
  background: "bg-neutral-950 text-neutral-100",
  cardBg: "bg-neutral-900/90",
  border: "border-yellow-500/50",
  primaryText: "text-yellow-100",
  secondaryText: "text-neutral-400",
  accentText: "text-yellow-400",
  accentBg: "bg-yellow-500 text-neutral-950 font-semibold hover:bg-yellow-400",
  activeRing: "ring-2 ring-yellow-400 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]",
  badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
};

 const modern: ThemeColors = {
  id: "modern",
  background: "bg-gray-950 text-gray-100",
  cardBg: "bg-gray-900/80 backdrop-blur-md",
  border: "border-cyan-500/50",
  primaryText: "text-white",
  secondaryText: "text-gray-300",
  accentText: "text-cyan-400",
  accentBg: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90",
  activeRing: "ring-2 ring-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
  badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
};

const minimal: ThemeColors = {
  id: "minimal",
  background: "bg-neutral-50 text-neutral-900",
  cardBg: "bg-white",
  border: "border-neutral-200",
  primaryText: "text-neutral-900",
  secondaryText: "text-neutral-500",
  accentText: "text-neutral-900 font-bold",
  accentBg: "bg-neutral-900 text-white hover:bg-neutral-800",
  activeRing: "ring-2 ring-neutral-900 border-neutral-900",
  badge: "bg-neutral-200 text-neutral-800 border-neutral-300",
};


export const allThemes = [light,dark,minimal,modern,lucrative,professional];
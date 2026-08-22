export interface ThemeColors {
  id: string;
  name: string;
  background: string;       // Outer & slide stage background
  cardBg: string;           // Inner card container background
  border: string;           // Border color & opacity
  primaryText: string;      // Main heading text color
  secondaryText: string;    // Subtitle / body text color
  accentText: string;       // Accent / highlight color (labels, slide numbers)
  accentBg: string;         // Active button / active card background
  activeRing: string;       // Highlight border ring for selected slide
  badge: string;            // Tag / badge pill style
  swatch: string;           // Preview dot/swatch color
  bgImage?: string;         // Background wallpaper image URL
  overlayType?: "navy-chevron" | "hexagon" | "geometric-green" | "framed-editorial" | "minimal-aura" | "memphis-blue" | "corporate-capsule" | "cyan-steps" | "minimalist-orange";
}

export const minimalistOrange: ThemeColors = {
  id: "minimalist-orange",
  name: "Minimalist Orange",
  background: "bg-white text-[#111827]",
  cardBg: "bg-transparent",
  border: "border-orange-200",
  primaryText: "text-[#111827] font-black uppercase tracking-tight",
  secondaryText: "text-[#4b5563]",
  accentText: "text-[#f59e42]",
  accentBg: "bg-[#f59e42] text-white hover:bg-[#ea580c]",
  activeRing: "border-2 border-[#f59e42] ring-4 ring-[#f59e42]/30 shadow-xl",
  badge: "bg-[#ffedd5] text-[#c2410c] border border-[#f59e42]/30 font-bold",
  swatch: "bg-gradient-to-t from-[#f59e42] via-[#ffedd5] to-[#ffffff] border border-orange-300",
  overlayType: "minimalist-orange",
};

export const cyanSteps: ThemeColors = {
  id: "cyan-steps",
  name: "Cyan Flow",
  background: "bg-white text-[#111827]",
  cardBg: "bg-transparent",
  border: "border-cyan-100",
  primaryText: "text-[#111827] font-black",
  secondaryText: "text-[#0284c7]",
  accentText: "text-[#0055ff]",
  accentBg: "bg-[#0055ff] text-white hover:bg-[#0044cc]",
  activeRing: "border-2 border-[#0055ff] ring-4 ring-[#0055ff]/30 shadow-xl",
  badge: "bg-[#e0f2fe] text-[#0055ff] border border-[#0055ff]/30 font-bold",
  swatch: "bg-gradient-to-r from-[#00d4ff] to-[#004de6] border border-cyan-300",
  overlayType: "cyan-steps",
};

export const corporateCapsule: ThemeColors = {
  id: "corporate-capsule",
  name: "Corporate Capsule",
  background: "bg-white text-[#071938]",
  cardBg: "bg-transparent",
  border: "border-slate-200",
  primaryText: "text-[#071938] font-extrabold",
  secondaryText: "text-[#475569]",
  accentText: "text-[#2563eb]",
  accentBg: "bg-[#071938] text-white hover:bg-[#1e3a8a]",
  activeRing: "border-2 border-[#2563eb] ring-4 ring-[#2563eb]/30 shadow-xl",
  badge: "bg-[#dbeafe] text-[#1d4ed8] border border-[#2563eb]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#ffffff] via-[#3b82f6] to-[#071938] border border-slate-300",
  overlayType: "corporate-capsule",
};

export const memphisBlue: ThemeColors = {
  id: "memphis-blue",
  name: "Memphis Corporate",
  background: "bg-[#f8fbff] text-[#07153a]",
  cardBg: "bg-transparent",
  border: "border-sky-200",
  primaryText: "text-[#07153a] font-extrabold",
  secondaryText: "text-[#334155]",
  accentText: "text-[#0284c7]",
  accentBg: "bg-[#07153a] text-white hover:bg-[#0f2766]",
  activeRing: "border-2 border-[#0284c7] ring-4 ring-[#0284c7]/30 shadow-xl",
  badge: "bg-[#e0f2fe] text-[#0369a1] border border-[#0284c7]/30 font-bold",
  swatch: "bg-gradient-to-tr from-[#7dd3fc] via-[#818cf8] to-[#07153a] border border-sky-300",
  overlayType: "memphis-blue",
};

export const minimalAura: ThemeColors = {
  id: "minimal-aura",
  name: "Minimal Aura",
  background: "bg-[#fcfaf7] text-[#0f0f10]",
  cardBg: "bg-transparent",
  border: "border-stone-200",
  primaryText: "text-[#0f0f10] tracking-tight font-extrabold",
  secondaryText: "text-[#4b5563]",
  accentText: "text-[#0284c7]",
  accentBg: "bg-[#0f0f10] text-white hover:bg-[#27272a]",
  activeRing: "border-2 border-[#0284c7] ring-4 ring-[#0284c7]/30 shadow-xl",
  badge: "bg-[#e0f2fe] text-[#0369a1] border border-[#0284c7]/30 font-bold",
  swatch: "bg-gradient-to-tr from-[#bae6fd] via-[#fcfaf7] to-[#38bdf8] border border-stone-300",
  overlayType: "minimal-aura",
};

export const framedEditorial: ThemeColors = {
  id: "framed-editorial",
  name: "Framed Editorial",
  background: "bg-[#121316] text-[#fafaf9]",
  cardBg: "bg-transparent",
  border: "border-[#ede8dc]/25",
  primaryText: "text-[#fafaf9] tracking-wider uppercase",
  secondaryText: "text-[#d6d3d1]",
  accentText: "text-[#ede8dc]",
  accentBg: "bg-[#ede8dc] text-[#121316] hover:bg-[#ede8dc]/90",
  activeRing: "border-2 border-[#ede8dc] ring-4 ring-[#ede8dc]/30 shadow-xl",
  badge: "bg-[#ede8dc]/15 text-[#ede8dc] border border-[#ede8dc]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#ede8dc] via-[#27272a] to-[#121316] border border-[#ede8dc]/40",
  overlayType: "framed-editorial",
};

export const hexagonMinimal: ThemeColors = {
  id: "hexagon-minimal",
  name: "Hexagon Minimal",
  background: "bg-[#faf8f5] text-[#0f172a]",
  cardBg: "bg-transparent",
  border: "border-stone-200",
  primaryText: "text-[#0f172a]",
  secondaryText: "text-[#475569]",
  accentText: "text-[#ea580c]",
  accentBg: "bg-[#0f172a] text-white hover:bg-[#1e293b]",
  activeRing: "border-2 border-[#ea580c] ring-4 ring-[#ea580c]/30 shadow-xl",
  badge: "bg-[#fed7aa] text-[#9a3412] border border-[#ea580c]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#fed7aa] via-[#93c5fd] to-[#0f172a] border border-stone-300",
  overlayType: "hexagon",
};

export const navyBlueprint: ThemeColors = {
  id: "navy-blueprint",
  name: "Navy Blueprint",
  background: "bg-[#0b3153] text-[#f8fafc]",
  cardBg: "bg-transparent",
  border: "border-[#0284c7]/40",
  primaryText: "text-[#38bdf8]",
  secondaryText: "text-[#cbd5e1]",
  accentText: "text-[#38bdf8]",
  accentBg: "bg-[#0284c7] text-white hover:bg-[#0369a1]",
  activeRing: "border-2 border-[#38bdf8] ring-4 ring-[#38bdf8]/30 shadow-xl",
  badge: "bg-[#0284c7]/20 text-[#38bdf8] border border-[#38bdf8]/40 font-bold",
  swatch: "bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0b3153] border border-[#38bdf8]/50",
  overlayType: "navy-chevron",
};

export const geometricGreen: ThemeColors = {
  id: "geometric-green",
  name: "Geometric Green",
  background: "bg-white text-slate-800",
  cardBg: "bg-transparent",
  border: "border-slate-200",
  primaryText: "text-[#70ad47]",
  secondaryText: "text-[#595959]",
  accentText: "text-[#70ad47]",
  accentBg: "bg-[#70ad47] text-white hover:bg-[#5c940d]",
  activeRing: "border-2 border-[#70ad47] ring-4 ring-[#70ad47]/30 shadow-xl",
  badge: "bg-[#70ad47]/15 text-[#558b2f] border border-[#70ad47]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#84cc16] via-[#65a30d] to-[#4d7c0f] border border-[#70ad47]/30",
  overlayType: "geometric-green",
};

// Aliases for backwards compatibility with database rows
const cream: ThemeColors = { ...minimalistOrange, id: "cream" };
const mint: ThemeColors = { ...geometricGreen, id: "mint" };
const teal: ThemeColors = { ...navyBlueprint, id: "teal" };
const blush: ThemeColors = { ...hexagonMinimal, id: "blush" };
const terracotta: ThemeColors = { ...minimalistOrange, id: "terracotta" };
const forest: ThemeColors = { ...framedEditorial, id: "forest" };
const modern: ThemeColors = { ...minimalistOrange, id: "modern" };
const dark: ThemeColors = { ...framedEditorial, id: "dark" };
const professional: ThemeColors = { ...corporateCapsule, id: "professional" };
const light: ThemeColors = { ...minimalistOrange, id: "light" };
const lucrative: ThemeColors = { ...minimalAura, id: "lucrative" };
const minimal: ThemeColors = { ...minimalistOrange, id: "minimal" };

export const allThemes = [
  minimalistOrange,
  cyanSteps,
  corporateCapsule,
  memphisBlue,
  minimalAura,
  framedEditorial,
  hexagonMinimal,
  navyBlueprint,
  geometricGreen,
  cream,
  mint,
  teal,
  blush,
  terracotta,
  forest,
  modern,
  dark,
  professional,
  light,
  lucrative,
  minimal,
];

export const displayThemes = [
  minimalistOrange,
  cyanSteps,
  corporateCapsule,
  memphisBlue,
  minimalAura,
  framedEditorial,
  hexagonMinimal,
  navyBlueprint,
  geometricGreen,
];
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
  overlayType?:
    | "sketchbook-grid"
    | "highlighter-wash"
    | "botanical-corner"
    | "terracotta-arch"
    | "blueprint-grid"
    | "blush-dot"
    | "editorial-frame"
    | "navy-chevron";
  pptxColors?: {
    bg: string;
    title: string;
    subtitle: string;
    bullet: string;
    accent: string;
  };
}

// 1. Cream Sketchbook — The signature SayBriefly brand aesthetic
export const creamSketchbook: ThemeColors = {
  id: "cream-sketchbook",
  name: "Cream Sketchbook",
  background: "bg-[#fcfaf5] text-[#1a3300]",
  cardBg: "bg-transparent",
  border: "border-[#1a3300]/20",
  primaryText: "text-[#1a3300] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#1a3300]/75 font-normal",
  accentText: "text-[#cb5521]",
  accentBg: "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90",
  activeRing: "border-2 border-[#1a3300] ring-4 ring-[#ffe95c]/60 shadow-xl",
  badge: "bg-[#ffe95c] text-[#1a3300] border border-[#1a3300]/20 font-bold",
  swatch: "bg-gradient-to-br from-[#ffe95c] via-[#fcfaf5] to-[#1a3300] border border-[#1a3300]/30",
  overlayType: "sketchbook-grid",
  pptxColors: {
    bg: "FCFAF5",
    title: "1A3300",
    subtitle: "3F4E34",
    bullet: "2A4015",
    accent: "CB5521"
  }
};

// 2. Forest Highlighter — Bold dark forest green with bright highlighter yellow
export const forestHighlighter: ThemeColors = {
  id: "forest-highlighter",
  name: "Forest Ink",
  background: "bg-[#1a3300] text-[#fcfaf5]",
  cardBg: "bg-transparent",
  border: "border-[#ffe95c]/25",
  primaryText: "text-[#ffe95c] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#fcfaf5]/85 font-normal",
  accentText: "text-[#ffe95c]",
  accentBg: "bg-[#ffe95c] text-[#1a3300] hover:bg-[#ffe95c]/90 font-bold",
  activeRing: "border-2 border-[#ffe95c] ring-4 ring-[#ffe95c]/40 shadow-xl",
  badge: "bg-[#ffe95c]/20 text-[#ffe95c] border border-[#ffe95c]/40 font-bold",
  swatch: "bg-gradient-to-br from-[#1a3300] via-[#2d5206] to-[#ffe95c] border border-[#ffe95c]/40",
  overlayType: "highlighter-wash",
  pptxColors: {
    bg: "1A3300",
    title: "FFE95C",
    subtitle: "E2E8D5",
    bullet: "FCFAF5",
    accent: "FFE95C"
  }
};

// 3. Mint Botanical — Fresh organic mint with deep emerald typography
export const mintBotanical: ThemeColors = {
  id: "mint-botanical",
  name: "Mint Botanical",
  background: "bg-[#f4fbf1] text-[#0d3319]",
  cardBg: "bg-transparent",
  border: "border-[#d5f5c2]",
  primaryText: "text-[#0d3319] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#234d30] font-normal",
  accentText: "text-[#15803d]",
  accentBg: "bg-[#0d3319] text-[#f4fbf1] hover:bg-[#15532b]",
  activeRing: "border-2 border-[#15803d] ring-4 ring-[#d5f5c2] shadow-xl",
  badge: "bg-[#d5f5c2] text-[#0d3319] border border-[#15803d]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#d5f5c2] via-[#a7f3d0] to-[#0d3319] border border-emerald-300",
  overlayType: "botanical-corner",
  pptxColors: {
    bg: "F4FBF1",
    title: "0D3319",
    subtitle: "234D30",
    bullet: "15803D",
    accent: "15803D"
  }
};

// 4. Terracotta Studio — Warm earthy clay with crisp contrast
export const terracottaStudio: ThemeColors = {
  id: "terracotta-studio",
  name: "Terracotta Studio",
  background: "bg-[#fff9f5] text-[#2c1307]",
  cardBg: "bg-transparent",
  border: "border-[#cb5521]/20",
  primaryText: "text-[#2c1307] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#61361e] font-normal",
  accentText: "text-[#cb5521]",
  accentBg: "bg-[#cb5521] text-white hover:bg-[#b04617]",
  activeRing: "border-2 border-[#cb5521] ring-4 ring-[#cb5521]/30 shadow-xl",
  badge: "bg-[#ffedd5] text-[#c2410c] border border-[#cb5521]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#ffedd5] via-[#ea580c] to-[#2c1307] border border-orange-300",
  overlayType: "terracotta-arch",
  pptxColors: {
    bg: "FFF9F5",
    title: "2C1307",
    subtitle: "61361E",
    bullet: "4A2612",
    accent: "CB5521"
  }
};

// 5. Teal Blueprint — Modern architectural cyan and sticky-note teal
export const tealBlueprint: ThemeColors = {
  id: "teal-blueprint",
  name: "Teal Blueprint",
  background: "bg-[#f0fafb] text-[#082f35]",
  cardBg: "bg-transparent",
  border: "border-[#a8e5e5]",
  primaryText: "text-[#082f35] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#155e6b] font-normal",
  accentText: "text-[#0e7490]",
  accentBg: "bg-[#082f35] text-[#f0fafb] hover:bg-[#0e4b55]",
  activeRing: "border-2 border-[#0e7490] ring-4 ring-[#a8e5e5] shadow-xl",
  badge: "bg-[#a8e5e5] text-[#082f35] border border-[#0e7490]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#a8e5e5] via-[#06b6d4] to-[#082f35] border border-cyan-300",
  overlayType: "blueprint-grid",
  pptxColors: {
    bg: "F0FAFB",
    title: "082F35",
    subtitle: "155E6B",
    bullet: "0E7490",
    accent: "0891B2"
  }
};

// 6. Blush Note — Pastel lavender and violet sketchbook note
export const blushNote: ThemeColors = {
  id: "blush-note",
  name: "Blush Note",
  background: "bg-[#fcf8fd] text-[#2e1040]",
  cardBg: "bg-transparent",
  border: "border-[#f6d0ff]",
  primaryText: "text-[#2e1040] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#5b2b7a] font-normal",
  accentText: "text-[#9333ea]",
  accentBg: "bg-[#2e1040] text-[#fcf8fd] hover:bg-[#4a1c66]",
  activeRing: "border-2 border-[#9333ea] ring-4 ring-[#f6d0ff] shadow-xl",
  badge: "bg-[#f6d0ff] text-[#2e1040] border border-[#9333ea]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#f6d0ff] via-[#c084fc] to-[#2e1040] border border-purple-300",
  overlayType: "blush-dot",
  pptxColors: {
    bg: "FCF8FD",
    title: "2E1040",
    subtitle: "5B2B7A",
    bullet: "43185E",
    accent: "9333EA"
  }
};

// 7. Obsidian Editorial — High-contrast luxury editorial dark palette
export const obsidianEditorial: ThemeColors = {
  id: "obsidian-editorial",
  name: "Obsidian Editorial",
  background: "bg-[#121417] text-[#f5f0e6]",
  cardBg: "bg-transparent",
  border: "border-[#f5f0e6]/20",
  primaryText: "text-[#f5f0e6] font-display font-black tracking-tight",
  secondaryText: "text-[#c5beaf] font-normal",
  accentText: "text-[#ffe95c]",
  accentBg: "bg-[#f5f0e6] text-[#121417] hover:bg-white font-bold",
  activeRing: "border-2 border-[#f5f0e6] ring-4 ring-[#f5f0e6]/30 shadow-xl",
  badge: "bg-[#f5f0e6]/15 text-[#f5f0e6] border border-[#f5f0e6]/30 font-bold",
  swatch: "bg-gradient-to-br from-[#f5f0e6] via-[#374151] to-[#121417] border border-[#f5f0e6]/40",
  overlayType: "editorial-frame",
  pptxColors: {
    bg: "121417",
    title: "F5F0E6",
    subtitle: "C5BEAF",
    bullet: "E8E2D5",
    accent: "FFE95C"
  }
};

// 8. Navy Blueprint — Deep midnight indigo with crisp sky cyan
export const navyBlueprint: ThemeColors = {
  id: "navy-blueprint",
  name: "Navy Blueprint",
  background: "bg-[#0b2440] text-[#f8fafc]",
  cardBg: "bg-transparent",
  border: "border-[#38bdf8]/25",
  primaryText: "text-[#38bdf8] font-display font-extrabold tracking-tight",
  secondaryText: "text-[#cbd5e1] font-normal",
  accentText: "text-[#38bdf8]",
  accentBg: "bg-[#0284c7] text-white hover:bg-[#0369a1]",
  activeRing: "border-2 border-[#38bdf8] ring-4 ring-[#38bdf8]/30 shadow-xl",
  badge: "bg-[#0284c7]/25 text-[#38bdf8] border border-[#38bdf8]/40 font-bold",
  swatch: "bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0b2440] border border-[#38bdf8]/50",
  overlayType: "navy-chevron",
  pptxColors: {
    bg: "0B2440",
    title: "38BDF8",
    subtitle: "CBD5E1",
    bullet: "E2E8F0",
    accent: "38BDF8"
  }
};

// Backwards compatibility aliases for existing presentation database records
const cream: ThemeColors = { ...creamSketchbook, id: "cream" };
const mint: ThemeColors = { ...mintBotanical, id: "mint" };
const teal: ThemeColors = { ...tealBlueprint, id: "teal" };
const blush: ThemeColors = { ...blushNote, id: "blush" };
const terracotta: ThemeColors = { ...terracottaStudio, id: "terracotta" };
const forest: ThemeColors = { ...forestHighlighter, id: "forest" };
const dark: ThemeColors = { ...obsidianEditorial, id: "dark" };
const modern: ThemeColors = { ...creamSketchbook, id: "modern" };
const light: ThemeColors = { ...creamSketchbook, id: "light" };
const minimal: ThemeColors = { ...creamSketchbook, id: "minimal" };
const professional: ThemeColors = { ...navyBlueprint, id: "professional" };
const lucrative: ThemeColors = { ...tealBlueprint, id: "lucrative" };
const minimalistOrange: ThemeColors = { ...terracottaStudio, id: "minimalist-orange" };
const cyanSteps: ThemeColors = { ...tealBlueprint, id: "cyan-steps" };
const corporateCapsule: ThemeColors = { ...navyBlueprint, id: "corporate-capsule" };
const memphisBlue: ThemeColors = { ...navyBlueprint, id: "memphis-blue" };
const minimalAura: ThemeColors = { ...creamSketchbook, id: "minimal-aura" };
const framedEditorial: ThemeColors = { ...obsidianEditorial, id: "framed-editorial" };
const hexagonMinimal: ThemeColors = { ...creamSketchbook, id: "hexagon-minimal" };
const geometricGreen: ThemeColors = { ...mintBotanical, id: "geometric-green" };

export const displayThemes: ThemeColors[] = [
  creamSketchbook,
  forestHighlighter,
  mintBotanical,
  terracottaStudio,
  tealBlueprint,
  blushNote,
  obsidianEditorial,
  navyBlueprint,
];

export const allThemes: ThemeColors[] = [
  ...displayThemes,
  cream,
  mint,
  teal,
  blush,
  terracotta,
  forest,
  dark,
  modern,
  light,
  minimal,
  professional,
  lucrative,
  minimalistOrange,
  cyanSteps,
  corporateCapsule,
  memphisBlue,
  minimalAura,
  framedEditorial,
  hexagonMinimal,
  geometricGreen,
];
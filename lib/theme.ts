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
}

const cream: ThemeColors = {
  id: "cream",
  name: "Cream Sketchbook",
  background: "bg-[#fcfaf5] text-[#1a3300]",
  cardBg: "bg-[#fcfaf5]",
  border: "border-[#1a3300]",
  primaryText: "text-[#1a3300]",
  secondaryText: "text-[#1a3300]/80",
  accentText: "text-[#1a3300]",
  accentBg: "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90",
  activeRing: "ring-2 ring-[#1a3300] border-[#1a3300] shadow-[rgba(255,233,92,0.4)_0px_0px_16px]",
  badge: "bg-[#ffe95c] text-[#1a3300] border border-[#1a3300]/20 font-bold",
  swatch: "bg-[#fcfaf5] border border-[#1a3300]",
};

const mint: ThemeColors = {
  id: "mint",
  name: "Sticky Mint",
  background: "bg-[#d5f5c2] text-[#1a3300]",
  cardBg: "bg-[#d5f5c2]",
  border: "border-[#1a3300]",
  primaryText: "text-[#1a3300]",
  secondaryText: "text-[#1a3300]/80",
  accentText: "text-[#1a3300]",
  accentBg: "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90",
  activeRing: "ring-2 ring-[#1a3300] border-[#1a3300] shadow-md",
  badge: "bg-[#fcfaf5] text-[#1a3300] border border-[#1a3300]/20 font-bold",
  swatch: "bg-[#d5f5c2] border border-[#1a3300]",
};

const teal: ThemeColors = {
  id: "teal",
  name: "Sticky Teal",
  background: "bg-[#a8e5e5] text-[#1a3300]",
  cardBg: "bg-[#a8e5e5]",
  border: "border-[#1a3300]",
  primaryText: "text-[#1a3300]",
  secondaryText: "text-[#1a3300]/80",
  accentText: "text-[#1a3300]",
  accentBg: "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90",
  activeRing: "ring-2 ring-[#1a3300] border-[#1a3300] shadow-md",
  badge: "bg-[#ffe95c] text-[#1a3300] border border-[#1a3300]/20 font-bold",
  swatch: "bg-[#a8e5e5] border border-[#1a3300]",
};

const blush: ThemeColors = {
  id: "blush",
  name: "Sticky Blush",
  background: "bg-[#f6d0ff] text-[#1a3300]",
  cardBg: "bg-[#f6d0ff]",
  border: "border-[#1a3300]",
  primaryText: "text-[#1a3300]",
  secondaryText: "text-[#1a3300]/80",
  accentText: "text-[#1a3300]",
  accentBg: "bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90",
  activeRing: "ring-2 ring-[#1a3300] border-[#1a3300] shadow-md",
  badge: "bg-[#fcfaf5] text-[#1a3300] border border-[#1a3300]/20 font-bold",
  swatch: "bg-[#f6d0ff] border border-[#1a3300]",
};

const terracotta: ThemeColors = {
  id: "terracotta",
  name: "Terracotta Accent",
  background: "bg-[#fcfaf5] text-[#1a3300]",
  cardBg: "bg-[#fcfaf5]",
  border: "border-[#cb5521]",
  primaryText: "text-[#1a3300]",
  secondaryText: "text-[#1a3300]/80",
  accentText: "text-[#cb5521]",
  accentBg: "bg-[#cb5521] text-white hover:bg-[#cb5521]/90",
  activeRing: "ring-2 ring-[#cb5521] border-[#cb5521] shadow-md",
  badge: "bg-[#cb5521]/15 text-[#cb5521] border border-[#cb5521]/30 font-bold",
  swatch: "bg-[#cb5521]",
};

const forest: ThemeColors = {
  id: "forest",
  name: "Forest Ink Solid",
  background: "bg-[#1a3300] text-[#fcfaf5]",
  cardBg: "bg-[#1a3300]",
  border: "border-[#ffe95c]/40",
  primaryText: "text-[#fcfaf5]",
  secondaryText: "text-[#fcfaf5]/80",
  accentText: "text-[#ffe95c]",
  accentBg: "bg-[#ffe95c] text-[#1a3300] font-bold hover:bg-[#ffe95c]/90",
  activeRing: "ring-2 ring-[#ffe95c] border-[#ffe95c] shadow-[rgba(255,233,92,0.3)_0px_0px_20px]",
  badge: "bg-[#ffe95c] text-[#1a3300] font-bold",
  swatch: "bg-[#1a3300] border border-[#ffe95c]",
};

// Aliases for backwards compatibility with existing database rows
const modern: ThemeColors = { ...cream, id: "modern" };
const dark: ThemeColors = { ...forest, id: "dark" };
const professional: ThemeColors = { ...terracotta, id: "professional" };
const light: ThemeColors = { ...cream, id: "light" };
const lucrative: ThemeColors = { ...blush, id: "lucrative" };
const minimal: ThemeColors = { ...mint, id: "minimal" };

export const allThemes = [cream, mint, teal, blush, terracotta, forest, modern, dark, professional, light, lucrative, minimal];
export const displayThemes = [cream, mint, teal, blush, terracotta, forest];
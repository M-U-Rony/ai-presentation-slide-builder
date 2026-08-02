# Project Memory & Documentation

## Overview
AI Presentation Slide Builder application (similar to Gamma.ai).

## Recent Changes & Decisions

### Prisma 7 Upgrade & Configuration Fixes
- **Issue**: TypeScript error in `prisma.config.ts` when using `directUrl` key, and migration error when Prisma CLI attempted to run migrations against Supabase transaction pooler (port 6543).
- **Cause**: In Prisma 7, `prisma.config.ts` handles CLI database connections using `datasource.url`. `directUrl` as a separate property was deprecated in favor of passing the direct URL into `datasource.url` in `prisma.config.ts`. Managed databases (Supabase, Neon) require a direct connection (Port 5432) for CLI schema migrations (`prisma migrate dev`) because PgBouncer transaction pooling (Port 6543) blocks advisory locks and migration DDL statements.
- **Fix**: Configured `prisma.config.ts` to use `process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"]` for `datasource.url`.

### Landing Page Implementation (Design System: DESIGN.md)
- **Component**: Built responsive landing page in [components/landing.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/components/landing.tsx) and rendered in [app/page.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/app/page.tsx).
- **Design System Integration**:
  - **Colors**: Primary Green (`#22C55E`), Secondary Blue (`#3B82F6`), Tertiary Purple (`#A855F7`), Surface (`#F3F4F6`).
  - **Radius**: Large 20px rounded corners (`rounded-[20px]`) for prompt builder box, feature cards, and preview cards.
  - **Touch Targets**: Minimum 44px height (`min-h-[44px]`) for all interactive buttons and selectors.
- **Interactive Features**:
  - Live prompt generator input box with instant slide count (3, 5, 8, 10 cards) & theme picker.
  - Live AI slide output switcher demonstrating generated content across themes.
  - 3-step workflow, feature grid, call-to-action banner, and footer.
### Create Page Navbar & DESIGN.md Styling Update (/create)
- **Files Updated**:
  - [app/create/page.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/app/create/page.tsx): Added a sticky header Navigation bar with brand logo, workspace title, and back-to-home action button.
  - [components/promtpage.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/components/promtpage.tsx): Styled all borders and buttons to strictly adhere to [DESIGN.md](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/DESIGN.md):
    - **Primary Green (`#22C55E`)**: Primary action submit button (`min-h-[44px]`, `rounded-[20px]`).
    - **Secondary Blue (`#3B82F6`)**: Slide count selector pills (`min-h-[44px]`, `rounded-[20px]`).
    - **Tertiary Purple (`#A855F7`)**: Sparkle AI badge accents.
    - **Borders & Touch Targets**: Soft `border-gray-200` with 20px radius and minimum 44px height across all interactive elements.
### Theme Selection Border UX Enhancement
- **Files Updated**:
  - [components/slidecard.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/components/slidecard.tsx): Added `isSelected` and `onClick` props. Renders a prominent `#22C55E` green active border ring (`ring-4 ring-[#22C55E] border-[#22C55E]`), scale elevation (`scale-[1.02]`), and a `✓ Selected` badge when active.
  - [app/create/page.tsx](file:///e:/web%20dev/localProjects/ai-presentation-slide-builder/app/create/page.tsx): Added `selectedThemeId` state so clicking any theme card dynamically selects it with active visual feedback.

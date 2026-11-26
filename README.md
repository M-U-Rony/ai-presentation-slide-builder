# SlideSpark — AI Presentation & Slide Deck Builder

![CI](https://github.com/M-U-Rony/ai-presentation-slide-builder/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)

**SlideSpark** is a full-stack, AI-powered presentation builder inspired by Gamma.ai. Turn a raw topic prompt or outline into a structured 16:9 slide deck with **7 Zod-validated adaptive layouts**, **8 editorial themes**, **textless AI editorial imagery**, and **native `.pptx` / PDF export**.

![SlideSpark Preview](./public/preview.png)

---

## Key Features

- **Structured Generative Engine (Zod Discriminated Unions):** Converts any prompt or outline into 1–20 slides via OpenRouter, validating every generated slide against a strict `SlideLayoutSchema` (`zod`) discriminated union across **7 adaptive layouts**:
  - `intro` · `title_bullets` · `stat_grid` · `quote` · `image_text` · `process_steps` · `comparison`
- **8 Editorial Themes with Custom SVG Overlays:** Switch live between *Cream Sketchbook*, *Forest Ink*, *Mint Botanical*, *Terracotta Studio*, *Teal Blueprint*, *Blush Note*, *Obsidian Editorial*, and *Navy Blueprint* — each mapped to synchronized PPTX color palettes.
- **Textless AI Visual Generation:** Generate photorealistic, text-free commercial photography per slide via OpenRouter image models with authenticated ownership checks and local asset persistence.
- **Native PPTX & Landscape PDF Export:**
  - Export decks to editable PowerPoint (`.pptx`) files using `pptxgenjs` preserving theme colors and layout structure.
  - Print-ready landscape PDF export powered by dedicated `@media print` stylesheets.
- **16:9 Slideshow Studio & Fullscreen Presenter:** Filmstrip thumbnail navigation, keyboard controls, and fullscreen presentation mode.
- **Authenticated Workspace Dashboard:** Secure email/password and GitHub OAuth sessions via **Better-Auth**, with PostgreSQL persistence through **Prisma 7** (`@prisma/adapter-pg`).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, custom editorial SVG overlays |
| **AI & Validation** | OpenRouter SDK (`@openrouter/sdk`), Zod v4 discriminated unions |
| **Database & ORM** | PostgreSQL, Prisma 7 (`@prisma/adapter-pg`, `pg`) |
| **Authentication** | Better-Auth (session-based auth + GitHub OAuth) |
| **Export** | `pptxgenjs` (native `.pptx`) + `@media print` (PDF) |
| **Deployment** | Dockerized production build (`Dockerfile`) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (the repo's lockfile is `bun.lock`)
- PostgreSQL database (Neon, Supabase, or local PostgreSQL)
- OpenRouter API key

### 1. Clone & Install

```bash
git clone https://github.com/M-U-Rony/ai-presentation-slide-builder.git
cd ai-presentation-slide-builder
bun install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Fill in `.env`:

```env
# Required
DATABASE_URL=""
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"
OPENROUTER_API_KEY=""
TEXT_GENERATION_MODEL=""   # OpenRouter model id for slide text
IMAGE_GENERATION_MODEL=""  # OpenRouter model id for slide images

# Optional: GitHub sign-in is enabled only when both are set
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

The server checks the required variables at startup and exits with a clear
message if one is missing. The older names `Text_Generation_Model` /
`Image_Generation_Model` are still accepted.

### 3. Apply Database Migrations

```bash
bunx prisma migrate deploy
bunx prisma generate
```

### 4. Run Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
bun run lint    # ESLint
bun run build   # production build
```

---

## Usage Limits

To keep OpenRouter costs bounded, each user can generate **10 decks and 10
images per day** (server-local calendar day). Failed generations count too,
and only one generation (deck or image) runs per user at a time. Limits are
set in `lib/constants.ts`.

## Local Development Notes

- Generated slide images are written to `public/generated/`. They are served
  under `bun run dev`; with `bun run build && bun run start`, Next.js does not
  serve files added to `public/` after the build, so new images return 404.
- AI calls time out (90s for text, 120s for images) and a malformed text
  response is retried once before failing.

---

## Docker Deployment

```bash
docker build -t slidespark .
docker run -d -p 3000:3000 --name slidespark-app --env-file .env slidespark
```

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── auth/[...all]/          # Better-Auth endpoints
│   │   ├── generateSlides/         # OpenRouter structured slide deck generation
│   │   ├── generateImg/            # Authenticated AI slide artwork generation
│   │   ├── getPresentation/        # Single deck fetch
│   │   ├── getUserPresentations/   # User deck history
│   │   └── usage/                  # Today's quota usage
│   ├── create/                     # Interactive prompt & theme builder
│   ├── dashboard/                  # Saved presentation workspace
│   ├── slides/                     # 16:9 studio viewer & fullscreen presenter
│   └── page.tsx                    # Landing page
├── components/
│   ├── slide-layouts/              # 7 adaptive layout renderers
│   ├── slide-themes/               # 8 editorial SVG theme overlays
│   ├── landing.tsx                 # Landing hero & showcase
│   ├── prompt-form.tsx             # Prompt & slide-count controls
│   ├── error-banner.tsx            # Inline error banner with retry
│   ├── signin-form.tsx / signup-form.tsx
│   └── slidecard.tsx               # 16:9 slide canvas & filmstrip card
├── lib/
│   ├── ai/                         # OpenRouter client, prompts, deck & image generation
│   ├── api.ts / api-client.ts      # Shared API response/error helpers (server & client)
│   ├── env.ts                      # Environment validation
│   ├── usage.ts                    # Daily quota & one-at-a-time generation lock
│   ├── slideLayouts.ts             # Zod discriminated union schemas for all 7 layouts
│   ├── pptxExport.ts               # Native .pptx deck exporter (pptxgenjs)
│   ├── theme.ts                    # 8 editorial themes + PPTX color tokens
│   ├── auth.ts / auth-client.ts    # Better-Auth server & client setup
│   └── prisma.ts                   # Prisma 7 pg-adapter singleton
├── prisma/
│   └── schema.prisma               # User, Session, Account, Presentation, Slide, UsageEvent
└── Dockerfile
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

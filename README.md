# 🎨 SlideAI — AI Presentation & Slide Builder

**SlideAI** is a modern, AI-powered presentation builder application inspired by Gamma.ai. It allows users to convert raw topic prompts or outline notes into beautifully formatted 16:9 presentation slide decks with visual layouts, filmstrip navigation, textless AI artwork generation, and native PPTX/PDF exports.

---

## ✨ Features

- **🚀 Generative Prompt Engine**: Convert any prompt or outline notes into complete presentation decks with custom slide counts (1 to 20 slides).
- **🎨 Curated Aesthetic Themes**: Toggle between high-contrast presentation themes (*Modern*, *Dark*, *Light*, *Minimal*, *Lucrative*, *Professional*).
- **🎞️ PowerPoint / Google Slides Studio**: Traditional 16:9 canvas stage with a 1-indexed left filmstrip thumbnail navigation panel.
- **🖼️ Textless AI Graphic Generation**: Generate textless 3D artwork and visual metaphors directly onto individual slides powered by OpenRouter LLM APIs.
- **📊 Native PPTX & PDF Export**:
  - Export complete decks to native PowerPoint `.pptx` presentation files using `pptxgenjs`.
  - Export presentation slides to clean, landscape PDF files without UI sidebars or toolbars.
- **🖥️ Fullscreen Slideshow Presenter**: Launch a full-screen 16:9 slideshow presentation mode with keyboard and click navigation.
- **📂 Deck History Dashboard**: View, retrieve, and open all past user presentation decks from the `/dashboard` workspace.
- **🔐 Better-Auth & Prisma 7 PostgreSQL**: Secure session handling and structured database storage.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design System
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Outfit` & `Geist`)
- **Database & ORM**: [Prisma 7](https://www.prisma.io/) with PostgreSQL (`@prisma/adapter-pg`)
- **AI Engine**: [OpenRouter SDK](https://openrouter.ai/)
- **Presentation Export**: `pptxgenjs` (PPTX) & `@media print` landscape engine (PDF)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Better-Auth](https://www.better-auth.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database URL (Supabase, Neon, or local PostgreSQL)
- OpenRouter API key

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/ai-presentation-slide-builder.git
cd ai-presentation-slide-builder
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=""
DIRECT_URL=""
OPENROUTER_API_KEY="your_openrouter_api_key"
BETTER_AUTH_SECRET="your_better_auth_secret_at_least_32_chars"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

### 3. Database Migration

Generate Prisma client and apply database migrations:

```bash
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...all]/       # Better-Auth endpoints
│   │   ├── generateImg/         # OpenRouter AI visual image generator
│   │   ├── generateSlides/      # OpenRouter AI slide content generator
│   │   ├── getPresentation/     # Single presentation fetch API
│   │   └── getUserPresentations/# User deck history fetch API
│   ├── create/                  # Interactive studio prompt builder page
│   ├── dashboard/               # Saved presentation deck history page
│   ├── slides/                  # PowerPoint slideshow studio viewer page
│   ├── globals.css              # Global styles & @media print CSS rules
│   ├── layout.tsx               # Root layout & Google Fonts integration
│   └── page.tsx                 # Landing page
├── components/
│   ├── landing.tsx              # Landing page hero & showcase components
│   ├── promtpage.tsx            # AI prompt engine input component
│   └── slidecard.tsx            # 16:9 presentation slide paper & thumbnail component
├── lib/
│   ├── auth.ts                  # Better-Auth server configuration
│   ├── auth-client.ts           # Better-Auth React client configuration
│   ├── theme.ts                 # Aesthetic color theme tokens
│   └── types.ts                 # TypeScript interfaces
├── prisma/
│   └── schema.prisma            # Database models (User, Prsesentation, Slide)
└── public/                      # Static assets & generated AI images
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

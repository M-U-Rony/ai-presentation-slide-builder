# 🎨 SlideSpark — AI Presentation & Slide Builder

**SlideSpark** is a modern, AI-powered presentation builder application inspired by Gamma.ai. It allows users to convert raw topic prompts or outline notes into beautifully formatted 16:9 presentation slide decks with visual layouts, filmstrip navigation, textless AI artwork generation, and native PPTX/PDF exports.

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

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Your `.env` file should include:

```env
OPENROUTER_API_KEY=""

# PostgreSQL connection string
DATABASE_URL=""

BETTER_AUTH_SECRET=""

# Base URL of your app
BETTER_AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""

Text_Generation_Model=""
Image_Generation_Model=""
```

### 3. Database Migration

Generate Prisma client and apply database migrations:

```bash
npx prisma db push
```

### 4. Run Development Server

```bash
bun dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

You can also build and run the entire application containerized using Docker:

### 1. Build the Docker Image

```bash
docker build -t slide-builder .
```

### 2. Run the Container

```bash
docker run -p 3000:3000 --env-file .env slide-builder
```

To run in the background (detached mode):

```bash
docker run -d -p 3000:3000 --name slide-builder-app --env-file .env slide-builder
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

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

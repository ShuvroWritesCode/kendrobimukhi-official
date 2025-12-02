# Kendrobimukhi Official Website

Must use latest compatible versions and latest commands.

## Project Overview
This is the official website for **Kendrobimukhi (কেন্দ্রবিমুখী)** - a non-profit organization dedicated to driving social change through social research and educational initiatives.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (for admin panel)
- **File Storage**: Supabase Storage
- **Font**: Outfit (Google Fonts)

## Brand Colors
```
primary: #47a569 (green)
texts/foreground: #293b19 (dark green)
secondary: #A1BC98 (light green)
background: #F1F3E0 (cream)
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles with brand colors
│   ├── events/             # Events page
│   ├── missions/           # Missions page
│   ├── blogs/              # Blogs listing & detail pages
│   ├── about/              # About page
│   ├── donate/             # Donate page
│   └── admin/              # Admin panel (protected)
├── components/
│   ├── layout/             # Header, Footer components
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── supabase/           # Supabase client configuration
    └── utils.ts            # Utility functions
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Pages
- **Homepage**: Hero, Mission overview, Recent blogs, Upcoming events
- **Events**: List of events with details
- **Missions**: Sub-programs (KESRF, KCDS, etc.) as interactive cards
- **Blogs**: Blog listing and individual posts
- **About**: Organization information
- **Admin**: Protected admin panel for content management

## External Links
- Facebook: https://www.facebook.com/kendrobimukhi

## Deployment
Deploy on Vercel for best Next.js compatibility. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

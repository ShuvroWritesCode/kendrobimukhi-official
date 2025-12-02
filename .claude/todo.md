# Kendrobimukhi Website - Todo List

## Phase 1: Project Setup (Completed)
- [x] Create Next.js project with TypeScript, Tailwind, ESLint
- [x] Initialize shadcn/ui
- [x] Install shadcn components (button, card, dialog, input, etc.)
- [x] Configure custom theme with brand colors
- [x] Create layout components (Header, Footer)
- [x] Install Supabase client libraries
- [x] Create Supabase configuration files
- [x] Setup favicon from favicon_io folder

## Phase 2: Public Pages
- [ ] Create Events page: List of upcoming/past events with filtering
- [ ] Create Missions page: Sub-programs as cards with modal details (KESRF, KCDS, etc.)
- [ ] Create Blogs page: Blog listing with categories
- [ ] Create Blog detail page: Individual blog post view
- [ ] Create About page: Organization information, team, history
- [ ] Create Donate page: Donation information and payment options
- [ ] Create Contact page: Contact form and information

## Phase 3: Supabase Database Setup
- [ ] Create Supabase project and get credentials
- [ ] Setup .env.local with Supabase URL and anon key
- [ ] Create database tables:
  - [ ] events (id, title, description, date, location, image_url, status)
  - [ ] missions (id, name, tags, description, start_date, current_works, link)
  - [ ] blogs (id, title, slug, content, excerpt, image_url, author, published_at, category)
  - [ ] categories (id, name, slug)
- [ ] Setup Row Level Security (RLS) policies
- [ ] Create Supabase Storage buckets for images

## Phase 4: Admin Panel
- [ ] Setup admin authentication with Supabase Auth
- [ ] Create admin layout with sidebar navigation
- [ ] Create admin dashboard with statistics
- [ ] Create Events CRUD:
  - [ ] Events list with pagination
  - [ ] Add/Edit event form
  - [ ] Delete event functionality
- [ ] Create Missions CRUD:
  - [ ] Missions list
  - [ ] Add/Edit mission form
  - [ ] Delete mission functionality
- [ ] Create Blogs CRUD:
  - [ ] Blogs list with filters
  - [ ] Add/Edit blog with rich text editor
  - [ ] Delete blog functionality
  - [ ] Image upload for blog posts

## Phase 5: Integration & Polish
- [ ] Connect public pages to Supabase data
- [ ] Add loading states and skeletons
- [ ] Add error handling
- [ ] Implement search functionality
- [ ] Add pagination where needed
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] Performance optimization (image optimization, lazy loading)

## Phase 6: Testing & Deployment
- [ ] Test all public pages
- [ ] Test admin CRUD operations
- [ ] Test responsive design on mobile/tablet
- [ ] Setup Vercel deployment
- [ ] Configure environment variables on Vercel
- [ ] Deploy to production

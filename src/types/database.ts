// Database types for Supabase tables

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string;
  image_url: string | null;
  cta_text: string;
  cta_variant: "default" | "secondary";
  is_featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  image_url: string | null;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

// Blog with joined relations
export interface BlogWithRelations extends Blog {
  category: Category | null;
  author: Author | null;
}

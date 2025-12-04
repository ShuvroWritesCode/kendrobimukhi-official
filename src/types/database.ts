// Database types for Supabase tables

// ==================== Admin Users ====================
export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  is_approved: boolean;
  created_at: string;
  approved_at: string | null;
  approved_by: string | null;
}

// ==================== Event Categories ====================
export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// ==================== Events ====================
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
  registration_link: string | null;
  category_id: string | null;
  created_at: string;
}

export interface EventWithCategory extends Event {
  category: EventCategory | null;
}

// ==================== Blog Categories ====================
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

// ==================== Authors ====================
export interface Author {
  id: string;
  fullname: string;
  institution: string | null;
  image_url: string | null;
  dob: string | null;
  created_at: string;
}

// ==================== Blogs ====================
export type BlogStatus = "draft" | "published";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  heading: string | null;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  is_featured: boolean;
  status: BlogStatus;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

// Blog with joined relations
export interface BlogWithRelations extends Blog {
  category: Category | null;
  author: Author | null;
}

// ==================== Form Types ====================
export interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  cta_text: string;
  cta_variant: "default" | "secondary";
  is_featured: boolean;
  registration_link: string;
  category_id: string;
}

export interface BlogFormData {
  title: string;
  heading: string;
  summary: string;
  content: string;
  image_url: string;
  category_id: string;
  author_id: string;
  is_featured: boolean;
  status: BlogStatus;
  tags: string;
}

export interface AuthorFormData {
  fullname: string;
  institution: string;
  image_url: string;
  dob: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
}

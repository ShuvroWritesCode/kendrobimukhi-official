import { createClient } from "@/lib/supabase/server";
import BlogsClient from "@/components/blogs/BlogsClient";
import type { BlogWithRelations, Category } from "@/types/database";

export default async function BlogsPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  // Fetch featured blog (only published)
  const { data: featuredData } = await supabase
    .from("blogs")
    .select(
      `
      *,
      category:categories(*),
      author:authors(*)
    `
    )
    .eq("is_featured", true)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch all non-featured published blogs
  const { data: blogsData } = await supabase
    .from("blogs")
    .select(
      `
      *,
      category:categories(*),
      author:authors(*)
    `
    )
    .eq("is_featured", false)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const featuredBlog = featuredData as BlogWithRelations | null;
  const blogs = (blogsData ?? []) as BlogWithRelations[];
  const categoryList = (categories ?? []) as Category[];

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Blogs & Articles
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Get the latest blogs & articles from Kendrobimukhi.
            </p>
          </div>

          {/* Blogs Client Component */}
          <BlogsClient
            featuredBlog={featuredBlog}
            blogs={blogs}
            categories={categoryList}
          />
        </div>
      </section>
    </div>
  );
}

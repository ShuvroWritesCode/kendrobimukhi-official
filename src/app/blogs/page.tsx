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

  // Fetch featured blog
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
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch all non-featured blogs
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
    .order("published_at", { ascending: false });

  const featuredBlog = featuredData as BlogWithRelations | null;
  const blogs = (blogsData ?? []) as BlogWithRelations[];
  const categoryList = (categories ?? []) as Category[];

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Stories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Insights and updates from the field on nature and social awareness,
              exploring the intersection of our planet and its people.
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

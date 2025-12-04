import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [blogResult, categoriesResult, authorsResult] = await Promise.all([
    supabase.from("blogs").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("name"),
    supabase.from("authors").select("*").order("fullname"),
  ]);

  if (blogResult.error || !blogResult.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Blog</h1>
        <p className="text-slate-600 mt-1">Update blog post</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <BlogForm
          blog={blogResult.data}
          categories={categoriesResult.data || []}
          authors={authorsResult.data || []}
        />
      </div>
    </div>
  );
}

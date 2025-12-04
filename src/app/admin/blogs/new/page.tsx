import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/BlogForm";

export default async function NewBlogPage() {
  const supabase = await createClient();

  const [categoriesResult, authorsResult] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("authors").select("*").order("fullname"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Blog</h1>
        <p className="text-slate-600 mt-1">Add a new blog post</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <BlogForm
          categories={categoriesResult.data || []}
          authors={authorsResult.data || []}
        />
      </div>
    </div>
  );
}

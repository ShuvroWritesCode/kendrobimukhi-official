import { createClient } from "@/lib/supabase/server";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { Badge } from "@/components/ui/badge";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const [blogCategoriesResult, eventCategoriesResult] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("event_categories").select("*").order("name"),
  ]);

  const blogCategories = blogCategoriesResult.data || [];
  const eventCategories = eventCategoriesResult.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
        <p className="text-slate-600 mt-1">Manage blog and event categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blog Categories */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Blog Categories</h2>

          <CategoryForm type="blog" />

          <div className="mt-6 space-y-2">
            {blogCategories.length > 0 ? (
              blogCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.slug}
                    </Badge>
                  </div>
                  <DeleteCategoryButton
                    categoryId={category.id}
                    categoryName={category.name}
                    type="blog"
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                No blog categories yet
              </p>
            )}
          </div>
        </div>

        {/* Event Categories */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Event Categories</h2>

          <CategoryForm type="event" />

          <div className="mt-6 space-y-2">
            {eventCategories.length > 0 ? (
              eventCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.slug}
                    </Badge>
                  </div>
                  <DeleteCategoryButton
                    categoryId={category.id}
                    categoryName={category.name}
                    type="event"
                  />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">
                No event categories yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

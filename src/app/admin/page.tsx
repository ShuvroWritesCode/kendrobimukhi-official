import { createClient } from "@/lib/supabase/server";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const now = new Date().toISOString();

  // Fetch events stats
  const { data: events } = await supabase.from("events").select("id, event_date");
  const totalEvents = events?.length || 0;
  const upcomingEvents = events?.filter((e) => e.event_date >= now).length || 0;
  const pastEvents = events?.filter((e) => e.event_date < now).length || 0;

  // Fetch blogs stats
  const { data: blogs } = await supabase.from("blogs").select("id, status");
  const totalBlogs = blogs?.length || 0;
  const draftBlogs = blogs?.filter((b) => b.status === "draft").length || 0;
  const publishedBlogs = blogs?.filter((b) => b.status === "published").length || 0;

  // Fetch authors count
  const { count: totalAuthors } = await supabase
    .from("authors")
    .select("*", { count: "exact", head: true });

  // Fetch categories count (both blog and event categories)
  const { count: blogCategories } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });
  const { count: eventCategories } = await supabase
    .from("event_categories")
    .select("*", { count: "exact", head: true });
  const totalCategories = (blogCategories || 0) + (eventCategories || 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Welcome to KB Command Center. Manage your events and blogs.
        </p>
      </div>

      <DashboardStats
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        totalEvents={totalEvents}
        draftBlogs={draftBlogs}
        publishedBlogs={publishedBlogs}
        totalBlogs={totalBlogs}
        totalAuthors={totalAuthors || 0}
        totalCategories={totalCategories}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/admin/events/new"
              className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">📅</span>
              <p className="mt-2 text-sm font-medium">New Event</p>
            </a>
            <a
              href="/admin/blogs/new"
              className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">📝</span>
              <p className="mt-2 text-sm font-medium">New Blog</p>
            </a>
            <a
              href="/admin/authors/new"
              className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">👤</span>
              <p className="mt-2 text-sm font-medium">New Author</p>
            </a>
            <a
              href="/admin/categories"
              className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <span className="text-2xl">📁</span>
              <p className="mt-2 text-sm font-medium">Categories</p>
            </a>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">System Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Platform</span>
              <span className="font-medium">Kendrobimukhi Official</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Admin Panel</span>
              <span className="font-medium">KB Command Center</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Database</span>
              <span className="font-medium">Supabase</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Last Updated</span>
              <span className="font-medium">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

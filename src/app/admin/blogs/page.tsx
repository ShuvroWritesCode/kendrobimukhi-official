import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteBlogButton } from "./DeleteBlogButton";
import type { BlogWithRelations } from "@/types/database";

export default async function BlogsPage() {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(`
      *,
      category:categories(id, name, slug),
      author:authors(id, fullname, image_url)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blogs</h1>
          <p className="text-slate-600 mt-1">Manage your blog posts</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Button>
        </Link>
      </div>

      {blogs && blogs.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Author
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {(blogs as BlogWithRelations[]).map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium line-clamp-1">{blog.title}</span>
                      {blog.is_featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {blog.author ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.image_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(blog.author.fullname)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">
                          {blog.author.fullname}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {blog.category ? (
                      <Badge variant="outline">{blog.category.name}</Badge>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {blog.status === "published" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatDate(blog.status === "published" ? blog.published_at : blog.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blogs/${blog.id}/preview`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blogs/${blog.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-slate-500 mb-4">No blogs found</p>
          <Link href="/admin/blogs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create your first blog
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

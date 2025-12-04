import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface PreviewBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function PreviewBlogPage({ params }: PreviewBlogPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select(`
      *,
      category:categories(id, name, slug),
      author:authors(id, fullname, institution, image_url)
    `)
    .eq("id", id)
    .single();

  if (error || !blog) {
    notFound();
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Preview</h1>
        </div>
        <Link href={`/admin/blogs/${id}`}>
          <Button variant="outline">Edit Blog</Button>
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          This is a preview of how the blog will appear on the public website.
          {blog.status === "draft" && " This blog is currently a draft and not visible to the public."}
        </p>
      </div>

      {/* Blog Preview */}
      <article className="bg-white rounded-lg border overflow-hidden max-w-3xl">
        {blog.image_url && (
          <div className="relative h-72 w-full">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-8 space-y-6">
          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap">
            {blog.status === "draft" ? (
              <Badge variant="secondary">Draft</Badge>
            ) : (
              <Badge className="bg-green-100 text-green-700">Published</Badge>
            )}
            {blog.is_featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
            {blog.category && (
              <Badge variant="outline">{blog.category.name}</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{blog.title}</h1>

          {/* Heading/Subtitle */}
          {blog.heading && (
            <p className="text-xl text-slate-600">{blog.heading}</p>
          )}

          {/* Author & Date */}
          <div className="flex items-center gap-6 text-sm text-slate-600 border-y py-4">
            {blog.author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={blog.author.image_url || undefined} />
                  <AvatarFallback>{getInitials(blog.author.fullname)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">{blog.author.fullname}</p>
                  {blog.author.institution && (
                    <p className="text-xs text-slate-500">{blog.author.institution}</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.published_at)}</span>
            </div>
          </div>

          {/* Summary */}
          {blog.summary && (
            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-slate-700 italic">{blog.summary}</p>
            </div>
          )}

          {/* Content */}
          {blog.content && (
            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-wrap">{blog.content}</p>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t">
              <span className="text-sm text-slate-500">Tags:</span>
              {blog.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

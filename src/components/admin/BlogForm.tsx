"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Blog, Category, Author } from "@/types/database";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  heading: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category_id: z.string().optional(),
  author_id: z.string().min(1, "Author is required"),
  is_featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  tags: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  blog?: Blog;
  categories: Category[];
  authors: Author[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogForm({ blog, categories, authors }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      heading: blog?.heading || "",
      summary: blog?.summary || "",
      content: blog?.content || "",
      image_url: blog?.image_url || "",
      category_id: blog?.category_id || "",
      author_id: blog?.author_id || "",
      is_featured: blog?.is_featured || false,
      status: blog?.status || "draft",
      tags: blog?.tags?.join(", ") || "",
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const slug = blog?.slug || generateSlug(data.title);
      const tagsArray = data.tags
        ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : null;

      const blogData = {
        title: data.title,
        slug,
        heading: data.heading || null,
        summary: data.summary || null,
        content: data.content || null,
        image_url: data.image_url || null,
        category_id: data.category_id || null,
        author_id: data.author_id,
        is_featured: data.is_featured,
        status: data.status,
        tags: tagsArray,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      };

      if (blog) {
        const { error: updateError } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", blog.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("blogs")
          .insert(blogData);

        if (insertError) throw insertError;
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter blog title"
          disabled={loading}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author_id">Author *</Label>
        <Select
          value={watch("author_id") || ""}
          onValueChange={(value) => setValue("author_id", value)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.fullname} {author.institution && `(${author.institution})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.author_id && (
          <p className="text-sm text-red-600">{errors.author_id.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="heading">Heading</Label>
        <Textarea
          id="heading"
          {...register("heading")}
          placeholder="Enter blog heading/subtitle"
          rows={2}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          {...register("summary")}
          placeholder="Enter a brief summary of the blog"
          rows={3}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Main Content</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="Enter the main body of the blog"
          rows={12}
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category_id">Category</Label>
          <Select
            value={watch("category_id") || "none"}
            onValueChange={(value) => setValue("category_id", value === "none" ? "" : value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch("status")}
            onValueChange={(value: "draft" | "published") =>
              setValue("status", value)
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Cover Image URL</Label>
        <Input
          id="image_url"
          {...register("image_url")}
          placeholder="https://example.com/image.jpg"
          disabled={loading}
        />
        {errors.image_url && (
          <p className="text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          {...register("tags")}
          placeholder="technology, education, research"
          disabled={loading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_featured"
          {...register("is_featured")}
          className="h-4 w-4 rounded border-gray-300"
          disabled={loading}
        />
        <Label htmlFor="is_featured" className="font-normal">
          Featured blog (shown prominently on the website)
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {blog ? "Updating..." : "Creating..."}
            </>
          ) : blog ? (
            "Update Blog"
          ) : (
            "Create Blog"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blogs")}
          disabled={loading}
        >
          Cancel
        </Button>
        {blog && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/blogs/${blog.id}/preview`)}
            disabled={loading}
          >
            Preview
          </Button>
        )}
      </div>
    </form>
  );
}

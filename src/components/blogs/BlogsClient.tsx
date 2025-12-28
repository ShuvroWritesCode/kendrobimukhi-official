"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import type { BlogWithRelations, Category } from "@/types/database";

interface BlogsClientProps {
  featuredBlog: BlogWithRelations | null;
  blogs: BlogWithRelations[];
  categories: Category[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CategoryButton({
  category,
  isActive,
  onClick,
}: {
  category: { id: string; name: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={
        isActive ? "" : "bg-background hover:bg-muted border-border"
      }
    >
      {category.name}
    </Button>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="default" size="sm" className="h-9 w-9 p-0 font-medium">
        1
      </Button>
      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-medium">
        2
      </Button>
      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-medium">
        3
      </Button>
      <span className="px-2 text-muted-foreground">...</span>
      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-medium">
        10
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function BlogsClient({
  featuredBlog,
  blogs,
  categories,
}: BlogsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Add "All" option to categories
  const allCategories = [{ id: "all", name: "All", slug: "all" }, ...categories];

  // Filter blogs based on category and search
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "all" ||
        blog.category?.slug === activeCategory ||
        blog.category?.id === activeCategory;

      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  return (
    <>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles by keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id || activeCategory === category.slug}
              onClick={() => setActiveCategory(category.slug || category.id)}
            />
          ))}
        </div>
      </div>

      {/* Featured Article */}
      {featuredBlog && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Featured Article
          </h2>
          <Card className="overflow-hidden border border-border/50 py-0">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto min-h-[300px]">
                {featuredBlog.image_url ? (
                  <Image
                    src={featuredBlog.image_url}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                {featuredBlog.category && (
                  <Badge
                    variant="secondary"
                    className="w-fit mb-3 text-primary bg-primary/10"
                  >
                    {featuredBlog.category.name.toUpperCase()}
                  </Badge>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {featuredBlog.title}
                </h3>
                {featuredBlog.summary && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredBlog.summary}
                  </p>
                )}
                <div className="flex items-center gap-3 mb-4">
                  {featuredBlog.author?.image_url ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={featuredBlog.author.image_url}
                        alt={featuredBlog.author.fullname}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        {featuredBlog.author?.fullname?.charAt(0) || "A"}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {featuredBlog.author?.fullname || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {featuredBlog.published_at ? formatDate(featuredBlog.published_at) : ""}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/blogs/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Latest Articles */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Latest Articles
        </h2>
        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden border border-border/50 py-0"
              >
                <div className="relative aspect-[16/10]">
                  {blog.image_url ? (
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  {blog.category && (
                    <Badge
                      variant="secondary"
                      className="w-fit mb-3 text-primary bg-primary/10 text-xs"
                    >
                      {blog.category.name.toUpperCase()}
                    </Badge>
                  )}
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.summary && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {blog.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {blog.author?.image_url ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={blog.author.image_url}
                          alt={blog.author.fullname}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {blog.author?.fullname?.charAt(0) || "A"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {blog.author?.fullname || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {blog.published_at ? formatDate(blog.published_at) : ""}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No articles found. Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBlogs.length > 6 && <Pagination />}
    </>
  );
}

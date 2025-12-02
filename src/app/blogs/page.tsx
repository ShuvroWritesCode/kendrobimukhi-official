"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { id: "all", name: "All" },
  { id: "conservation", name: "Conservation" },
  { id: "community", name: "Community" },
  { id: "research", name: "Research" },
  { id: "social-impact", name: "Social Impact" },
];

const featuredArticle = {
  id: "1",
  title: "The Silent Guardians: How Old-Growth Forests Sustain Our Planet",
  excerpt:
    "Discover the vital role ancient forests play in regulating climate, preserving biodiversity, and providing essential resources for communities worldwide.",
  category: "Conservation",
  author: {
    name: "Jane Doe",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  date: "October 26, 2023",
  imageUrl:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  slug: "old-growth-forests",
};

const articles = [
  {
    id: "2",
    title: "Grassroots Greenery: A Local Community's Reforestation Success",
    excerpt: "How a small town came together to restore their local woodland area.",
    category: "Community",
    author: {
      name: "John Smith",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    date: "October 22, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    slug: "community-reforestation",
  },
  {
    id: "3",
    title: "The Hidden World of Mycelial Networks: Nature's Internet",
    excerpt: "New findings reveal how fungi networks support forest ecosystems.",
    category: "Research",
    author: {
      name: "Dr. Emily Carter",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    date: "October 15, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
    slug: "mycelial-networks",
  },
  {
    id: "4",
    title: "Clean Water Initiatives: Empowering Communities Through Access",
    excerpt:
      "A look at the social and economic benefits of providing clean water.",
    category: "Social Impact",
    author: {
      name: "Maria Garcia",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    },
    date: "October 10, 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&q=80",
    slug: "clean-water-initiatives",
  },
];

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
        isActive
          ? ""
          : "bg-background hover:bg-muted border-border"
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

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </div>
          </div>

          {/* Featured Article */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Featured Article
            </h2>
            <Card className="overflow-hidden border border-border/50 py-0">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge
                    variant="secondary"
                    className="w-fit mb-3 text-primary bg-primary/10"
                  >
                    {featuredArticle.category.toUpperCase()}
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={featuredArticle.author.imageUrl}
                        alt={featuredArticle.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {featuredArticle.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {featuredArticle.date}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Latest Articles */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden border border-border/50 py-0"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge
                      variant="secondary"
                      className="w-fit mb-3 text-primary bg-primary/10 text-xs"
                    >
                      {article.category.toUpperCase()}
                    </Badge>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={article.author.imageUrl}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {article.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {article.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </section>
    </div>
  );
}

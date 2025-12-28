import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Globe, Wifi, Lightbulb, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const supabase = await createClient();

  // Fetch Featured Blogs
  const { data: featuredBlogs } = await supabase
    .from("blogs")
    .select("id, title, summary, image_url, slug, created_at")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  // Fetch Upcoming Events
  const { data: upcomingEvents } = await supabase
    .from("events")
    .select("id, title, location, event_date, image_url")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(3);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden md:aspect-[55.6/19] flex items-center">
        {/* Replace with actual hero image - for now using gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-secondary/80" />
        <div className="absolute inset-0 bg-[url('/images/CBanner.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 py-24 md:py-0 px-6 md:px-12 w-full">
          {/* Content commented out in original file */}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Kendrobimukhi is a Bangladesh-based social research collective committed to situated learning, collective mentorship, and the democratization of knowledge production. We work with emerging researchers to build skills, critical judgment, and pathways into academic and public knowledge-making.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Situated Research Training",
                description:
                  "Hands-on training in social research grounded in local realities, ethical reflexivity, and critical theory.",
              },
              {
                icon: Users,
                title: "Collective Learning & Mentorship",
                description:
                  "Learning through peer mentorship, collaboration, and shared intellectual labor across experience levels.",
              },
              {
                icon: Lightbulb,
                title: "Pathways for Researcher Formation",
                description:
                  "Supporting emerging researchers in building skills, confidence, and direction for academic and public-facing work.",
              },
            ].map((item) => (
              <Card key={item.title} className="border border-border/50">
                <CardContent className="pt-6">
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Blogs Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Recent News & Blogs
          </h2>

          {!featuredBlogs || featuredBlogs.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No featured article at this moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <div key={blog.id} className="group">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-secondary">
                    {blog.image_url ? (
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        <BookOpen className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                  <Link
                    href={`/blogs/${blog.slug || blog.id}`}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>

          {!upcomingEvents || upcomingEvents.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No upcoming events scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const date = new Date(event.event_date);
                const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
                const day = date.getDate();
                const time = date.toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true });

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[60px]">
                        <div className="text-sm text-primary font-medium">
                          {month}
                        </div>
                        <div className="text-3xl font-bold text-primary">
                          {day}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {event.location} • {time}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="shrink-0 ml-4">
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden">
        {/* Replace with actual hero image - for now using gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Driving Social Change through
              <br />
              Social Research.
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl">
              Join us in our mission to create a ...
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="https://www.facebook.com/kendrobimukhi" target="_blank" rel="noopener noreferrer">Get Involved</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-foreground hover:bg-white/90 border-white"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are dedicated to fostering a deeper connection between communities and the natural world.
              Through education, conservation efforts, and collaborative projects, we strive to protect our
              planet&apos;s precious ecosystems for future generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Environmental Education",
                description:
                  "Providing accessible learning resources to inspire the next generation of environmental stewards.",
              },
              {
                icon: Users,
                title: "Community Action",
                description:
                  "Organizing local events and volunteer opportunities to make a tangible impact.",
              },
              {
                icon: Globe,
                title: "Conservation Projects",
                description:
                  "Leading initiatives to restore habitats, protect wildlife, and promote biodiversity.",
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

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&q=80",
                title: "A Look Back at Our Annual River Cleanup",
                description:
                  "See the incredible impact our volunteers made this year, removing over 2 tons of waste from local waterways.",
                href: "/blogs/river-cleanup",
              },
              {
                image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80",
                title: "The Importance of Native Plant Species",
                description:
                  "Learn why planting native species is crucial for supporting local wildlife and creating a healthy ecosystem.",
                href: "/blogs/native-plants",
              },
              {
                image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
                title: "Community Spotlight: The Green Team",
                description:
                  "Meet the dedicated group of local high school students who are leading change in their community.",
                href: "/blogs/green-team",
              },
            ].map((blog) => (
              <div key={blog.title} className="group">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-secondary">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {blog.description}
                </p>
                <Link
                  href={blog.href}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>

          <div className="space-y-4">
            {[
              {
                month: "MAY",
                day: "25",
                title: "Community Tree Planting Day",
                location: "Riverside Park, 9:00 AM-1:00 PM",
                buttonText: "View Details",
                buttonVariant: "outline" as const,
              },
              {
                month: "JUN",
                day: "12",
                title: "Workshop: Sustainable Gardening",
                location: "Online Webinar, 7:00 PM",
                buttonText: "Register",
                buttonVariant: "default" as const,
              },
            ].map((event) => (
              <div
                key={event.title}
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-6">
                  <div className="text-center min-w-[60px]">
                    <div className="text-sm text-primary font-medium">
                      {event.month}
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {event.day}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>
                <Button variant={event.buttonVariant} asChild>
                  <Link href="/events">{event.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer is handled in layout, but we need to update it */}
    </div>
  );
}

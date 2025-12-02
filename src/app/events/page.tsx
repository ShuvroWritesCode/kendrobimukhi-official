"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Annual Forest Cleanup Drive",
    date: "Sat, Oct 12",
    time: "9:00 AM",
    location: "Redwood Park",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    ctaText: "Register",
    ctaVariant: "default" as const,
    type: "upcoming",
  },
  {
    id: "2",
    title: "Community Tree Planting Day",
    date: "Sat, Oct 26",
    time: "10:00 AM",
    location: "City Center Park",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
    ctaText: "Register",
    ctaVariant: "default" as const,
    type: "upcoming",
  },
  {
    id: "3",
    title: "Wildlife Photography Workshop",
    date: "Sun, Nov 3",
    time: "1:00 PM",
    location: "Eagle Peak Reserve",
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
    ctaText: "Learn More",
    ctaVariant: "secondary" as const,
    type: "upcoming",
  },
  {
    id: "4",
    title: "Guided Nature Hike: Oak Valley",
    date: "Sat, Nov 9",
    time: "8:00 AM",
    location: "Oak Valley Trailhead",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    ctaText: "Learn More",
    ctaVariant: "secondary" as const,
    type: "upcoming",
  },
  {
    id: "5",
    title: "Sustainable Living Seminar",
    date: "Wed, Nov 20",
    time: "6:00 PM",
    location: "Community Hall",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    ctaText: "Register",
    ctaVariant: "default" as const,
    type: "upcoming",
  },
  {
    id: "6",
    title: "River Conservation Gala",
    date: "Fri, Dec 6",
    time: "7:00 PM",
    location: "The Grand Ballroom",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    ctaText: "Learn More",
    ctaVariant: "secondary" as const,
    type: "upcoming",
  },
];

const pastEvents = [
  {
    id: "7",
    title: "Spring Garden Festival",
    date: "Sat, Apr 15",
    time: "10:00 AM",
    location: "Botanical Gardens",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    ctaText: "View Recap",
    ctaVariant: "secondary" as const,
    type: "past",
  },
  {
    id: "8",
    title: "Beach Cleanup Day",
    date: "Sun, Mar 22",
    time: "8:00 AM",
    location: "Sunset Beach",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    ctaText: "View Recap",
    ctaVariant: "secondary" as const,
    type: "past",
  },
  {
    id: "9",
    title: "Environmental Film Screening",
    date: "Fri, Feb 14",
    time: "7:00 PM",
    location: "City Cinema",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    ctaText: "View Recap",
    ctaVariant: "secondary" as const,
    type: "past",
  },
];

function EventCard({
  event,
}: {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
    ctaText: string;
    ctaVariant: "default" | "secondary";
  };
}) {
  return (
    <Card className="overflow-hidden border border-border/50 py-0">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4 pt-4">
        <h3 className="font-semibold text-foreground text-lg mb-3">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <Calendar className="h-4 w-4" />
          <span>
            {event.date}-{event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <Button variant={event.ctaVariant} className="w-full">
          {event.ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="default"
        size="sm"
        className="h-9 w-9 p-0 font-medium"
      >
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
        8
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Events
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Connect with nature and our community through our upcoming events.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming" className="px-4">
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="past" className="px-4">
                Past Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <Pagination />
            </TabsContent>

            <TabsContent value="past">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <Pagination />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

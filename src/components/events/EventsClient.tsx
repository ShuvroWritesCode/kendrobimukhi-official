"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Event } from "@/types/database";

interface EventCardProps {
  event: Event;
}

function formatEventDate(dateString: string): { date: string; time: string } {
  const date = new Date(dateString);
  const dateFormatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeFormatted = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { date: dateFormatted, time: timeFormatted };
}

function EventCard({ event }: EventCardProps) {
  const { date, time } = formatEventDate(event.event_date);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden border border-border/50 py-0">
      <div className="relative w-full bg-muted">
        {event.image_url && !imageError ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-auto object-cover"
            style={{ maxHeight: "250px", minHeight: "180px" }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-[180px] bg-muted flex items-center justify-center">
            <Calendar className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="p-4 pt-4">
        <h3 className="font-semibold text-foreground text-lg mb-3">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>
            {date}-{time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{event.location}</span>
        </div>
        <Button
          variant={event.cta_variant as "default" | "secondary"}
          className="w-full"
        >
          {event.cta_text}
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
        8
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface EventsClientProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsClient({
  upcomingEvents,
  pastEvents,
}: EventsClientProps) {
  return (
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
        {upcomingEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {upcomingEvents.length > 6 && <Pagination />}
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No upcoming events at the moment. Check back soon!
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="past">
        {pastEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {pastEvents.length > 6 && <Pagination />}
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No past events to display.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

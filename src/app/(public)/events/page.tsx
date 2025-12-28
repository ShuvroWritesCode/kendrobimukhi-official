import { createClient } from "@/lib/supabase/server";
import EventsClient from "@/components/events/EventsClient";
import type { Event } from "@/types/database";

export default async function EventsPage() {
  const supabase = await createClient();

  // Fetch all events ordered by date
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
  }

  // Separate into upcoming and past events based on current date
  const now = new Date();
  const upcomingEvents: Event[] = [];
  const pastEvents: Event[] = [];

  (events ?? []).forEach((event: Event) => {
    const eventDate = new Date(event.event_date);
    if (eventDate >= now) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  // Sort past events in descending order (most recent first)
  pastEvents.sort(
    (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );

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
              Connect with our community through our upcoming events.
            </p>
          </div>

          {/* Events Tabs */}
          <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        </div>
      </section>
    </div>
  );
}

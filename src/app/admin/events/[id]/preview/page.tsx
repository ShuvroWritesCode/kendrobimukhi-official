import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

interface PreviewEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function PreviewEventPage({ params }: PreviewEventPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select(`
      *,
      category:event_categories(id, name, slug)
    `)
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = new Date(event.event_date) >= new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Preview</h1>
        </div>
        <Link href={`/admin/events/${id}`}>
          <Button variant="outline">Edit Event</Button>
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          This is a preview of how the event will appear on the public website.
        </p>
      </div>

      {/* Event Preview Card */}
      <div className="bg-white rounded-lg border overflow-hidden max-w-2xl">
        {event.image_url && (
          <div className="relative h-64 w-full">
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {isUpcoming ? (
              <Badge className="bg-green-100 text-green-700">Upcoming</Badge>
            ) : (
              <Badge variant="secondary">Past Event</Badge>
            )}
            {event.is_featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
            {event.category && (
              <Badge variant="outline">{event.category.name}</Badge>
            )}
          </div>

          <h2 className="text-2xl font-bold">{event.title}</h2>

          <div className="space-y-2 text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.event_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {event.description && (
            <p className="text-slate-600">{event.description}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant={event.cta_variant === "secondary" ? "secondary" : "default"}>
              {event.cta_text}
            </Button>
            {event.registration_link && (
              <Button variant="outline" asChild>
                <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                  Register
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

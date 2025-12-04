import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { EventWithCategory } from "@/types/database";
import { DeleteEventButton } from "./DeleteEventButton";

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select(`
      *,
      category:event_categories(id, name, slug)
    `)
    .order("event_date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-600 mt-1">Manage your events</p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </Link>
      </div>

      {events && events.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {(events as EventWithCategory[]).map((event) => (
                <tr key={event.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.title}</span>
                      {event.is_featured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatDate(event.event_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {event.location}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {event.category ? (
                      <Badge variant="outline">{event.category.name}</Badge>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isUpcoming(event.event_date) ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Upcoming
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Past</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/events/${event.id}/preview`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/events/${event.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-slate-500 mb-4">No events found</p>
          <Link href="/admin/events/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create your first event
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/admin/EventForm";

export default async function NewEventPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("event_categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Event</h1>
        <p className="text-slate-600 mt-1">Add a new event to the website</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <EventForm categories={categories || []} />
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  const { data: categories } = await supabase
    .from("event_categories")
    .select("*")
    .order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Event</h1>
        <p className="text-slate-600 mt-1">Update event details</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <EventForm event={event} categories={categories || []} />
      </div>
    </div>
  );
}

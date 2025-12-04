import { createClient } from "@/lib/supabase/server";
import { AuthorForm } from "@/components/admin/AuthorForm";
import { notFound } from "next/navigation";

interface EditAuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: author, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !author) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Author</h1>
        <p className="text-slate-600 mt-1">Update author details</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <AuthorForm author={author} />
      </div>
    </div>
  );
}

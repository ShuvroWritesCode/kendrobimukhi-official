import { AuthorForm } from "@/components/admin/AuthorForm";

export default function NewAuthorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create Author</h1>
        <p className="text-slate-600 mt-1">Add a new author for blogs</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <AuthorForm />
      </div>
    </div>
  );
}

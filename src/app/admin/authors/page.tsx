import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteAuthorButton } from "./DeleteAuthorButton";

export default async function AuthorsPage() {
  const supabase = await createClient();

  const { data: authors, error } = await supabase
    .from("authors")
    .select("*")
    .order("fullname");

  if (error) {
    console.error("Error fetching authors:", error);
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Authors</h1>
          <p className="text-slate-600 mt-1">Manage blog authors</p>
        </div>
        <Link href="/admin/authors/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Author
          </Button>
        </Link>
      </div>

      {authors && authors.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Author
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Institution
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">
                  Date of Birth
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {authors.map((author) => (
                <tr key={author.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={author.image_url || undefined} alt={author.fullname} />
                        <AvatarFallback>{getInitials(author.fullname)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{author.fullname}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {author.institution || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatDate(author.dob)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/authors/${author.id}`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteAuthorButton authorId={author.id} authorName={author.fullname} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-slate-500 mb-4">No authors found</p>
          <Link href="/admin/authors/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create your first author
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

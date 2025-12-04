"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CategoryFormProps {
  type: "blog" | "event";
  onSuccess?: () => void;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CategoryForm({ type, onSuccess }: CategoryFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const table = type === "blog" ? "categories" : "event_categories";
      const slug = generateSlug(name);

      const { error: insertError } = await supabase.from(table).insert({
        name: name.trim(),
        slug,
      });

      if (insertError) throw insertError;

      setName("");
      router.refresh();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor={`${type}-name`} className="sr-only">
            Category Name
          </Label>
          <Input
            id={`${type}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`New ${type} category name`}
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !name.trim()}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </div>
    </form>
  );
}

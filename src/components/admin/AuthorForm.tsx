"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { Author } from "@/types/database";

const authorSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  institution: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  dob: z.string().optional(),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

interface AuthorFormProps {
  author?: Author;
}

export function AuthorForm({ author }: AuthorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      fullname: author?.fullname || "",
      institution: author?.institution || "",
      image_url: author?.image_url || "",
      dob: author?.dob || "",
    },
  });

  const onSubmit = async (data: AuthorFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const authorData = {
        fullname: data.fullname,
        institution: data.institution || null,
        image_url: data.image_url || null,
        dob: data.dob || null,
      };

      if (author) {
        const { error: updateError } = await supabase
          .from("authors")
          .update(authorData)
          .eq("id", author.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("authors")
          .insert(authorData);

        if (insertError) throw insertError;
      }

      router.push("/admin/authors");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullname">Full Name *</Label>
        <Input
          id="fullname"
          {...register("fullname")}
          placeholder="Enter author's full name"
          disabled={loading}
        />
        {errors.fullname && (
          <p className="text-sm text-red-600">{errors.fullname.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input
          id="institution"
          {...register("institution")}
          placeholder="Enter institution or organization"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Profile Image URL</Label>
        <Input
          id="image_url"
          {...register("image_url")}
          placeholder="https://example.com/profile.jpg"
          disabled={loading}
        />
        {errors.image_url && (
          <p className="text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          {...register("dob")}
          disabled={loading}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {author ? "Updating..." : "Creating..."}
            </>
          ) : author ? (
            "Update Author"
          ) : (
            "Create Author"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/authors")}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

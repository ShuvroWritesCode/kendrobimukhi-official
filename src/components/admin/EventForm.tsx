"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Event, EventCategory } from "@/types/database";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  event_date: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  cta_text: z.string(),
  cta_variant: z.enum(["default", "secondary"]),
  is_featured: z.boolean(),
  registration_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  category_id: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Event;
  categories: EventCategory[];
}

export function EventForm({ event, categories }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      event_date: event?.event_date
        ? new Date(event.event_date).toISOString().slice(0, 16)
        : "",
      location: event?.location || "",
      image_url: event?.image_url || "",
      cta_text: event?.cta_text || "Learn More",
      cta_variant: event?.cta_variant || "default",
      is_featured: event?.is_featured || false,
      registration_link: event?.registration_link || "",
      category_id: event?.category_id || "",
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        title: data.title,
        description: data.description || null,
        event_date: new Date(data.event_date).toISOString(),
        location: data.location,
        image_url: data.image_url || null,
        cta_text: data.cta_text,
        cta_variant: data.cta_variant,
        is_featured: data.is_featured,
        registration_link: data.registration_link || null,
        category_id: data.category_id || null,
      };

      if (event) {
        // Update existing event
        const { error: updateError } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", event.id);

        if (updateError) throw updateError;
      } else {
        // Create new event
        const { error: insertError } = await supabase
          .from("events")
          .insert(eventData);

        if (insertError) throw insertError;
      }

      router.push("/admin/events");
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
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter event title"
          disabled={loading}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter event description"
          rows={4}
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event_date">Event Date & Time *</Label>
          <Input
            id="event_date"
            type="datetime-local"
            {...register("event_date")}
            disabled={loading}
          />
          {errors.event_date && (
            <p className="text-sm text-red-600">{errors.event_date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="Enter event location"
            disabled={loading}
          />
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category_id">Category</Label>
        <Select
          value={watch("category_id") || "none"}
          onValueChange={(value) => setValue("category_id", value === "none" ? "" : value)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          {...register("image_url")}
          placeholder="https://example.com/image.jpg"
          disabled={loading}
        />
        {errors.image_url && (
          <p className="text-sm text-red-600">{errors.image_url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="registration_link">Registration Link</Label>
        <Input
          id="registration_link"
          {...register("registration_link")}
          placeholder="https://example.com/register"
          disabled={loading}
        />
        {errors.registration_link && (
          <p className="text-sm text-red-600">{errors.registration_link.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cta_text">CTA Button Text</Label>
          <Input
            id="cta_text"
            {...register("cta_text")}
            placeholder="Learn More"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta_variant">CTA Button Style</Label>
          <Select
            value={watch("cta_variant")}
            onValueChange={(value: "default" | "secondary") =>
              setValue("cta_variant", value)
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_featured"
          {...register("is_featured")}
          className="h-4 w-4 rounded border-gray-300"
          disabled={loading}
        />
        <Label htmlFor="is_featured" className="font-normal">
          Featured event (shown prominently on the website)
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {event ? "Updating..." : "Creating..."}
            </>
          ) : event ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/events")}
          disabled={loading}
        >
          Cancel
        </Button>
        {event && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/events/${event.id}/preview`)}
            disabled={loading}
          >
            Preview
          </Button>
        )}
      </div>
    </form>
  );
}

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing!");
    console.error("URL:", supabaseUrl ? "Defined" : "Undefined");
    console.error("Key:", supabaseKey ? "Defined" : "Undefined");
  }

  return createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  );
}

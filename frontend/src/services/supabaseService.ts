import { createClient } from "@supabase/supabase-js";

let supabase: ReturnType<typeof createClient> | null = null;

export async function initializeSupabase() {
  if (supabase) return supabase;

  const API_URL = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_PRD
    : import.meta.env.VITE_API_URL_DEV;

  try {
    const response = await fetch(`${API_URL}/auth/session`);
    const { session } = await response.json();

    if (!session) {
      throw new Error("No session available");
    }

    supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      }
    );
    return supabase;
  } catch (error) {
    console.error("Error initializing Supabase:", error);
    throw error;
  }
}

export function getSupabase() {
  if (!supabase) {
    throw new Error("Supabase not initialized. Call initializeSupabase first.");
  }
  return supabase;
} 
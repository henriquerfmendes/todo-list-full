import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log("Response from forgot-password:", data);
    if (data.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: data.error || "Failed to send reset link.",
      };
    }
  } catch {
    return { success: false, error: "Failed to send reset link." };
  }
}

export async function resetPassword(
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error("Error: ", error);
    return { success: false, error: "Failed to reset password." };
  }
}

import { getSupabase } from "./supabaseService";

export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const API_URL = import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRD
      : import.meta.env.VITE_API_URL_DEV;

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
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
    const supabase = getSupabase();
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

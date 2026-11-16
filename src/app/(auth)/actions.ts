"use server";

import { redirect } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/redirect";
import { loginSchema, registerSchema } from "@/lib/schemas/auth";
import { createClient } from "@/lib/supabase/server";

export type AuthResult = { error: string } | { message: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function login(
  input: unknown,
  next?: string,
): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Please check your details and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      error:
        error.code === "invalid_credentials"
          ? "Incorrect email or password."
          : GENERIC_ERROR,
    };
  }

  redirect(getSafeRedirectPath(next));
}

export async function register(
  input: unknown,
  next?: string,
): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Please check your details and try again." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    if (error.code === "user_already_exists") {
      return { error: "This email is already registered. Try logging in." };
    }
    if (error.code === "weak_password") {
      return { error: error.message };
    }
    return { error: GENERIC_ERROR };
  }

  // With "Confirm email" turned off, signing up also signs the user in.
  if (!data.session) {
    return {
      message:
        "Account created. Check your email to confirm your address, then log in.",
    };
  }

  redirect(getSafeRedirectPath(next));
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
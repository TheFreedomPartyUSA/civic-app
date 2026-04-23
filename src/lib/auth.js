import { supabase } from "./supabase";

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function logout() {
  await supabase.auth.signOut();
}
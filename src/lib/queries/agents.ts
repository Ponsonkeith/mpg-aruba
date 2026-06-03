import { createClient } from "@/lib/supabase/server";
import type { Agent } from "@/types";

export async function getAgents(): Promise<Agent[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error) throw error;
    return (data ?? []) as Agent[];
  } catch {
    return [];
  }
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    if (error) throw error;
    return data as Agent;
  } catch {
    return null;
  }
}

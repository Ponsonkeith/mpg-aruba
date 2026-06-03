import { createClient } from "@/lib/supabase/server";
import type { Neighborhood } from "@/types";

export async function getNeighborhoods(featuredOnly = false): Promise<Neighborhood[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("neighborhoods")
      .select("*")
      .order("sort_order");

    if (featuredOnly) query = query.eq("is_featured", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Neighborhood[];
  } catch {
    return [];
  }
}

export async function getNeighborhoodBySlug(slug: string): Promise<Neighborhood | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("neighborhoods")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data as Neighborhood;
  } catch {
    return null;
  }
}

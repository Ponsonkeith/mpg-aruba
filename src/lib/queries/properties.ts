import { createClient } from "@/lib/supabase/server";
import type { PropertyListing, SearchFilters } from "@/types";

/**
 * Fetch active listings from the active_listings view.
 * Falls back to sample data if Supabase env vars are not configured.
 */
export async function getActiveListings(
  filters: SearchFilters = {},
  limit = 12,
  offset = 0
): Promise<{ data: PropertyListing[]; count: number; error: string | null }> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("active_listings")
      .select("*", { count: "exact" });

    // Contract type
    if (filters.contract_type) {
      query = query.eq("contract_type", filters.contract_type);
    }

    // Property type
    if (filters.property_type) {
      query = query.eq("property_type", filters.property_type);
    }

    // Neighborhood
    if (filters.neighborhood_id) {
      query = query.eq("neighborhood_id", filters.neighborhood_id);
    }

    // Price range â€” always sort numerically, never hardcode
    if (filters.price_min) {
      query = query.gte("price_usd", filters.price_min);
    }
    if (filters.price_max) {
      query = query.lte("price_usd", filters.price_max);
    }

    // Bedrooms
    if (filters.bedrooms_min) {
      query = query.gte("bedrooms", filters.bedrooms_min);
    }

    // Bathrooms
    if (filters.bathrooms_min) {
      query = query.gte("bathrooms", filters.bathrooms_min);
    }

    // Boolean flags
    if (filters.pool)        query = query.eq("pool", true);
    if (filters.ocean_view)  query = query.eq("ocean_view", true);
    if (filters.beachfront)  query = query.eq("beachfront", true);
    if (filters.furnished)   query = query.eq("furnished", true);
    if (filters.is_featured) query = query.eq("is_featured", true);
    if (filters.is_luxury)   query = query.eq("is_luxury", true);
    if (filters.is_investment) query = query.eq("is_investment", true);

    // Land type
    if (filters.land_type) {
      query = query.eq("land_type", filters.land_type);
    }

    // Full-text search
    if (filters.query) {
      query = query.textSearch("fts", filters.query, {
        type: "websearch",
        config: "english",
      });
    }

    // Pagination + ordering
    query = query
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      data: (data ?? []) as PropertyListing[],
      count: count ?? 0,
      error: null,
    };
  } catch (err) {
    console.error("[getActiveListings]", err);
    return { data: [], count: 0, error: String(err) };
  }
}

/**
 * Fetch a single property by slug for the detail page.
 */
export async function getPropertyBySlug(slug: string): Promise<PropertyListing | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("active_listings")
      .select("*")
      .eq("slug", slug).limit(1).maybeSingle();

    if (error) throw error;
    return data as PropertyListing;
  } catch (err) {
    console.error("[getPropertyBySlug]", err);
    return null;
  }
}

/**
 * Fetch featured + luxury listings for the homepage.
 */
export async function getFeaturedListings(limit = 6): Promise<PropertyListing[]> {
  const { data } = await getActiveListings({ is_featured: true }, limit);
  if (data.length >= 3) return data;
  // Fall back to any active listings if not enough featured ones
  const { data: all } = await getActiveListings({}, limit);
  return all;
}

/**
 * Fetch new listings for the homepage "just listed" section.
 */
export async function getNewListings(limit = 3): Promise<PropertyListing[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("active_listings")
      .select("*")
      .eq("is_new", true)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as PropertyListing[];
  } catch {
    return [];
  }
}

/**
 * Fetch all property slugs for static generation.
 */
export async function getAllPropertySlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select("slug")
      .not("published_at", "is", null)
      .in("status", ["active", "featured", "new", "under_contract"]);

    if (error) throw error;
    return (data ?? []).map((r: { slug: string }) => r.slug);
  } catch {
    return [];
  }
}

/**
 * Insert a lead from any public CTA form.
 * Uses anon client â€” RLS allows anon insert on leads.
 */
export async function insertLead(lead: {
  full_name: string;
  email?: string;
  phone?: string;
  contact_preference?: string;
  intent?: string;
  message?: string;
  preferred_viewing_date?: string;
  newsletter_opt_in?: boolean;
  consent_given: boolean;
  property_id?: string;
  agent_id?: string;
  cta_source: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  session_id?: string;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    console.error("[insertLead]", err);
    return { success: false, error: String(err) };
  }
}

/**
 * Track an analytics event (property view, WhatsApp click, etc.)
 * Fire-and-forget â€” never blocks the UI.
 */
export async function trackEvent(event: {
  event_type: string;
  property_id?: string;
  session_id?: string;
  page_url?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.from("analytics_events").insert(event);
  } catch {
    // Silent â€” analytics must never break the user experience
  }
}


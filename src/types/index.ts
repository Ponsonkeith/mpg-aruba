// MPG Aruba — Application Types
// These mirror the Supabase schema. Run `supabase gen types` to get full DB types.

export type ContractType = "sale" | "rent" | "lease";
export type PropertyType = "residential" | "villa" | "condominium" | "commercial" | "land" | "lease_land";
export type PropertyStatus = "active" | "featured" | "new" | "under_contract" | "sold" | "rented" | "draft" | "archived";
export type LandType = "freehold" | "long_lease" | "property_land";
export type LeadIntent = "buyer" | "renter" | "seller" | "investor" | "general_inquiry";
export type LeadStatus = "new" | "contacted" | "qualified" | "viewing_scheduled" | "offer_made" | "closed" | "lost" | "spam";

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  cover_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  is_featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
}

export interface Agent {
  id: string;
  full_name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  phone_aruba: string | null;
  whatsapp: string | null;
  email: string | null;
  languages: string[] | null;
  specialties: string[] | null;
}

export interface PropertyListing {
  id: string;
  title: string;
  slug: string;
  contract_type: ContractType;
  property_type: PropertyType;
  status: PropertyStatus;
  price_usd: number | null;
  price_awg: number | null;
  price_on_request: boolean;
  bedrooms: number | null;
  bathrooms: number | null;
  lot_size_m2: number | null;
  lot_size_ft2: number | null;
  build_area_m2: number | null;
  build_area_ft2: number | null;
  land_type: LandType | null;
  pool: boolean;
  ocean_view: boolean;
  beachfront: boolean;
  furnished: boolean;
  primary_image_url: string | null;
  location_text: string | null;
  is_featured: boolean;
  is_luxury: boolean;
  is_new: boolean;
  is_investment: boolean;
  published_at: string | null;
  neighborhood_name: string | null;
  neighborhood_slug: string | null;
  agent_name: string | null;
  agent_photo: string | null;
  agent_whatsapp: string | null;
  agent_phone: string | null;
}

export interface PropertyDetail extends PropertyListing {
  reference_number: string | null;
  summary: string | null;
  rewritten_description: string | null;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  commercial_use: boolean;
  development_opportunity: boolean;
  hoa_applicable: boolean;
  vacation_rental_allowed: boolean | null;
  seo_title: string | null;
  seo_description: string | null;
  floor_count: number | null;
  garage_spaces: number | null;
  year_built: number | null;
}

export interface SearchFilters {
  contract_type?: ContractType;
  property_type?: PropertyType;
  neighborhood_id?: string;
  price_min?: number;
  price_max?: number;
  bedrooms_min?: number;
  bathrooms_min?: number;
  pool?: boolean;
  ocean_view?: boolean;
  beachfront?: boolean;
  furnished?: boolean;
  land_type?: LandType;
  is_featured?: boolean;
  is_luxury?: boolean;
  is_investment?: boolean;
  query?: string;
}

export interface LeadFormData {
  full_name: string;
  email?: string;
  phone?: string;
  contact_preference: "whatsapp" | "email" | "phone" | "any";
  intent: LeadIntent;
  message?: string;
  preferred_viewing_date?: string;
  newsletter_opt_in: boolean;
  consent_given: boolean;
  property_id?: string;
  cta_source: string;
}

// Sample data shape for development
export interface SampleProperty extends PropertyListing {
  _isSample: true;
}

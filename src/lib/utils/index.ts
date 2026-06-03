import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceUSD(amount: number | null | undefined): string {
  if (amount == null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceAWG(amount: number | null | undefined): string {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount) + " AWG";
}

export function formatArea(
  m2: number | null | undefined,
  ft2: number | null | undefined
): string | null {
  // Never show 0. Return null — caller hides the row entirely.
  if ((!m2 || m2 <= 0) && (!ft2 || ft2 <= 0)) return null;
  const parts: string[] = [];
  if (m2 && m2 > 0) parts.push(`${m2.toLocaleString()} m²`);
  if (ft2 && ft2 > 0) parts.push(`${ft2.toLocaleString()} ft²`);
  return parts.join(" · ") || null;
}

export function whatsappUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2975934647";
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatBaths(baths: number | null | undefined): string | null {
  if (baths == null) return null;
  // 2.0 → "2", 2.5 → "2.5"
  return baths % 1 === 0 ? String(Math.floor(baths)) : String(baths);
}

export function propertyWhatsappMessage(title: string, slug: string): string {
  return `Hi MPG Aruba, I am interested in the property: ${title}. Can you send me more information?\nhttps://mpgaruba.com/properties/${slug}`;
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Share2, MessageCircle, Eye, Award, Sparkles } from "lucide-react";
import { cn, formatPriceUSD, formatPriceAWG, formatArea, formatBaths, propertyWhatsappMessage } from "@/lib/utils";
import type { PropertyListing } from "@/types";

interface PropertyCardProps {
  property: PropertyListing;
  className?: string;
  variant?: "default" | "compact" | "map-preview";
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  featured:       { label: "Featured",        className: "bg-gold-500 text-white" },
  new:            { label: "New",              className: "bg-navy-900 text-white" },
  under_contract: { label: "Under Contract",   className: "bg-amber-500 text-white" },
  active:         { label: "",                 className: "" },
};

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  villa:       "Villa",
  condominium: "Condominium",
  commercial:  "Commercial",
  land:        "Land",
  lease_land:  "Lease Land",
};

const LAND_LABELS: Record<string, string> = {
  freehold:      "Freehold",
  long_lease:    "Long Lease",
  property_land: "Property Land",
};

export function PropertyCard({ property, className, variant = "default" }: PropertyCardProps) {
  const statusInfo = STATUS_LABELS[property.status] ?? { label: "", className: "" };
  const lotArea    = formatArea(property.lot_size_m2, property.lot_size_ft2);
  const buildArea  = formatArea(property.build_area_m2, property.build_area_ft2);
  const baths      = formatBaths(property.bathrooms);
  const isRent     = property.contract_type === "rent";

  return (
    <article
      className={cn(
        "group relative bg-white rounded-3xl overflow-hidden border border-navy-100 shadow-luxury hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1",
        variant === "compact" && "rounded-2xl",
        className
      )}
    >
      {/* Image container */}
      <Link href={`/properties/${property.slug}`} className="block relative overflow-hidden">
        <div className={cn(
          "relative bg-navy-100",
          variant === "compact" ? "h-44" : "h-56 sm:h-64"
        )}>
          {property.primary_image_url ? (
            <Image
              src={property.primary_image_url}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
              <span className="text-navy-400 text-sm font-medium">No image available</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {statusInfo.label && (
              <span className={cn("text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full", statusInfo.className)}>
                {statusInfo.label}
              </span>
            )}
            {property.is_luxury && (
              <span className="flex items-center gap-1 text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500 text-white">
                <Award className="w-2.5 h-2.5" />Luxury
              </span>
            )}
            {property.is_new && !property.is_luxury && (
              <span className="flex items-center gap-1 text-2xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-900 text-white">
                <Sparkles className="w-2.5 h-2.5" />New
              </span>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={(e) => { e.preventDefault(); /* TODO: save to state/storage */ }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-400 hover:text-gold-500 hover:bg-white transition-all shadow-sm"
            aria-label="Save property"
          >
            <Heart className="w-4 h-4" strokeWidth={1.75} />
          </button>

          {/* Contract type pill */}
          <div className="absolute bottom-3 left-3">
            <span className="text-2xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-navy-800">
              {isRent ? "For Rent" : "For Sale"}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-2xs text-navy-400 font-semibold uppercase tracking-wider mb-2">
          <span>{property.neighborhood_name ?? property.location_text}</span>
          <span className="text-navy-200">·</span>
          <span>{TYPE_LABELS[property.property_type]}</span>
          {property.land_type && (
            <>
              <span className="text-navy-200">·</span>
              <span>{LAND_LABELS[property.land_type]}</span>
            </>
          )}
        </div>

        {/* Title */}
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-display text-navy-900 font-semibold text-base sm:text-lg leading-snug mb-3 hover:text-navy-700 transition-colors line-clamp-2">
            {property.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-4">
          <div className="text-xl sm:text-2xl font-bold text-navy-900 font-display tracking-tight">
            {property.price_on_request
              ? "Price on Request"
              : formatPriceUSD(property.price_usd)}
            {isRent && !property.price_on_request && (
              <span className="text-sm font-body font-normal text-navy-400 ml-1">/mo</span>
            )}
          </div>
          {property.price_awg && !property.price_on_request && (
            <div className="text-sm text-navy-400 font-medium mt-0.5">
              {formatPriceAWG(property.price_awg)}{isRent ? "/mo" : ""}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-600 mb-4 pb-4 border-b border-navy-50">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <span className="font-semibold text-navy-800">{property.bedrooms}</span>
              <span className="text-navy-400">{property.bedrooms === 1 ? "Bed" : "Beds"}</span>
            </span>
          )}
          {baths && (
            <span className="flex items-center gap-1">
              <span className="font-semibold text-navy-800">{baths}</span>
              <span className="text-navy-400">{property.bathrooms === 1 ? "Bath" : "Baths"}</span>
            </span>
          )}
          {property.pool && (
            <span className="text-navy-400">Pool</span>
          )}
          {property.ocean_view && (
            <span className="text-navy-400">Ocean View</span>
          )}
          {property.beachfront && (
            <span className="text-navy-400">Beachfront</span>
          )}
        </div>

        {/* Lot / Build area — only shown if data exists, never shows 0 */}
        {(lotArea || buildArea) && (
          <div className="flex flex-wrap gap-4 text-xs text-navy-500 mb-4">
            {lotArea && (
              <span>
                <span className="text-navy-400">Lot · </span>
                {lotArea}
              </span>
            )}
            {buildArea && (
              <span>
                <span className="text-navy-400">Build · </span>
                {buildArea}
              </span>
            )}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${property.agent_whatsapp ?? "2975934647"}?text=${encodeURIComponent(propertyWhatsappMessage(property.title, property.slug))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-navy-50 text-navy-800 text-sm font-semibold rounded-xl hover:bg-navy-100 transition-colors"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
          <button
            onClick={() => navigator.share?.({ title: property.title, url: `/properties/${property.slug}` })}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-navy-50 text-navy-500 hover:bg-navy-100 hover:text-navy-800 transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

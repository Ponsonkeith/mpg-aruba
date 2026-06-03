"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCATIONS = [
  "Palm Beach", "Malmok", "Eagle Beach", "Noord",
  "Oranjestad", "Tierra del Sol", "Savaneta", "Tanki Leendert",
  "Santa Cruz", "San Nicolas", "Paradera",
];

export function HeroSearch() {
  const router = useRouter();
  const [mode, setMode]         = useState<"sale" | "rent">("sale");
  const [location, setLocation] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [beds, setBeds]         = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("contract_type", mode);
    if (location) params.set("neighborhood", location);
    if (priceMax)  params.set("price_max", priceMax);
    if (beds)      params.set("bedrooms_min", beds);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-3xl">
      {/* Buy / Rent toggle */}
      <div className="flex mb-4">
        {(["sale", "rent"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "px-6 py-2.5 text-sm font-bold rounded-t-xl transition-all",
              mode === m
                ? "bg-white text-navy-900"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            )}
          >
            {m === "sale" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-luxury-xl p-2 flex flex-col sm:flex-row gap-2">
        {/* Location */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-8 py-3 text-sm text-navy-800 bg-transparent appearance-none focus:outline-none cursor-pointer"
          >
            <option value="">Any location</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300 pointer-events-none" />
        </div>

        <div className="w-px bg-navy-100 hidden sm:block" />

        {/* Price */}
        <div className="relative">
          <select
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full sm:w-44 px-3 py-3 text-sm text-navy-800 bg-transparent appearance-none focus:outline-none cursor-pointer"
          >
            <option value="">Max price</option>
            {mode === "sale" ? (
              <>
                <option value="200000">$200,000</option>
                <option value="400000">$400,000</option>
                <option value="600000">$600,000</option>
                <option value="800000">$800,000</option>
                <option value="1000000">$1,000,000</option>
                <option value="1500000">$1,500,000</option>
                <option value="2000000">$2,000,000</option>
                <option value="3000000">$3,000,000</option>
                <option value="5000000">$5,000,000+</option>
              </>
            ) : (
              <>
                <option value="1000">$1,000/mo</option>
                <option value="1500">$1,500/mo</option>
                <option value="2000">$2,000/mo</option>
                <option value="3000">$3,000/mo</option>
                <option value="5000">$5,000/mo</option>
              </>
            )}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300 pointer-events-none" />
        </div>

        <div className="w-px bg-navy-100 hidden sm:block" />

        {/* Beds */}
        <div className="relative">
          <select
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="w-full sm:w-32 px-3 py-3 text-sm text-navy-800 bg-transparent appearance-none focus:outline-none cursor-pointer"
          >
            <option value="">Any beds</option>
            <option value="1">1+ beds</option>
            <option value="2">2+ beds</option>
            <option value="3">3+ beds</option>
            <option value="4">4+ beds</option>
            <option value="5">5+ beds</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300 pointer-events-none" />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 text-white text-sm font-bold rounded-xl hover:bg-navy-800 transition-colors shrink-0"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["Luxury Villas", "Beachfront", "Investment", "Map Search"].map((label) => (
          <button
            key={label}
            onClick={() => router.push(
              label === "Map Search" ? "/map"
              : label === "Luxury Villas" ? "/buy?type=villa&is_luxury=true"
              : label === "Beachfront" ? "/buy?beachfront=true"
              : "/buy?is_investment=true"
            )}
            className="px-4 py-1.5 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full hover:bg-white/25 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

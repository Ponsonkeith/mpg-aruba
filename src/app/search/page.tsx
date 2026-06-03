import Link from "next/link";
import { Map } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getActiveListings } from "@/lib/queries/properties";
import { getNeighborhoods } from "@/lib/queries/neighborhoods";
import { SAMPLE_PROPERTIES } from "@/lib/sample-data";
import type { SearchFilters, ContractType, PropertyType } from "@/types";

export const revalidate = 60;

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props) {
  const p = await searchParams;
  const type = p.contract_type === "rent" ? "Rent" : "Buy";
  return { title: `${type} Property in Aruba` };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters: SearchFilters = {
    contract_type:  (params.contract_type as ContractType) || undefined,
    property_type:  (params.property_type as PropertyType) || undefined,
    neighborhood_id: params.neighborhood_id || undefined,
    price_min:      params.price_min  ? Number(params.price_min)  : undefined,
    price_max:      params.price_max  ? Number(params.price_max)  : undefined,
    bedrooms_min:   params.bedrooms_min ? Number(params.bedrooms_min) : undefined,
    pool:           params.pool === "true"       || undefined,
    ocean_view:     params.ocean_view === "true" || undefined,
    beachfront:     params.beachfront === "true" || undefined,
    is_featured:    params.is_featured === "true" || undefined,
    is_luxury:      params.is_luxury === "true"  || undefined,
    is_investment:  params.is_investment === "true" || undefined,
    query:          params.q || undefined,
  };

  const [{ data: liveResults, count }, neighborhoods] = await Promise.all([
    getActiveListings(filters, 24),
    getNeighborhoods(),
  ]);

  const results     = liveResults.length > 0 ? liveResults : SAMPLE_PROPERTIES;
  const isLiveData  = liveResults.length > 0;
  const displayCount = isLiveData ? count : SAMPLE_PROPERTIES.length;
  const isRent = params.contract_type === "rent";

  return (
    <div>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#081520,#162636)",borderBottom:"1px solid rgba(201,151,63,.12)"}}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 pt-8 pb-0">
          <h1 className="font-display text-white mb-1" style={{fontSize:"32px",fontWeight:600}}>
            {isRent ? "Properties for Rent" : params.contract_type ? "Properties for Sale" : "Property Search"}
          </h1>
          <p className="text-xs mb-5" style={{color:"rgba(255,255,255,.35)"}}>
            {!isLiveData && "Sample data · "}
            {displayCount} {displayCount === 1 ? "property" : "properties"} found
          </p>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap pb-4 overflow-x-auto">
            {[
              { label: "All",       href: "/search" },
              { label: "For Sale",  href: "/search?contract_type=sale" },
              { label: "For Rent",  href: "/search?contract_type=rent" },
              { label: "Luxury",    href: "/search?is_luxury=true" },
              { label: "Investment",href: "/search?is_investment=true" },
              { label: "Pool",      href: "/search?pool=true" },
              { label: "Ocean View",href: "/search?ocean_view=true" },
              { label: "Beachfront",href: "/search?beachfront=true" },
            ].map(chip => {
              const isActive = chip.href === "/search"
                ? !params.contract_type && !params.is_luxury && !params.is_investment
                : chip.href.includes(new URLSearchParams(params).toString()) || chip.href.split("?")[1] === new URLSearchParams(params).toString();
              return (
                <Link key={chip.label} href={chip.href}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap"
                  style={isActive
                    ? {background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#081520",borderColor:"transparent"}
                    : {background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.55)",borderColor:"rgba(255,255,255,.1)"}
                  }>
                  {chip.label}
                </Link>
              );
            })}

            {/* Neighborhood filter */}
            {neighborhoods.slice(0,6).map(n => (
              <Link key={n.id}
                href={`/search?${new URLSearchParams({...params, neighborhood_id: n.id}).toString()}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap"
                style={params.neighborhood_id === n.id
                  ? {background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#081520",borderColor:"transparent"}
                  : {background:"rgba(255,255,255,.05)",color:"rgba(255,255,255,.55)",borderColor:"rgba(255,255,255,.1)"}
                }>
                {n.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Results bar */}
      <div className="bg-white border-b flex items-center justify-between px-6 lg:px-8 py-3" style={{borderColor:"#e4ddd0"}}>
        <span className="text-xs" style={{color:"#6b7c8d"}}>
          <strong style={{color:"#0d1f2d"}}>{displayCount}</strong> {displayCount === 1 ? "property" : "properties"}
          {!isLiveData && <span style={{color:"#c9973f"}}> · sample data</span>}
        </span>
        <div className="flex gap-2 items-center">
          <select className="text-xs border rounded-lg px-3 py-1.5 outline-none" style={{borderColor:"#e4ddd0",color:"#0d1f2d"}}>
            <option>Newest first</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
          <Link href="/map"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{background:"#0d1f2d",color:"#fff"}}>
            <Map className="w-3.5 h-3.5" />Map
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-8">
        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏝</div>
            <h2 className="font-display text-2xl font-semibold mb-2" style={{color:"#0d1f2d"}}>No properties found</h2>
            <p className="text-sm mb-6" style={{color:"#6b7c8d"}}>Try adjusting your filters or search a different area.</p>
            <Link href="/search" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{background:"linear-gradient(135deg,#c9973f,#a07828)"}}>
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {results.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

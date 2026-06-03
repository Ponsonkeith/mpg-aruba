import Link from "next/link";
import { Map, ArrowRight, Shield, Clock, Globe } from "lucide-react";
import { HeroSearch }    from "@/components/search/HeroSearch";
import { PropertyCard }  from "@/components/property/PropertyCard";
import { getFeaturedListings, getNewListings } from "@/lib/queries/properties";
import { getNeighborhoods } from "@/lib/queries/neighborhoods";
import { SAMPLE_PROPERTIES, SAMPLE_NEIGHBORHOODS } from "@/lib/sample-data";
import { whatsappUrl } from "@/lib/utils";

export const revalidate = 300; // revalidate every 5 minutes

export default async function HomePage() {
  // Fetch live data — falls back to sample data if Supabase not connected
  const [featuredRaw, newListingsRaw, neighborhoodsRaw] = await Promise.all([
    getFeaturedListings(6),
    getNewListings(3),
    getNeighborhoods(true),
  ]);

  const featured     = featuredRaw.length > 0     ? featuredRaw     : SAMPLE_PROPERTIES.filter(p => p.is_featured || p.is_luxury);
  const newListings  = newListingsRaw.length > 0  ? newListingsRaw  : SAMPLE_PROPERTIES.filter(p => p.is_new);
  const neighborhoods = neighborhoodsRaw.length > 0 ? neighborhoodsRaw : SAMPLE_NEIGHBORHOODS.filter(n => n.is_featured);

  const isLiveData = featuredRaw.length > 0;

  return (
    <>
      {/* ── DEV INDICATOR ── */}
      {!isLiveData && process.env.NODE_ENV === "development" && (
        <div style={{background:"#1a0a00",color:"#e8a030",padding:"6px 16px",textAlign:"center",fontSize:"11px",fontWeight:600}}>
          ⚠ Showing sample data — add Supabase env vars and run Phase 1 SQL to load live listings
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] flex items-end overflow-hidden" style={{background:"#081520"}}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage:"url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85')",opacity:.45}}
        />
        <div className="absolute inset-0" style={{background:"linear-gradient(170deg,rgba(8,21,32,.55) 0%,rgba(8,21,32,.2) 45%,rgba(8,21,32,.82) 100%)"}} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{background:"linear-gradient(90deg,transparent,#c9973f,#e8b85a,#c9973f,transparent)"}} />
        <div className="relative z-10 px-6 lg:px-8 pb-14 pt-20 max-w-screen-xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{background:"rgba(201,151,63,.15)",borderColor:"rgba(201,151,63,.3)",color:"#e8b85a",fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase"}}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:"#e8b85a"}} />
            Aruba Real Estate
          </div>
          <h1 className="font-display text-white mb-5" style={{fontSize:"clamp(42px,7vw,72px)",fontWeight:600,lineHeight:.9,letterSpacing:"-.02em"}}>
            Your Place<br />in <em style={{fontStyle:"italic",color:"#e8b85a"}}>Aruba</em><br />Starts Here.
          </h1>
          <p className="mb-8 max-w-xl" style={{color:"rgba(255,255,255,.65)",fontSize:"15px",lineHeight:1.7}}>
            Villas, condominiums, land, and commercial property across Aruba&apos;s finest neighborhoods. Expert guidance for local and international buyers.
          </p>
          <HeroSearch />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{background:"linear-gradient(90deg,#081520,#162636)",borderBottom:"1px solid rgba(201,151,63,.15)"}}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-5 flex flex-wrap gap-8">
          {[
            {icon: Shield, label: "Licensed Broker",    sub: "KVK H38301.0 · Aruba Chamber of Commerce"},
            {icon: Globe,  label: "International Reach", sub: "Serving buyers from the US, Europe & beyond"},
            {icon: Clock,  label: "Always Available",    sub: "WhatsApp · Call · Email · Open 24 Hours"},
          ].map(({icon: Icon, label, sub}) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(201,151,63,.12)",border:"1px solid rgba(201,151,63,.2)"}}>
                <Icon className="w-4 h-4" style={{color:"#c9973f"}} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs" style={{color:"rgba(255,255,255,.4)"}}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="py-14 lg:py-20 px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:"#c9973f",letterSpacing:".2em"}}>Featured Properties</p>
            <h2 className="font-display" style={{fontSize:"clamp(30px,4vw,44px)",fontWeight:600,color:"#0d1f2d",lineHeight:.95}}>
              Exceptional<br />Listings
            </h2>
          </div>
          <Link href="/search?is_featured=true"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold transition-colors group"
            style={{color:"#a07828"}}>
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {featured.slice(0,6).map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/search" className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-xl text-sm font-semibold transition-colors"
            style={{borderColor:"#e4ddd0",color:"#0d1f2d"}}>
            View all properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── MAP CTA ── */}
      <section style={{background:"linear-gradient(135deg,#081520 0%,#162636 100%)",borderTop:"1px solid rgba(201,151,63,.12)",borderBottom:"1px solid rgba(201,151,63,.12)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-60px",top:"-60px",width:"280px",height:"280px",borderRadius:"50%",border:"60px solid rgba(201,151,63,.05)"}} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:"#e8b85a",letterSpacing:".2em"}}>Explore the Island</p>
            <h2 className="font-display text-white mb-3" style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:600,lineHeight:1}}>Search by Map</h2>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:"14px",lineHeight:1.7,maxWidth:"440px"}}>
              Browse properties on an interactive map of Aruba. Price bubble markers, neighborhood overlays, and map/list split view.
            </p>
          </div>
          <Link href="/map"
            className="flex items-center gap-3 px-7 py-4 font-bold rounded-2xl transition-all shrink-0 group"
            style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#081520",fontSize:"14px"}}>
            <Map className="w-5 h-5" />
            Open Map Search
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── NEW LISTINGS ── */}
      {newListings.length > 0 && (
        <section className="py-14 lg:py-20 px-6 lg:px-8 max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:"#c9973f",letterSpacing:".2em"}}>Just Listed</p>
              <h2 className="font-display" style={{fontSize:"clamp(30px,4vw,44px)",fontWeight:600,color:"#0d1f2d",lineHeight:.95}}>New Arrivals</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {newListings.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>
      )}

      {/* ── NEIGHBORHOODS ── */}
      <section className="py-14 lg:py-20 px-6 lg:px-8" style={{background:"#f2ede4"}}>
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:"#c9973f",letterSpacing:".2em"}}>Explore Aruba</p>
          <h2 className="font-display mb-8" style={{fontSize:"clamp(30px,4vw,44px)",fontWeight:600,color:"#0d1f2d",lineHeight:.95}}>Neighborhood Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {neighborhoods.map(n => (
              <Link key={n.id} href={`/neighborhoods/${n.slug}`}
                className="relative rounded-2xl overflow-hidden group cursor-pointer flex items-end"
                style={{aspectRatio:"3/2",background:"#162636"}}>
                <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(8,21,32,.85) 0%,rgba(8,21,32,.1) 60%,transparent 100%)",zIndex:1}} />
                <div className="relative z-10 p-3">
                  <div className="font-display text-white font-semibold leading-tight group-hover:text-amber-200 transition-colors" style={{fontSize:"15px"}}>{n.name}</div>
                  {n.tagline && <div className="text-xs mt-0.5 line-clamp-1" style={{color:"rgba(255,255,255,.55)"}}>{n.tagline}</div>}
                </div>
              </Link>
            ))}
            <Link href="/neighborhoods"
              className="rounded-2xl flex items-center justify-center text-sm font-semibold transition-all group"
              style={{aspectRatio:"3/2",background:"#fff",border:"1px solid #e4ddd0",color:"#a07828"}}>
              All Areas <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOREIGN BUYERS ── */}
      <section className="py-16 px-6 lg:px-8 text-center" style={{background:"#faf8f3",borderTop:"1px solid #e4ddd0",borderBottom:"1px solid #e4ddd0"}}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:"#c9973f",letterSpacing:".2em"}}>International Buyers</p>
          <h2 className="font-display mb-5" style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:600,color:"#0d1f2d",lineHeight:1.05}}>
            Can Foreigners Buy<br />Property in Aruba?
          </h2>
          <p className="mb-8" style={{color:"#6b7c8d",fontSize:"15px",lineHeight:1.7}}>
            Yes — there are no restrictions on foreign ownership of Aruban real estate.
            MPG Aruba has guided hundreds of international buyers through the full purchase process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides/foreign-buyer"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#fff"}}>
              Read the Foreign Buyer Guide
            </Link>
            <a href={whatsappUrl("Hi MPG Aruba, I am an international buyer looking for property in Aruba.")}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 border rounded-xl font-semibold text-sm transition-all"
              style={{borderColor:"#0d1f2d",color:"#0d1f2d"}}>
              Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* ── SELL CTA ── */}
      <section className="py-16 px-6 lg:px-8" style={{background:"linear-gradient(135deg,#081520 0%,#0d1f2d 50%,#162636 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-80px",right:"-80px",width:"320px",height:"320px",borderRadius:"50%",border:"80px solid rgba(201,151,63,.05)"}} />
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,transparent,#c9973f,#e8b85a,#c9973f,transparent)"}} />
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:"#e8b85a",letterSpacing:".2em"}}>Property Owners</p>
            <h2 className="font-display text-white mb-4" style={{fontSize:"clamp(30px,4vw,46px)",fontWeight:600,lineHeight:.95}}>
              Ready to Sell<br />Your Aruba Property?
            </h2>
            <p className="mb-8" style={{color:"rgba(255,255,255,.5)",fontSize:"15px",lineHeight:1.7}}>
              Request a free valuation and let MPG Aruba handle the full sale — from pricing strategy through closing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sell"
                className="px-6 py-3 rounded-xl font-bold text-sm text-center transition-all"
                style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#081520"}}>
                Get a Free Valuation
              </Link>
              <a href={whatsappUrl("Hi MPG Aruba, I own a property and am thinking about selling. Can we talk?")}
                target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 border rounded-xl font-semibold text-sm text-center transition-all"
                style={{borderColor:"rgba(255,255,255,.2)",color:"#fff"}}>
                WhatsApp MPG
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

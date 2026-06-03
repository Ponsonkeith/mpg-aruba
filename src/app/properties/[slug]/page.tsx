import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Maximize, Phone, MessageCircle, Eye, Share2 } from "lucide-react";
import { getPropertyBySlug, getAllPropertySlugs } from "@/lib/queries/properties";
import { SAMPLE_PROPERTIES } from "@/lib/sample-data";
import { formatPriceUSD, formatPriceAWG, formatArea, formatBaths, propertyWhatsappMessage } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const live   = await getPropertyBySlug(slug);
  const prop   = live ?? SAMPLE_PROPERTIES.find(p => p.slug === slug);
  if (!prop) return { title: "Property Not Found" };
  return {
    title: prop.title,
    description: `${formatPriceUSD(prop.price_usd)} · ${prop.bedrooms ?? "–"} bed · ${prop.location_text} · MPG Aruba Real Estate`,
    openGraph: { images: prop.primary_image_url ? [prop.primary_image_url] : [] },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const live     = await getPropertyBySlug(slug);
  const property = live ?? SAMPLE_PROPERTIES.find(p => p.slug === slug);
  if (!property) notFound();

  const baths   = formatBaths(property.bathrooms);
  const lotArea = formatArea(property.lot_size_m2, property.lot_size_ft2);
  const bldArea = formatArea(property.build_area_m2, property.build_area_ft2);
  const waMsg   = propertyWhatsappMessage(property.title, property.slug);
  const waNumber= property.agent_whatsapp ?? "2975934647";
  const isRent  = property.contract_type === "rent";
  const isSample = !live;

  return (
    <div style={{background:"#faf8f3"}}>
      {/* Back */}
      <div className="bg-white border-b" style={{borderColor:"#e4ddd0"}}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <Link href="/search"
            className="inline-flex items-center gap-2 py-3 text-sm transition-colors"
            style={{color:"#6b7c8d"}}>
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative overflow-hidden" style={{height:"360px",background:"#162636"}}>
        {property.primary_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={property.primary_image_url} alt={property.title}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">No image available</div>
        )}
        <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(13,31,45,.45) 0%,transparent 45%)"}} />
        <div className="absolute bottom-4 left-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{background:"rgba(255,255,255,.94)",color:"#0d1f2d"}}>
            {isRent ? "For Rent" : "For Sale"}
          </span>
        </div>
        {isSample && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
            style={{background:"rgba(201,151,63,.9)",color:"#081520"}}>
            Sample listing
          </div>
        )}
        <button className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{background:"rgba(255,255,255,.9)"}}>
          <Share2 className="w-4 h-4" style={{color:"#0d1f2d"}} />
        </button>
      </div>

      {/* Layout */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-8">

          {/* Main */}
          <div className="lg:col-span-2">
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{color:"#6b7c8d",letterSpacing:".14em"}}>
              {property.neighborhood_name ?? property.location_text}
              {property.property_type && ` · ${property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}`}
              {property.land_type === "long_lease" && " · Long Lease"}
              {property.land_type === "freehold"   && " · Freehold"}
            </div>
            <h1 className="font-display mb-4" style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:600,color:"#0d1f2d",lineHeight:1.05}}>
              {property.title}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="font-display font-bold" style={{fontSize:"36px",color:"#0d1f2d",lineHeight:1}}>
                {property.price_on_request ? "Price on Request" : formatPriceUSD(property.price_usd)}
                {isRent && !property.price_on_request && (
                  <span style={{fontSize:"16px",fontWeight:400,color:"#6b7c8d"}}>/mo</span>
                )}
              </div>
              {property.price_awg && !property.price_on_request && (
                <div className="mt-1" style={{fontSize:"14px",color:"#6b7c8d"}}>
                  {formatPriceAWG(property.price_awg)}{isRent ? "/mo" : ""}
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-px mb-6 overflow-hidden rounded-2xl"
              style={{background:"#e4ddd0"}}>
              {[
                {val: property.bedrooms != null ? String(property.bedrooms) : null, label: "Bedrooms",   icon: Bed},
                {val: baths,                                                          label: "Bathrooms",  icon: Bath},
                {val: bldArea,                                                        label: "Build Area", icon: Maximize},
                {val: lotArea,                                                        label: "Lot Size",   icon: Maximize},
              ].filter(s => s.val).map(({val, label, icon: Icon}) => (
                <div key={label} className="bg-white py-4 text-center">
                  <div className="font-display font-semibold mb-1" style={{fontSize:"20px",color:"#0d1f2d"}}>{val}</div>
                  <div className="text-xs uppercase tracking-wider" style={{color:"#6b7c8d",letterSpacing:".08em"}}>{label}</div>
                </div>
              ))}
            </div>

            {/* Feature flags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {property.pool        && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#fdf7ec",border:"1px solid rgba(201,151,63,.25)",color:"#a07828"}}>✦ Pool</span>}
              {property.ocean_view  && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#fdf7ec",border:"1px solid rgba(201,151,63,.25)",color:"#a07828"}}>✦ Ocean View</span>}
              {property.beachfront  && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#fdf7ec",border:"1px solid rgba(201,151,63,.25)",color:"#a07828"}}>✦ Beachfront</span>}
              {property.furnished   && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#f2ede4",border:"1px solid #e4ddd0",color:"#0d1f2d"}}>Furnished</span>}
              {property.is_luxury   && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#fff"}}>✦ Luxury</span>}
              {property.is_investment && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#0d1f2d",color:"#e8b85a"}}>Investment</span>}
              {property.is_new      && <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{background:"#0d1f2d",color:"#fff"}}>New</span>}
            </div>

            {/* Description */}
            <h2 className="font-display mb-3" style={{fontSize:"22px",fontWeight:600,color:"#0d1f2d"}}>About This Property</h2>
            <p className="leading-relaxed mb-6" style={{fontSize:"14px",color:"#6b7c8d",lineHeight:1.8}}>
              {(property as {rewritten_description?:string;summary?:string}).rewritten_description
                || (property as {summary?:string}).summary
                || "Full property description available — connect Supabase to load listing content from the database."}
            </p>

            {isSample && (
              <div className="mb-6 px-4 py-3 rounded-xl text-xs" style={{background:"#fff8e8",border:"1px solid rgba(201,151,63,.3)",borderLeft:"3px solid #c9973f",color:"#6b5000"}}>
                <strong style={{color:"#4a3800"}}>Sample listing</strong> — Description, agent info, and full specs load from Supabase once connected.
              </div>
            )}

            {/* Agent */}
            <div className="flex items-center gap-4 p-4 rounded-2xl" style={{background:"#f2ede4",border:"1px solid #e4ddd0"}}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-semibold text-lg"
                style={{background:"linear-gradient(135deg,#0d1f2d,#1e3448)",color:"#fff",border:"2px solid rgba(201,151,63,.3)"}}>
                {(property.agent_name ?? "MH").split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <div>
                <div className="font-semibold text-sm" style={{color:"#0d1f2d"}}>{property.agent_name ?? "MPG Aruba Real Estate"}</div>
                <div className="text-xs" style={{color:"#6b7c8d"}}>Licensed Real Estate Broker · MPG Aruba</div>
                {property.agent_phone && <div className="text-xs mt-0.5" style={{color:"#c9973f"}}>{property.agent_phone}</div>}
              </div>
            </div>
          </div>

          {/* Sticky panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-3xl p-6 border" style={{borderColor:"#e4ddd0",boxShadow:"0 8px 40px rgba(13,31,45,.1)"}}>
              <div className="font-display font-bold mb-1" style={{fontSize:"26px",color:"#0d1f2d"}}>
                {property.price_on_request ? "Price on Request" : formatPriceUSD(property.price_usd)}
              </div>
              {property.price_awg && !property.price_on_request && (
                <div className="mb-5 text-sm" style={{color:"#6b7c8d"}}>{formatPriceAWG(property.price_awg)}</div>
              )}
              <div className="h-px mb-5" style={{background:"#e4ddd0"}} />
              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
                  style={{background:"linear-gradient(135deg,#0d1f2d,#1e3448)",color:"#fff"}}>
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Agent
                </a>
                <a href={`tel:${property.agent_phone ?? "+2975934647"}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border transition-all"
                  style={{borderColor:"#e4ddd0",color:"#0d1f2d"}}>
                  <Phone className="w-4 h-4" />
                  Call Agent
                </a>
                <Link href={`/contact?property=${property.slug}&intent=viewing`}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all"
                  style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#fff"}}>
                  <Eye className="w-4 h-4" />
                  Request a Viewing
                </Link>
              </div>
              <p className="text-center text-xs mt-3" style={{color:"#6b7c8d"}}>Free, no-obligation inquiry</p>
              <div className="h-px my-4" style={{background:"#e4ddd0"}} />
              {/* Quick facts */}
              <div className="flex flex-col gap-2.5 text-xs" style={{color:"#6b7c8d"}}>
                {property.property_type && <div className="flex justify-between"><span>Type</span><span style={{color:"#0d1f2d",fontWeight:600}} className="capitalize">{property.property_type.replace("_"," ")}</span></div>}
                <div className="flex justify-between"><span>Contract</span><span style={{color:"#0d1f2d",fontWeight:600}}>{isRent ? "For Rent" : "For Sale"}</span></div>
                {property.land_type && <div className="flex justify-between"><span>Land</span><span style={{color:"#0d1f2d",fontWeight:600}} className="capitalize">{property.land_type.replace("_"," ")}</span></div>}
                {property.neighborhood_name && <div className="flex justify-between"><span>Location</span><span style={{color:"#0d1f2d",fontWeight:600}}>{property.neighborhood_name}</span></div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white border-t px-4 py-3 flex gap-2"
        style={{borderColor:"#e4ddd0",boxShadow:"0 -4px 24px rgba(13,31,45,.1)"}}>
        <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
          style={{background:"linear-gradient(135deg,#0d1f2d,#1e3448)",color:"#fff"}}>
          <MessageCircle className="w-4 h-4" />WhatsApp
        </a>
        <a href={`tel:${property.agent_phone ?? "+2975934647"}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border"
          style={{borderColor:"#e4ddd0",color:"#0d1f2d"}}>
          <Phone className="w-4 h-4" />Call
        </a>
        <Link href={`/contact?property=${property.slug}&intent=viewing`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
          style={{background:"linear-gradient(135deg,#c9973f,#a07828)",color:"#fff"}}>
          Request Viewing
        </Link>
      </div>
    </div>
  );
}

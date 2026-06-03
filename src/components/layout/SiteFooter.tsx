import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-display text-2xl font-semibold text-white">MPG</div>
              <div className="text-2xs text-sand-400 uppercase tracking-[0.18em] font-semibold mt-0.5">
                Aruba Real Estate
              </div>
            </div>
            <p className="text-sm text-navy-200 leading-relaxed mb-6">
              Aruba&apos;s trusted real estate partner for buyers, sellers, renters, and investors. 
              Local expertise. International reach.
            </p>
            <div className="space-y-3 text-sm text-navy-300">
              <a href="tel:+2975934647" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-sand-400 shrink-0" />
                +297 593 4647
              </a>
              <a href="tel:+17868005515" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-sand-400 shrink-0" />
                +1 786 800 5515 (US)
              </a>
              <a href="mailto:info@mpgaruba.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-sand-400 shrink-0" />
                info@mpgaruba.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sand-400 shrink-0 mt-0.5" />
                <span>Scopet Straat #5<br />Oranjestad, Aruba</span>
              </div>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-400 mb-5">
              Properties
            </h4>
            <ul className="space-y-3 text-sm text-navy-300">
              {[
                { label: "All Properties For Sale", href: "/buy" },
                { label: "Luxury Villas",           href: "/buy?type=villa" },
                { label: "Condominiums",            href: "/buy?type=condominium" },
                { label: "Commercial",              href: "/buy?type=commercial" },
                { label: "Land For Sale",           href: "/buy?type=land" },
                { label: "Long-Term Rentals",       href: "/rent" },
                { label: "Map Search",              href: "/map" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-400 mb-5">
              Locations
            </h4>
            <ul className="space-y-3 text-sm text-navy-300">
              {[
                { label: "Palm Beach",    href: "/neighborhoods/palm-beach" },
                { label: "Malmok",        href: "/neighborhoods/malmok" },
                { label: "Eagle Beach",   href: "/neighborhoods/eagle-beach" },
                { label: "Noord",         href: "/neighborhoods/noord" },
                { label: "Oranjestad",    href: "/neighborhoods/oranjestad" },
                { label: "Tierra del Sol",href: "/neighborhoods/tierra-del-sol" },
                { label: "Savaneta",      href: "/neighborhoods/savaneta" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-400 mb-5">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-navy-300 mb-8">
              {[
                { label: "Buyer Guide",         href: "/guides/buyer" },
                { label: "Seller Guide",        href: "/guides/seller" },
                { label: "Foreign Buyer Guide", href: "/guides/foreign-buyer" },
                { label: "Investment Guide",    href: "/guides/investment" },
                { label: "Neighborhood Guides", href: "/neighborhoods" },
                { label: "FAQ",                 href: "/faq" },
                { label: "Blog",                href: "/blog" },
                { label: "Contact MPG",         href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl("Hi MPG Aruba, I would like to inquire about a property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-sand-400 text-navy-950 text-sm font-bold rounded-xl hover:bg-sand-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp MPG
            </a>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-navy-400">
          <span>© {new Date().getFullYear()} MPG Aruba Real Estate. All rights reserved. KVK H38301.0</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/admin"   className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

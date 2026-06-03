"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn, whatsappUrl } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Buy",
    href: "/buy",
    children: [
      { label: "All Properties For Sale", href: "/buy" },
      { label: "Residential Homes",       href: "/buy?type=residential" },
      { label: "Luxury Villas",           href: "/buy?type=villa" },
      { label: "Condominiums",            href: "/buy?type=condominium" },
      { label: "Commercial",              href: "/buy?type=commercial" },
      { label: "Land For Sale",           href: "/buy?type=land" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    children: [
      { label: "All Rentals",      href: "/rent" },
      { label: "Residential",     href: "/rent?type=residential" },
      { label: "Commercial",      href: "/rent?type=commercial" },
      { label: "Condominiums",    href: "/rent?type=condominium" },
    ],
  },
  {
    label: "Locations",
    href: "/neighborhoods",
    children: [
      { label: "Palm Beach",    href: "/neighborhoods/palm-beach" },
      { label: "Malmok",        href: "/neighborhoods/malmok" },
      { label: "Eagle Beach",   href: "/neighborhoods/eagle-beach" },
      { label: "Noord",         href: "/neighborhoods/noord" },
      { label: "Oranjestad",    href: "/neighborhoods/oranjestad" },
      { label: "Tierra del Sol",href: "/neighborhoods/tierra-del-sol" },
    ],
  },
  { label: "Map Search",  href: "/map" },
  { label: "Sell",        href: "/sell" },
  {
    label: "Guides",
    href: "/guides",
    children: [
      { label: "Buyer Guide",         href: "/guides/buyer" },
      { label: "Seller Guide",        href: "/guides/seller" },
      { label: "Foreign Buyer Guide", href: "/guides/foreign-buyer" },
      { label: "Investment Guide",    href: "/guides/investment" },
      { label: "FAQ",                 href: "/faq" },
    ],
  },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-navy-100 shadow-luxury">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-navy-900 text-xl lg:text-2xl font-semibold tracking-tight group-hover:text-navy-700 transition-colors">
              MPG
            </span>
            <span className="text-2xs text-sand-500 uppercase tracking-[0.18em] font-body font-semibold">
              Aruba Real Estate
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-700 hover:text-navy-900 rounded-lg hover:bg-navy-50 transition-all"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5 text-navy-400 group-hover:text-navy-600 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-luxury-lg border border-navy-100 py-2 z-50 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-900 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+2975934647"
              className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+297 593 4647</span>
            </a>
            <a
              href={whatsappUrl("Hi MPG Aruba, I am interested in a property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-xl hover:bg-navy-800 transition-colors shadow-luxury"
            >
              WhatsApp MPG
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-100 bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-base font-semibold text-navy-800 rounded-lg hover:bg-navy-50 transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-navy-600 rounded-lg hover:bg-navy-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-navy-100 space-y-2">
              <a
                href="tel:+2975934647"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-navy-600 font-medium"
              >
                <Phone className="w-4 h-4" />+297 593 4647
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-4 py-3 bg-navy-900 text-white text-sm font-semibold rounded-xl"
              >
                WhatsApp MPG
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Map, Heart, Phone, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Search", href: "/search",  icon: Search },
  { label: "Map",    href: "/map",     icon: Map },
  { label: "Saved",  href: "/saved",   icon: Heart },
  { label: "Contact",href: "/contact", icon: Phone },
  { label: "More",   href: "/menu",    icon: MoreHorizontal },
];

export function MobileTabNav() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-navy-100 shadow-luxury-xl safe-area-pb">
      <div className="flex">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-2xs font-semibold transition-colors",
                active
                  ? "text-navy-900"
                  : "text-navy-400 hover:text-navy-700"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  active ? "text-navy-900" : "text-navy-400"
                )}
                strokeWidth={active ? 2.5 : 1.75}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

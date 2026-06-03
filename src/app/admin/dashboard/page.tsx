import Link from "next/link";
import { Home, Building2, Users, Inbox, FileText, Settings, BarChart3 } from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

const STATS = [
  { label: "Active Listings",  value: "–",   note: "Connect Supabase" },
  { label: "New Leads",        value: "–",   note: "Connect Supabase" },
  { label: "Property Views",   value: "–",   note: "Connect Supabase" },
  { label: "WhatsApp Clicks",  value: "–",   note: "Connect Supabase" },
];

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/admin/dashboard",   icon: Home },
  { label: "Properties", href: "/admin/properties",  icon: Building2 },
  { label: "Leads",      href: "/admin/leads",       icon: Inbox },
  { label: "Agents",     href: "/admin/agents",      icon: Users },
  { label: "Blog",       href: "/admin/blog",        icon: FileText },
  { label: "Analytics",  href: "/admin/analytics",   icon: BarChart3 },
  { label: "Settings",   href: "/admin/settings",    icon: Settings },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-navy-800 shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <div className="font-display text-white text-xl font-semibold">MPG</div>
          <div className="text-2xs text-sand-400 uppercase tracking-[0.18em] font-semibold mt-0.5">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-navy-300 hover:bg-navy-800 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-800">
          <Link href="/" className="text-xs text-navy-500 hover:text-white transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="font-display text-3xl font-semibold text-white mb-2">Dashboard</h1>
          <p className="text-navy-400 text-sm mb-10">
            MPG Aruba Real Estate · Admin · Connect Supabase env vars to load live data
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {STATS.map(({ label, value, note }) => (
              <div key={label} className="bg-navy-900 border border-navy-700 rounded-2xl p-5">
                <div className="text-3xl font-bold text-white font-display mb-1">{value}</div>
                <div className="text-sm font-semibold text-navy-200">{label}</div>
                <div className="text-xs text-navy-500 mt-1">{note}</div>
              </div>
            ))}
          </div>

          {/* Flagged data issues */}
          <div className="bg-amber-950/40 border border-amber-800/50 rounded-2xl p-6 mb-6">
            <h2 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">
              ⚠ Data Issues Requiring Review
            </h2>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>· Grand Villa at Malmok: bathroom count conflict (summary=5, description=7.5)</li>
              <li>· Experience years: site says 20+, listings page says 30+ — confirm with client</li>
              <li>· AAR membership, NYT feature, licensed broker claims: unverified — do not publish</li>
            </ul>
          </div>

          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-2">Phase 2 Status</h2>
            <p className="text-navy-400 text-sm">
              Schema deployed ✓ · Scaffold running ✓ · Supabase env vars pending · 
              Admin CRUD, lead inbox, and media manager — Phase 4.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Map } from "lucide-react";

export const metadata = { title: "Map Search" };

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 bg-navy-100 flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')" }}
        />
        <div className="relative z-10 text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-6 shadow-luxury-lg">
            <Map className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-navy-900 mb-3">Map Search</h1>
          <p className="text-navy-500 text-base mb-6">
            Interactive Mapbox map with price bubbles, clustering, and neighborhood overlays.
            Add your{" "}
            <code className="bg-white/80 px-1.5 py-0.5 rounded text-xs font-mono">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </code>{" "}
            to .env.local to activate.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900/10 border border-navy-200 rounded-xl text-sm text-navy-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Mapbox token required · Phase 3
          </div>
        </div>
      </div>
    </div>
  );
}

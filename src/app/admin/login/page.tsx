"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase auth.signInWithPassword
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display text-white text-3xl font-semibold">MPG</div>
          <div className="text-2xs text-sand-400 uppercase tracking-[0.18em] font-semibold mt-0.5">
            Admin Console
          </div>
        </div>

        {/* Card */}
        <div className="bg-navy-900 border border-navy-700 rounded-3xl p-8 shadow-luxury-xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-800 mb-6 mx-auto">
            <Lock className="w-5 h-5 text-sand-400" />
          </div>
          <h1 className="text-white text-xl font-semibold text-center mb-2">Admin Login</h1>
          <p className="text-navy-400 text-sm text-center mb-8">
            MPG Aruba Real Estate · Staff only
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@mpgaruba.com"
                className="w-full px-4 py-3 bg-navy-800 border border-navy-600 rounded-xl text-white text-sm placeholder:text-navy-500 focus:outline-none focus:border-sand-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-navy-800 border border-navy-600 rounded-xl text-white text-sm placeholder:text-navy-500 focus:outline-none focus:border-sand-400 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-sand-400 text-navy-950 font-bold rounded-xl hover:bg-sand-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-navy-500 mt-6">
            Supabase auth connects when env vars are set
          </p>
        </div>
      </div>
    </div>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.mpgaruba.com", pathname: "/storage/app/uploads/**" },
      { protocol: "https", hostname: "mpgaruba.com", pathname: "/storage/app/uploads/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "yvkovfjdhojhzjctnbgl.supabase.co", pathname: "/storage/v1/object/public/**" }
    ]
  }
};

export default nextConfig;

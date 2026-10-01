import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary editorial imagery is served from Unsplash (see data/media.ts).
    // Once real ClickMed assets live in /public, this entry can be removed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

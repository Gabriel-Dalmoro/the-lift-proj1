import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the photos exactly as exported in public/images (already WebP, high quality).
    // Resizing on the fly made full-screen crops on phones look soft.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }],
      },
    ];
  },
};

export default nextConfig;

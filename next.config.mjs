import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  async headers() {
    const immutableStaticHeaders = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
    ];

    return [
      {
        source: "/assets/:path*",
        headers: immutableStaticHeaders,
      },
      {
        source: "/images/:path*",
        headers: immutableStaticHeaders,
      },
      {
        source: "/flags/:path*",
        headers: immutableStaticHeaders,
      },
      {
        source: "/fonts/:path*",
        headers: immutableStaticHeaders,
      },
      {
        source: "/favicon.ico",
        headers: immutableStaticHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: immutableStaticHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);

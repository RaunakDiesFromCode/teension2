/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        pathname: "/images/**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: `/search?q=%23:tag`,
      },
    ];
  },
};

export default nextConfig;

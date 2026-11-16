import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PREVIEW_EXPORT=1 builds a static copy for previews; normal builds are unaffected.
  ...(process.env.PREVIEW_EXPORT ? { output: "export" as const, assetPrefix: "." } : {}),
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

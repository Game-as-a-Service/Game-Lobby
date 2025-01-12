/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");

let withBundleAnalyzer = (config) => config;

if (process.env.ANALYZE === "true") {
  withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

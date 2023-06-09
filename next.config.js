// @ts-check
const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

module.exports = nextConfig;

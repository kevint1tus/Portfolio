/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules.push({
        test: /\.(xml)$/,
        use: ['xml-loader'],
      });
    }
    return config;
  },
};

module.exports = nextConfig;

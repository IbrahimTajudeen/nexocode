/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  serverExternalPackages: ["@react-pdf/renderer"],
}

module.exports = nextConfig

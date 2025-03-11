/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/interactive_presentation' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/interactive_presentation/' : '',
  trailingSlash: true
}

module.exports = nextConfig 
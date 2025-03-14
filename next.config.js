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
  trailingSlash: true,
  typescript: {
    // !! 주의: 타입 검사를 건너뛰는 것은 프로덕션 빌드에서만 사용하세요
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',  // Generate static HTML files
    // Configure API URL from environment variable
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
    },
    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig

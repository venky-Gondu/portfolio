/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Configure API URL from environment variable
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
    },
    // Enable image optimization for Vercel
    images: {
        unoptimized: false,
        domains: [], // Add external image domains here if needed
    },
}

module.exports = nextConfig

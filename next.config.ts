/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // <-- This is important for Netlify (Static Export)

  // Optional: if you are using images
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['images.unsplash.com', 'external-preview.redd.it'],
   },
   experimental: {
      serverActions: true,
   },
};

module.exports = nextConfig;

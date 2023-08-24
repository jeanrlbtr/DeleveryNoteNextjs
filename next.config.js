/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         'images.unsplash.com',
         'external-preview.redd.it',
         'lcdn-hk.icons8.com',
      ],
   },
   experimental: {
      serverActions: true,
   },
};

module.exports = nextConfig;

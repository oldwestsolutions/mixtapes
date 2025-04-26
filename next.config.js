/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add redirect for search page to prevent build issues
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/',
        permanent: false,
      },
      {
        source: '/search/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: '/',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig; 
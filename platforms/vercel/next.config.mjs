/** @type {Partial<import('next').NextConfig>} */
export default {
  env: {
    NEXT_PUBLIC_BASE_URL: `https://${process.env.VERCEL_URL}`,
  },
  images: {
    remotePatterns: [
      'https://avatars.githubusercontent.com/**',
      'https://bestpractices.coreinfrastructure.org/**',
      'https://raw.githubusercontent.com/nodejs/**',
      'https://user-images.githubusercontent.com/**',
    ].map(url => new URL(url)),
  },
};

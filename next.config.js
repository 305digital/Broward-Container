/** @type {import('next').NextConfig} */
const nextConfig = {
  // No eslint-config-next dependency is installed (kept deps minimal), so
  // skip the lint step during `next build` rather than have it stall/fail
  // on a missing config in a non-interactive CI environment like Railway.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

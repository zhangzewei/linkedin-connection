/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['clone-deep'],
    },
};

export default nextConfig;

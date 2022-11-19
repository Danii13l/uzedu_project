/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');


const nextConfig = {
    distDir: 'build',
    reactStrictMode: true,
    swcMinify: true,
    i18n,
    redirects: async () => [
        {
            source: '/:path*',
            has: [{ type: 'host', value: 'www.bvxtb.uz' }],
            destination: 'https://bvxtb.uz/:path*',
            permanent: true,
        },
    ],
    images: {
        domains: ['https://bvxtb.uz']
    },
}

module.exports = nextConfig

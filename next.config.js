/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["mongoose"],
    turbopack: {},
    experimental: {
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
    webpack(config) {
        config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
        }
        return config
    }
}
  
module.exports = nextConfig

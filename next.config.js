/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                pathname: "/image/**",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
                pathname: "/gh/devicons/devicon/icons/**",
            },
            {
                protocol: "https",
                hostname: "static.dta32.my.id",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lastfm.freetls.fastly.net",
                pathname: "/**",
            }
        ],
    },
};

module.exports = nextConfig;

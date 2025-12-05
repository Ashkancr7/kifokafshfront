import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com", // اجازه میدیم از اینجا عکس لود کنه
            },
        ],
    },
};

export default nextConfig;
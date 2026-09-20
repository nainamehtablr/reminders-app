import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prisma must stay on the server and should not be bundled by Webpack.
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;

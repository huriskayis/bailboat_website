/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["iyzipay"],
  async redirects() {
    return [
      { source: "/hakkimizda", destination: "/atolye", permanent: true },
    ];
  },
};

export default nextConfig;

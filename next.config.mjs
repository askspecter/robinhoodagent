/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Kita hanya memakai injected connector. Barrel `wagmi/connectors`
    // ikut menarik konektor Coinbase Base Account yang bergantung pada
    // paket opsional yang tidak terpasang. Path itu tak pernah dieksekusi,
    // jadi aman untuk di-stub agar bundling tidak gagal.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@base-org/account": false,
      "@coinbase/cdp-sdk": false,
      "@react-native-async-storage/async-storage": false,
    };
    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;

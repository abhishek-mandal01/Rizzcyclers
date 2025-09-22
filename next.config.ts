/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // You added this earlier
  
  // Add this webpack config to handle Leaflet's images
  webpack: (config: { module: { rules: { test: RegExp; use: { loader: string; options: { limit: number; name: string; }; }; }[]; }; }) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
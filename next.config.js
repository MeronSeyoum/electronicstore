/** @type {import('next').NextConfig} */
const postcss = require('postcss');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add postcss loader
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'electronicshop-electronic-shop.h.aivencloud.com',
            port: 24765,
            user: 'avnadmin',
            password: 'AVNS_PiBpNBzw9Rx9TkX5lhk', 
            database: 'electronic_shop'
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://electronicstore-dun.vercel.app/api' // production api
    }
}

module.exports = nextConfig


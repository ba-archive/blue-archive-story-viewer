import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: [
        "Android >= 39",
        "Chrome >= 50",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "> 1%",
      ],
    }),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeManifestIcons: true,
      includeAssets: ["favicon/*.png"],
      manifest: {
        name: "Blue Archive Story Viewer",
        short_name: "BA Stories",
        description: "Yet another Blue Archive story viewer",
        lang: "zh-CN",
        theme_color: "#62abe9",
        icons: [
          {
            src: "/favicon/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/favicon/maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(mp4|mp3|wav)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "multimedia-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|webp|ico)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|json)$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "asset-cache",
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
      // uncomment to unregister service worker
      // selfDestroying: true,
    }),
    viteCompression({ algorithm: "brotliCompress" }),
    visualizer(),
  ],
  build: {
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      toplevel: true,
      safari10: true,
    },
  },
});

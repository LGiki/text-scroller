import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Text Scroller",
        short_name: "Text Scroller",
        description: "Text Scroller is a web tool for displaying scrolling text in a marquee style",
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,woff2}'],
      }
    }),
    ViteMinifyPlugin({})
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

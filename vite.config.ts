import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/sitemap.xml': {
        target: 'https://dffmjqjokfccdnfutdmx.supabase.co/functions/v1/sitemap',
        changeOrigin: true,
        rewrite: () => '',
      },
    },
  },
  plugins: [
    react(),
    imagetools(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      // Only generate SW in production builds; dev gets a no-op stub
      devOptions: { enabled: false },
      injectRegister: 'auto',
      // Use generateSW strategy — Workbox writes the SW for us
      strategies: 'generateSW',
      workbox: {
        // ── Cache name prefix ──────────────────────────────────────────────
        cacheId: 'groppi-v1',

        // ── Pre-cache all Vite-built assets (JS/CSS chunks + index.html) ──
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],

        // ── Runtime caching rules ─────────────────────────────────────────
        runtimeCaching: [
          // 1. Google Fonts stylesheet → StaleWhileRevalidate (fast + fresh)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          // 2. Google Fonts files → CacheFirst (immutable, long TTL)
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // 3. Public images (/images/, /portfolio/) → CacheFirst (1 month)
          {
            urlPattern: /\/(?:images|portfolio)\/.+\.(?:png|jpg|jpeg|webp|avif|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // 4. Supabase storage assets → CacheFirst (1 week)
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-storage',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // 5. Supabase REST / Functions → NetworkFirst (always fresh data)
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/(?:rest|functions)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],

        // ── Skip waiting so new SW activates immediately ──────────────────
        skipWaiting: true,
        clientsClaim: true,

        // ── Don't pre-cache video files (too large) ───────────────────────
        globIgnores: ['**/*.{mp4,webm,mov}'],
      },
      manifest: {
        name: 'GROPPI - Digital Marketing Bureau',
        short_name: 'GROPPI',
        description: 'Full-service digital marketing bureau in België',
        theme_color: '#D4AF37',
        background_color: '#050505',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent duplicate React instances
    dedupe: ["react", "react-dom", "react/jsx-runtime", "framer-motion"],
  },
  build: {
    target: 'esnext',       // modern browsers only — no legacy polyfills
    minify: 'esbuild',
    cssMinify: true,
    // Increase warning threshold; we'll track actual sizes manually
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ─── Critical path (sync, loaded with initial HTML) ─────────────────
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/@remix-run/')) {
            return 'react-core';
          }

          // ─── i18n — nl+en pre-bundled, rest dynamic-imported ────────────────
          if (id.includes('node_modules/i18next') ||
              id.includes('node_modules/react-i18next') ||
              id.includes('node_modules/i18next-browser-languagedetector') ||
              id.includes('node_modules/i18next-resources-to-backend')) {
            return 'i18n';
          }

          // ─── Supabase — only loaded on routes/components that need it ────────
          if (id.includes('node_modules/@supabase/')) {
            return 'supabase';
          }

          // ─── framer-motion — kept in its own async chunk; never blocking ─────
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }

          // ─── TanStack Query ──────────────────────────────────────────────────
          if (id.includes('node_modules/@tanstack/')) {
            return 'react-query';
          }

          // ─── Recharts — heavy, only used on admin dashboard ──────────────────
          if (id.includes('node_modules/recharts') ||
              id.includes('node_modules/d3-') ||
              id.includes('node_modules/victory-')) {
            return 'recharts';
          }

          // ─── Form libraries ──────────────────────────────────────────────────
          if (id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform/') ||
              id.includes('node_modules/zod')) {
            return 'forms';
          }

          // ─── Drag-and-drop (admin only) ───────────────────────────────────────
          if (id.includes('node_modules/@dnd-kit/')) {
            return 'dnd';
          }

          // ─── TipTap editor (admin only) ───────────────────────────────────────
          if (id.includes('node_modules/@tiptap/')) {
            return 'tiptap';
          }

          // ─── Radix UI primitives — split from main bundle ─────────────────────
          if (id.includes('node_modules/@radix-ui/')) {
            return 'ui-radix';
          }

          // ─── Embla carousel ───────────────────────────────────────────────────
          if (id.includes('node_modules/embla-carousel')) {
            return 'embla';
          }

          // ─── Date utilities ───────────────────────────────────────────────────
          if (id.includes('node_modules/date-fns') ||
              id.includes('node_modules/react-day-picker')) {
            return 'date-utils';
          }
        },
      },
    },
  },
}));

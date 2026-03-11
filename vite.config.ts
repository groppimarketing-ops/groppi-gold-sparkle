import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

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
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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

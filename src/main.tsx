import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(<App />);

// ── Service Worker registration (production only) ───────────────────────────
// vite-plugin-pwa injects `registerSW` at build time; in dev it's a no-op.
if ('serviceWorker' in navigator) {
  // Use the virtual module injected by vite-plugin-pwa
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      // Silently update: fetch new SW in background, activate on next reload
      immediate: false,
      onRegistered(registration) {
        // Check for updates every 60 minutes (for long-lived sessions)
        if (registration) {
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);
        }
      },
      onNeedRefresh() {
        // Optionally: show a "New version available" toast
        // We keep it silent — SW auto-updates via skipWaiting + clientsClaim
      },
      onOfflineReady() {
        // Site is ready for offline use — no UI noise needed
      },
    });
  }).catch(() => {
    // virtual module not available (dev mode) — silently ignore
  });
}

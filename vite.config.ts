import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
        manifest: {
          name: "Garant CRM",
          short_name: "Garant CRM",
          description: "Garant CRM",
          theme_color: "#ffffff",
          icons: [
            {
              src: "vite.svg",
              sizes: "192x192",
              type: "image/svg+xml",
            },
            {
              src: "vite.svg",
              sizes: "512x512",
              type: "image/svg+xml",
            },
          ],
        },
      }),
    ],
  };
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  server: {
    proxy: {
      "/api": {
        target: "https://tennisstats.be",
        changeOrigin: true,
      },
    },
  },
});

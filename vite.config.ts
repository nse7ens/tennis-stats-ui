import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "INVALID_ANNOTATION") return;
        defaultHandler(warning);
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://tennisstats.be",
        changeOrigin: true,
      },
    },
  },
});

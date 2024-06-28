import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Read environment variables
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: isProduction
      ? {}
      : {
          "/api": {
            target: "https://jetlajahin.up.railway.app",
            changeOrigin: true,
            secure: false,
          },
        },
  },
});

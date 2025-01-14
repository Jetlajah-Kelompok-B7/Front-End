import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://jetlajahin.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

// proxy: {
//   "/api": {
//     target: "https://jetlajahin.up.railway.app",
//     changeOrigin: true,
//     secure: false,
//   },

//   proxy: {
//     "/api": 'https://jetlajahin.up.railway.app'
//   },

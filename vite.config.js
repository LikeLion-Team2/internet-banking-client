import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

``;
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://bank-back:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
});

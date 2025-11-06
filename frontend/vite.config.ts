import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    host: true,
    port: parseInt(process.env.PORT || "") || 5173,
    allowedHosts: true,
  },
});

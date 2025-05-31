import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./src/client/index.html",
      },
    },
  },
  plugins: [
    deno(),
    react(),
  ],
});

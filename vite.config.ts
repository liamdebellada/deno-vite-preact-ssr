import { defineConfig, PluginOption } from "vite";

import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: "./src/index.html",
      },
    },
  },
  plugins: [
    deno() as PluginOption,
    react(),
  ],
});

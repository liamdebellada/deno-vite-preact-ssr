import { createRequire } from "node:module";
import { defineConfig, PluginOption } from "vite";

import deno from "@deno/vite-plugin";
import preact from "@preact/preset-vite";

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
    preact({
      prefreshEnabled: false,
      babel: {
        cwd: createRequire(import.meta.url).resolve("@preact/preset-vite"),
      },
    }) as PluginOption,
  ],
});

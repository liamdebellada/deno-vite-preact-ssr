import { createRequire } from "node:module";
import { defineConfig } from "vite";

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
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    deno(),
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    preact({
      prefreshEnabled: false,
      babel: {
        cwd: createRequire(import.meta.url).resolve("@preact/preset-vite"),
      },
    }),
  ],
});

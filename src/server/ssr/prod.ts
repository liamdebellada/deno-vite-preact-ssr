import { createSSRHandler } from "./create-ssr-handler.ts";
import { serveStatic as honoServeStatic } from "hono/deno";

const appShellHtml = await Deno.readTextFile(
  "./dist/client/src/client/index.html",
);

export const serveStatic = honoServeStatic({
  root: "./dist/client",
});

export const handler = createSSRHandler({
  getAppShellHtml() {
    return appShellHtml;
  },
  async renderReactHtml(serverState) {
    const { render }:
      typeof import("../../client/entrypoints/entry-server.tsx") = await import(
        "../../../dist/server/entry-server.mjs"
      );

    return render(
      serverState,
    );
  },
});

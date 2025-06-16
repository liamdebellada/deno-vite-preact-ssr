import { createSSRHandler } from "./create-ssr-handler.ts";
import { serveStatic as honoServeStatic } from "hono/deno";

const appShellHtml = await Deno.readTextFile(
  "./dist/client/src/client/index.html",
);

const { render }: typeof import("../../client/entrypoints/entry-server.tsx") =
  await import(
    "../../../dist/server/entry-server.mjs"
  );

export const serveStatic = honoServeStatic({
  root: "./dist/client",
});

export const handler = createSSRHandler({
  getAppShellHtml() {
    return appShellHtml;
  },
  renderReactHtml(serverState) {
    return render(
      serverState,
    );
  },
});

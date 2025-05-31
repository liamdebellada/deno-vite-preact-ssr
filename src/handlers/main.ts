import { serveDir } from "@std/http/file-server";

import { createSSRHandler } from "./create-ssr-handler.ts";

const templateHtml = await Deno.readTextFile(
  "./dist/client/src/client/index.html",
);

export const handler = createSSRHandler({
  async getHtml(_request, serverState) {
    const { render }: typeof import("../client/entrypoints/entry-server.tsx") =
      await import("../../dist/server/entry-server.mjs");

    const rendered: { head?: string; html?: string } = await render(
      serverState,
    );

    const html = templateHtml
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(`<!--sever-state-->`, JSON.stringify(serverState));

    return html;
  },
  async getStaticFile(request) {
    const response = await serveDir(request, {
      fsRoot: "./dist/client",
      showIndex: false,
    });

    if (response.status === 404) return;

    return response;
  },
});

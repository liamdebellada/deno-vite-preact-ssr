import { serveDir } from "@std/http/file-server";

import { CreateHandler } from "./index.ts";
import { renderHtmlTemplate } from "./render-html-template.ts";

const SSRHandler = async (request: Request) => {
  const { pathname } = new URL(request.url);

  const templateHtml = await Deno.readTextFile(
    "./dist/client/src/client/index.html",
  );

  const { render } = await import("../../../dist/server/entry-server.mjs");

  const rendered: { head?: string; html?: string } = await render(pathname);

  const html = renderHtmlTemplate(templateHtml, {
    head: rendered.head ?? "",
    html: rendered.html ?? "",
    serverState: JSON.stringify({ url: pathname }),
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};

export const createHandler: CreateHandler = () => async (request: Request) => {
  const response = await serveDir(request, {
    fsRoot: "./dist/client",
    showIndex: false,
  });

  if (response.status === 404) {
    return SSRHandler(request);
  }

  return response;
};

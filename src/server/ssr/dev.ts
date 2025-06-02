import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import { createServer } from "vite";
import { MiddlewareHandler } from "hono";

import { createSSRHandler } from "./create-ssr-handler.ts";

type _Resolve = (value: Response) => void;

const viteServer = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base: "/",
});

const viteMiddleware: MiddlewareHandler = (c, next) =>
  new Promise<Response | void>((resolve) => {
    const req = new IncomingMessage(new Socket());

    req.method = c.req.method;
    req.url = new URL(c.req.url, "http://localhost").pathname;
    req.headers = Object.fromEntries(
      c.req.raw.headers,
    );

    const res = new ServerResponse(req) as ServerResponse & {
      _resolve: _Resolve;
    };

    // https://github.com/denoland/deno/blob/974e2f44b2660a1cd13f8c901ff28a2f57ed391f/ext/node/polyfills/http.ts#L1554
    res._resolve = (response: Response) => resolve(response);

    viteServer.middlewares(
      req,
      res,
      async () => {
        await next();
        return resolve();
      },
    );
  });

export const serveStatic = viteMiddleware;

export const handler = createSSRHandler({
  async getAppShellHtml(c) {
    const { pathname } = new URL(c.req.url);

    return await viteServer.transformIndexHtml(
      pathname,
      await Deno.readTextFile("./src/client/index.html"),
    );
  },
  async renderReactHtml(serverState) {
    const { render } = await viteServer.ssrLoadModule(
      "/src/client/entrypoints/entry-server.tsx",
    ) as typeof import("../../client/entrypoints/entry-server.tsx");

    return render(
      serverState,
    );
  },
});

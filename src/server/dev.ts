import { IncomingMessage, ServerResponse } from "node:http";
import { Socket } from "node:net";
import { ViteDevServer } from "vite";

const createViteServer = async () => {
  const { createServer } = await import("vite");

  return await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base: "/",
  });
};

type _Resolve = (value: Response) => void;

const createViteHandler = (viteServer: ViteDevServer) => (request: Request) =>
  new Promise<Response | void>((resolve) => {
    const req = new IncomingMessage(new Socket());

    req.method = request.method;
    req.url = new URL(request.url, "http://localhost").pathname;
    req.headers = Object.fromEntries(
      request.headers,
    );

    const res = new ServerResponse(req) as ServerResponse & {
      _resolve: _Resolve;
    };

    // https://github.com/denoland/deno/blob/974e2f44b2660a1cd13f8c901ff28a2f57ed391f/ext/node/polyfills/http.ts#L1554
    res._resolve = (response: Response) => resolve(response);

    viteServer.middlewares(
      req,
      res,
      () => resolve(),
    );
  });

const createSSRHandler =
  (viteServer: ViteDevServer) => async (request: Request) => {
    const { pathname } = new URL(request.url);

    const indexHTML = await Deno.readTextFile("./src/index.html");
    const transformedIndexHTML = await viteServer.transformIndexHtml(
      pathname,
      indexHTML,
    );

    const { render } = await viteServer.ssrLoadModule(
      "/src/entrypoints/entry-server.tsx",
    );

    const rendered = await render(pathname);

    const html = transformedIndexHTML
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(`<!--sever-state-->`, JSON.stringify({ url: pathname }));

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  };

export const createHandler = async () => {
  const viteServer = await createViteServer();

  const viteHandler = createViteHandler(viteServer);
  const SSRHandler = createSSRHandler(viteServer);

  return async (request: Request) => {
    const viteResponse = await viteHandler(request);
    if (viteResponse) return viteResponse;

    return await SSRHandler(request);
  };
};

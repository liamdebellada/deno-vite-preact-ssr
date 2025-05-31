import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "../api/index.ts";

import * as devServer from "./handlers/dev.ts";
import * as mainServer from "./handlers/main.ts";

import { Handler } from "./handlers/index.ts";

let handler: Handler;

if (Deno.env.get("NODE_ENV") === "development") {
  handler = await devServer.createHandler();
} else {
  handler = await mainServer.createHandler();
}

Deno.serve((request) => {
  const { pathname } = new URL(request.url);

  if (pathname.includes("/trpc")) {
    return fetchRequestHandler({
      req: request,
      endpoint: "/trpc",
      router: appRouter,
      createContext: () => ({}),
    });
  }

  return handler(request);
});

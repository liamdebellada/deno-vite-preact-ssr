/// <reference lib="deno.ns" />
/// <reference types="npm:@types/node" />
/// <reference types="npm:@types/react" />

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "../api/index.ts";

import * as devServer from "./dev.ts";
import * as mainServer from "./main.ts";

let handler: (request: Request) => Promise<Response>;

if (Deno.env.get("NODE_ENV") === "development") {
  handler = await devServer.createHandler();
} else {
  handler = mainServer.createHandler();
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

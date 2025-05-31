import { fetchRequestHandler as trpcHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "./api/index.ts";

import handler from "./handlers/index.ts";

Deno.serve((request) => {
  const { pathname } = new URL(request.url);

  if (pathname.includes("/trpc")) {
    return trpcHandler({
      req: request,
      endpoint: "/trpc",
      router: appRouter,
      createContext: () => ({}),
    });
  }

  return handler(request);
});

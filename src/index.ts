import { fetchRequestHandler as trpcHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "./api/index.ts";

import handler from "./handlers/index.ts";

Deno.serve((request) => {
  if (new URLPattern({ pathname: "/trpc/*" }).exec(request.url)) {
    return trpcHandler({
      req: request,
      endpoint: "/trpc",
      router: appRouter,
      createContext: () => ({}),
    });
  }

  return handler(request);
});

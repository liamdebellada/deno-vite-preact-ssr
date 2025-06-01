import { QueryClient } from "@tanstack/react-query";
import type { QueryClient as TQueryClient } from "@tanstack/react-query" with { "resolution-mode": "require" };
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { AppRouter } from "../../server/api/index.ts";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "/trpc" })],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient: queryClient as unknown as TQueryClient,
});

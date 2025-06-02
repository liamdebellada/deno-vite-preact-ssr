import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from "@tanstack/react-query";

import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <RQQueryClientProvider client={queryClient}>
    {children}
  </RQQueryClientProvider>
);

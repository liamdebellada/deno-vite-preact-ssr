import {
  Avatar,
  Box,
  Code,
  Flex,
  Heading,
  Spinner,
  Text,
  Theme,
} from "@radix-ui/themes";

import { hc } from "hono/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { Route, Routes } from "react-router";

import type { AppType } from "../server/index.ts";
import type { ServerState } from "../server/server-state/server-state.ts";

const queryClient = new QueryClient();
const honoClient = hc<AppType>("/");

const SomeComponent = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await honoClient.users.$get();
      return await response.json();
    },
  });

  if (isPending) return <Spinner />;
  if (error) return <Text color="crimson">{error.message}</Text>;

  return (
    <Box>
      <Code>{JSON.stringify(data)}</Code>
    </Box>
  );
};

const Page = () => (
  <Flex direction="column">
    <Heading>React + Deno SSR</Heading>
    <Avatar size="6" fallback="R" src="/react.svg" />
    <SomeComponent />
  </Flex>
);

const Page2 = () => (
  <Flex direction="column">
    <Heading>Another page</Heading>
  </Flex>
);

function App(serverState: ServerState) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance="dark">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/another-page" element={<Page2 />} />
        </Routes>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;

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
import { QueryClientProvider } from "@tanstack/react-query";

import type { ServerState } from "../server/server-state/server-state.ts";
import { queryClient, trpc } from "./utils/trpc.ts";
import { useQuery } from "query";

const SomeComponent = () => {
  const { data, error, isPending } = useQuery(
    trpc.users.queryOptions(),
  );

  if (isPending) return <Spinner />;

  if (error) return <Text color="crimson">{error.message}</Text>;

  return (
    <Box>
      <Code>
        {JSON.stringify(data)}
      </Code>
    </Box>
  );
};

function App(serverState: ServerState) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance="dark">
        <Flex direction="column">
          <Heading>React + Deno SSR</Heading>
          <Avatar fallback="R" src="/react.svg" />
          <Text>SSR url prop: {serverState.url}</Text>
          <SomeComponent />
        </Flex>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;

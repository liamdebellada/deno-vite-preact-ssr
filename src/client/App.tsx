import { useEffect, useState } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import {
  Avatar,
  Button,
  Code,
  Flex,
  Heading,
  Spinner,
  Text,
  Theme,
} from "@radix-ui/themes";

import type { AppRouter } from "../api/index.ts";
import type { ServerState } from "../api/server-state.ts";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
    }),
  ],
});

const Reactive = () => {
  const [count, setCount] = useState(0);

  return (
    <Flex>
      <Button onClick={() => setCount((count) => count + 1)}>
        +1
      </Button>
      <Text>Count is: {count}</Text>
    </Flex>
  );
};

function App(serverState: ServerState) {
  const [response, setResponse] = useState<{ someData: string }>();

  useEffect(() => {
    client.hello.query().then(setResponse);
  }, []);

  return (
    <Theme appearance="dark">
      <Flex direction="column">
        <Heading>React + Deno SSR</Heading>
        <Avatar fallback="R" src="/react.svg" />
        <Text>SSR url prop: {serverState.url}</Text>
        <Flex>
          <Text>TRPC client response:</Text>
          {response ? <Code>{JSON.stringify(response)}</Code> : <Spinner />}
        </Flex>
        <Reactive />
      </Flex>
    </Theme>
  );
}

export default App;

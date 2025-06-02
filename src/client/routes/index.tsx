import { Box, Code, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

import { useServerState } from "../providers/server-state/provider.tsx";

import { honoClient } from "../utils/hono-client.ts";

const Users = () => {
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

const Index = () => {
  const serverState = useServerState();

  return (
    <Flex direction="column">
      <Heading>Index route</Heading>
      <Users />
      <Code>From server: {JSON.stringify(serverState)}</Code>
    </Flex>
  );
};

export default Index;

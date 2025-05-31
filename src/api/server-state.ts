export type ServerState = {
  url: string;
};

export const getServerState = async (request: Request) => ({
  url: request.url,
} satisfies ServerState);

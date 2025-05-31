export type ServerState = {
  url: string;
};

export const getServerState = (request: Request) => ({
  url: request.url,
} satisfies ServerState);

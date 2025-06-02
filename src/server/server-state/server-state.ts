import { Context } from "hono";

export type ServerState = {
  url: string;
};

export const getServerState = (c: Context) => ({
  url: c.req.url,
} satisfies ServerState);

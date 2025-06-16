import { Context } from "hono";

export type ServerState = {
  url: string;
};

export const getServerState = (c: Context): ServerState => ({
  url: c.req.url,
});

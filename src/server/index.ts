import { Hono } from "hono";

import { handler, serveStatic } from "./ssr/index.ts";

const app = new Hono();

const route = app.get("/users", (c) => {
  return c.json([]);
});

app.get(
  "*",
  serveStatic,
  handler,
);

Deno.serve(app.fetch);

export type AppType = typeof route;

import { db } from "../db/index.ts";
import handler from "./handlers/index.ts";

import { Hono } from "hono";

const app = new Hono();

const route = app.get("/users", async (c) => {
  const users = await db.selectFrom("users").selectAll().execute();

  return c.json(users);
});

app.get("*", async (c) => {
  return await handler(c.req.raw);
});

Deno.serve(app.fetch);

export type AppType = typeof route;

import { Hono } from "hono";

import { handler, serveStatic } from "./ssr/index.ts";

import * as usersController from "./api/users/users.controller.ts";

const app = new Hono();

const route = app.get("/users", usersController.getUsers);

app.get(
  "*",
  serveStatic,
  handler,
);

Deno.serve(app.fetch);

export type AppType = typeof route;

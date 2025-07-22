import { Context } from "hono";
import * as usersService from "./users.service.ts";

export const getUsers = async (c: Context) => {
  const users = await usersService.getUsers();

  if (!users.isOk()) {
    return c.json({ error: users.error }, 400);
  }

  return c.json(users.value);
};

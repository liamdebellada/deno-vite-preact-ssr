import { Context } from "hono";
import * as usersService from "./users.service.ts";

export const getUsers = async (c: Context) => {
  const users = await usersService.getUsers();

  return c.json(users);
};

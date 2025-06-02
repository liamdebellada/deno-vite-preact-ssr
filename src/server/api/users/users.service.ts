import { db } from "../../../db/index.ts";

export const getUsers = async () =>
  await db.selectFrom("users").selectAll().execute();

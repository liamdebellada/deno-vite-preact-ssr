import { ResultAsync } from "neverthrow";

import { db } from "../../../db/index.ts";

export const getUsers = ResultAsync.fromThrowable(
  () => db.selectFrom("users").selectAll().execute(),
  () => "FAILED_TO_GET_USERS" as const,
);

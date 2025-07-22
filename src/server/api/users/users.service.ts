import { ResultAsync } from "neverthrow";

import { db } from "../../../db/index.ts";

export const getUsers = ResultAsync.fromThrowable(
  () => {
    throw new Error("fail");
    return db.selectFrom("users").selectAll().execute();
  },
  () => "FAILED_TO_GET_USERS" as const,
);

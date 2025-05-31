import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import env from "../env.ts";

const dialect = new PostgresDialect({
  pool: new Pool({
    max: env.DATABASE_POOL_SIZE,
    connectionString: env.DATABASE_URL,
  }),
});

type Database = {
  users: {
    id: number;
    name: string;
  };
};
export const db = new Kysely<Database>({ dialect });

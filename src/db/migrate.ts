import * as path from "node:path";
import { Pool } from "pg";
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";

import type { Database } from "./index.ts";
import env from "../env.ts";
import z from "zod";

const direction = z.union([z.literal("up"), z.literal("down")]).parse(
  Deno.args[0],
);

const readdir = async (path: string) => {
  const dir = await Array.fromAsync(Deno.readDir(path));

  return dir.map((v) => v.name);
};

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: env.DATABASE_URL,
    }),
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs: { readdir },
    path,
    migrationFolder: path.join(Deno.cwd(), "src/db/migrations"),
  }),
});

const { error, results } = await migrator
  [direction === "up" ? "migrateToLatest" : "migrateDown" as const]();

results?.forEach((it) => {
  if (it.status === "Success") {
    console.log(`migration "${it.migrationName}" was executed successfully`);
  } else if (it.status === "Error") {
    console.error(`failed to execute migration "${it.migrationName}"`);
  }
});

if (error) {
  console.error("failed to migrate");
  console.error(error);
  Deno.exit(1);
}

await db.destroy();

import { Kysely, sql } from "kysely";
import type { Database } from "../index.ts";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "char(21)", (col) => col.primaryKey())
    .addColumn("username", "varchar", (col) => col.notNull())
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("users").execute();
}

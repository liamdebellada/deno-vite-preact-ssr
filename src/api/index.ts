import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { db } from "../db/index.ts";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
  users: publicProcedure.input(z.string().nullish()).query(async () => {
    return await db.selectFrom("users").selectAll().execute();
  }),
});

export type AppRouter = typeof appRouter;

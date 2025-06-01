import { initTRPC } from "@trpc/server";

import { db } from "../../db/index.ts";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
  users: publicProcedure.query(async () => {
    return await db.selectFrom("users").selectAll().execute();
  }),
});

export type AppRouter = typeof appRouter;

import { z } from "zod";

export default z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_SIZE: z.coerce.number().min(1),
}).parse(Deno.env.toObject());

export const { handler, serveStatic } = Deno.env.get("ENV") === "development"
  ? await import("./dev.ts")
  : await import("./prod.ts");

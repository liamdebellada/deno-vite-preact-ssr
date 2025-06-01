const { handler } = Deno.env.get("ENV") === "development"
  ? await import("./dev.ts")
  : await import("./main.ts");

export default handler;

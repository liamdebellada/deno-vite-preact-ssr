export const createSSRHandler = <TState>(
  { getHtml, getServerState, getStaticFile }: {
    getServerState: (request: Request) => Promise<TState>;
    getHtml: (request: Request, serverState: TState) => Promise<string>;
    getStaticFile: (
      request: Request,
    ) => Promise<Response | void>;
  },
) =>
async (request: Request) => {
  const staticFileResponse = await getStaticFile(request);

  if (staticFileResponse) return staticFileResponse;

  const serverState = await getServerState(request);
  const html = await getHtml(request, serverState);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};

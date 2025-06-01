import {
  getServerState,
  type ServerState,
} from "../server-state/server-state.ts";

export const createSSRHandler = (
  { getHtml, getStaticFile }: {
    getHtml: (request: Request, serverState: ServerState) => Promise<string>;
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

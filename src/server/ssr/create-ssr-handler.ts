import { Context } from "hono";

import {
  getServerState,
  type ServerState,
} from "../server-state/server-state.ts";
import { ServerRenderResult } from "../../client/entrypoints/entry-server.tsx";

const renderHtml = (
  html: string,
  renderedReactHtml: string,
  serverState: ServerState,
) =>
  html
    .replace(`<!--app-html-->`, renderedReactHtml ?? "")
    .replace(`<!--sever-state-->`, JSON.stringify(serverState));

export const createSSRHandler = (
  { renderReactHtml, getAppShellHtml }: {
    renderReactHtml: (
      serverState: ServerState,
    ) => Promise<ServerRenderResult> | ServerRenderResult;
    getAppShellHtml: (context: Context) => Promise<string> | string;
  },
) =>
async (c: Context) => {
  const serverState = await getServerState(c);

  const appShellHtml = await getAppShellHtml(c);
  const { html: renderedReactHtml, routeRendered } = await renderReactHtml(
    serverState,
  );

  const renderedHtml = renderHtml(appShellHtml, renderedReactHtml, serverState);

  return new Response(renderedHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
    status: routeRendered ? 200 : 404,
  });
};

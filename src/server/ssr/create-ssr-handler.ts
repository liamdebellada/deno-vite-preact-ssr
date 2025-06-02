import { Context } from "hono";
import {
  getServerState,
  type ServerState,
} from "../server-state/server-state.ts";

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
    renderReactHtml: (serverState: ServerState) => Promise<string> | string;
    getAppShellHtml: (context: Context) => Promise<string> | string;
  },
) =>
async (c: Context) => {
  const serverState = await getServerState(c);

  const appShellHtml = await getAppShellHtml(c);
  const renderedReactHtml = await renderReactHtml(serverState);

  const renderedHtml = renderHtml(appShellHtml, renderedReactHtml, serverState);

  return new Response(renderedHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
};

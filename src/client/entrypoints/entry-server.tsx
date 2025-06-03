import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import type { ServerState } from "../../server/server-state/server-state.ts";

import App from "../app.tsx";

export type ServerRenderResult = {
  html: string;
  routeRendered: boolean;
};

export function render(serverState: ServerState): ServerRenderResult {
  let routeRendered = false;
  const onRouteRendered = () => routeRendered = true;

  const html = renderToString(
    <StaticRouter location={new URL(serverState.url).pathname}>
      <App serverState={serverState} onRouteRendered={onRouteRendered} />
    </StaticRouter>,
  );

  return { html, routeRendered };
}

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import type { ServerState } from "../../server/server-state/server-state.ts";

import App from "../App.tsx";

export function render(serverState: ServerState) {
  return renderToString(
    <StaticRouter location={new URL(serverState.url).pathname}>
      <App {...serverState} />
    </StaticRouter>,
  );
}

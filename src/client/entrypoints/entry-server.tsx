import { renderToString } from "react-dom/server";
import type { ServerState } from "../../api/server-state.ts";

import App from "../App.tsx";

export function render(serverState: ServerState) {
  const html = renderToString(<App {...serverState} />);

  return { html, head: undefined };
}

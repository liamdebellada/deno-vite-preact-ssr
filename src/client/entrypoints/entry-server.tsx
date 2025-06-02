import { renderToString } from "react-dom/server";
import type { ServerState } from "../../server/server-state/server-state.ts";

import App from "../App.tsx";

export function render(serverState: ServerState) {
  return renderToString(<App {...serverState} />);
}

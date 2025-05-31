import { renderToString } from "react-dom/server";

import App from "../App.tsx";

export function render(serverState: object) { // TODO: update type
  const html = renderToString(<App {...serverState} />);

  return { html, head: undefined };
}

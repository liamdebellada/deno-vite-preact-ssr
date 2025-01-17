import { renderToString } from "react-dom/server";

import App from "../App.tsx";

export function render(url: string) {
  const html = renderToString(<App url={url} />);

  return { html, head: undefined };
}

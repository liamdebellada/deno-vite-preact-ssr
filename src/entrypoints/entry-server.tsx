import { render as renderToString } from "preact-render-to-string";

import App from "../App.tsx";

export function render(url: string) {
  const html = renderToString(<App url={url} />);

  return { html, head: undefined };
}

import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "../app.tsx";

type GlobalThisWithServerState = typeof globalThis & { serverState: string };

const readServerData = () =>
  JSON.parse(
    (globalThis as GlobalThisWithServerState).serverState,
  );

hydrateRoot(
  document.getElementById("root")!,
  <BrowserRouter>
    <App {...readServerData()} />
  </BrowserRouter>,
);

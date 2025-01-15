import { hydrate } from "preact";

import App from "../App.tsx";

type GlobalThisWithServerState = typeof globalThis & { serverState: string };

const readServerData = () =>
  JSON.parse(
    (globalThis as GlobalThisWithServerState).serverState,
  );

hydrate(
  <App {...readServerData()} />,
  document.getElementById("root")!,
);

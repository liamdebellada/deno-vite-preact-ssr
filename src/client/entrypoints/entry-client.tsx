import { hydrateRoot } from "react-dom/client";

import App from "../App.tsx";

type GlobalThisWithServerState = typeof globalThis & { serverState: string };

const readServerData = () =>
  JSON.parse(
    (globalThis as GlobalThisWithServerState).serverState,
  );

hydrateRoot(
  document.getElementById("root")!,
  <App {...readServerData()} />,
);

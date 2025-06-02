import { PropsWithChildren, useContext } from "react";

import { context } from "./context.ts";
import type { ServerState } from "../../../server/server-state/server-state.ts";

export const ServerStateProvider = (
  { serverState, children }: PropsWithChildren<{ serverState: ServerState }>,
) => (
  <context.Provider value={serverState}>
    {children}
  </context.Provider>
);

export const useServerState = () => useContext(context);

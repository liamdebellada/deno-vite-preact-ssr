import { createContext } from "react";

import type { ServerState } from "../../../server/server-state/server-state.ts";

const defaultState = {
  url: "",
} satisfies ServerState;

export const context = createContext<ServerState>(defaultState);

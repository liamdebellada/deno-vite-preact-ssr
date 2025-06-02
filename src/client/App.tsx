import { Route, Routes } from "react-router";
import { Theme } from "@radix-ui/themes";
import type { ServerState } from "../server/server-state/server-state.ts";

import { QueryClientProvider } from "./utils/query-client.tsx";

import Index from "./routes/index.tsx";
import { ServerStateProvider } from "./providers/server-state/provider.tsx";

function App(serverState: ServerState) {
  return (
    <QueryClientProvider>
      <Theme appearance="dark">
        <ServerStateProvider serverState={serverState}>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </ServerStateProvider>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;

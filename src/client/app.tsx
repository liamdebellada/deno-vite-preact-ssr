import { Outlet, Route, Routes } from "react-router";
import { Theme } from "@radix-ui/themes";

import type { ServerState } from "../server/server-state/server-state.ts";

import { ServerStateProvider } from "./providers/server-state/provider.tsx";
import { QueryClientProvider } from "./utils/query-client.tsx";

import Index from "./routes/index.tsx";

const Layout = (
  { onRouteRendered }: { onRouteRendered: () => void },
) => {
  if (!globalThis.window) onRouteRendered();

  return <Outlet />;
};

function App(
  { serverState, onRouteRendered = () => {} }: {
    serverState: ServerState;
    onRouteRendered?: () => void;
  },
) {
  return (
    <QueryClientProvider>
      <Theme appearance="dark">
        <ServerStateProvider serverState={serverState}>
          <Routes>
            <Route element={<Layout onRouteRendered={onRouteRendered} />}>
              <Route index element={<Index />} />
            </Route>
          </Routes>
        </ServerStateProvider>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;

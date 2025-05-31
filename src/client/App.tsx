import "./App.css";

import { useEffect, useState } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "./api/index.ts";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
    }),
  ],
});

const Reactive = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        +1
      </button>
      <div>Count is: {count}</div>
    </div>
  );
};

function App({ url }: { url?: string }) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    client.hello.query().then(setResponse);
  }, []);

  return (
    <>
      <div>
        <h1>React + Deno SSR</h1>
        <img src="/react.svg" className="logo" alt="React logo" />
        <div>SSR url prop: {url}</div>
        <div>TRPC client response: {response}</div>
        <Reactive />
      </div>
    </>
  );
}

export default App;

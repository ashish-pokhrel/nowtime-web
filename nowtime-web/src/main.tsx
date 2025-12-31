import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeProvider } from "./theme/ColorModeProvider";
import { AxiosProvider } from "./api/AxiosProvider";
import { QueryProvider } from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <AxiosProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </AxiosProvider>
    </ColorModeProvider>
  </React.StrictMode>
);

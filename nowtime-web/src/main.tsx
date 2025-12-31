import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { ColorModeProvider } from "./theme/ColorModeProvider";
import { AxiosProvider } from "./api/AxiosProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <AxiosProvider>
        <App />
      </AxiosProvider>
    </ColorModeProvider>
  </React.StrictMode>
);

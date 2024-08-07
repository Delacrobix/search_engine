import React from "react";
import ReactDOM from "react-dom/client";
import { EuiProvider, EuiText } from "@elastic/eui";

import App from "./App.tsx";

import "@elastic/eui/dist/eui_theme_light.css";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EuiProvider colorMode='light'>
      <App />
    </EuiProvider>
  </React.StrictMode>
);

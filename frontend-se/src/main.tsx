import React from "react";
import ReactDOM from "react-dom/client";
import { EuiProvider } from "@elastic/eui";

import App from "./App.tsx";

import "./css/index.css";
// import "@elastic/eui/dist/eui_theme_light.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EuiProvider colorMode='light'>
      <App />
    </EuiProvider>
  </React.StrictMode>
);

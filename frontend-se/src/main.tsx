import React from "react";
import ReactDOM from "react-dom/client";
import { EuiProvider } from "@elastic/eui";

import App from "./App.tsx";

import "./css/index.css";
import { OptionsProvider } from "./context/optionsContext.tsx";
// import "@elastic/eui/dist/eui_theme_light.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EuiProvider colorMode='light'>
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </EuiProvider>
  </React.StrictMode>
);

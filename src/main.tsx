import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./containers/app";

import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

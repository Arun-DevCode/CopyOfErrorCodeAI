import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

// File Imports
import "./index.css";
import App from "@/router/AppRouter";
import { AppStore } from "@/store/index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={AppStore}>
      <App />
    </Provider>
    <Toaster />
  </StrictMode>,
);

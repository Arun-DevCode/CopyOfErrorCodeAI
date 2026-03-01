import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

// File Imports
import "./index.css";
import App from "@/router/AppRouter";
import { AppStore } from "@/store";
import { queryClient } from "@/Providers/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={AppStore}>
        <App />
        <Toaster position="top-right" />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);

import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./root/root";

// Komponent ichida useMemo ishlatish
function App() {
  const queryClient = useMemo(() => new QueryClient(), []); // Memoizatsiya

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Root />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RenderOptions, render } from "@testing-library/react";
import { StrictMode } from "react";
import "./index.css";
const queryClient = new QueryClient();

const renderWithProviders = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "queries"> | undefined
) => {
  return render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {ui}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
    options
  );
};

export { renderWithProviders };

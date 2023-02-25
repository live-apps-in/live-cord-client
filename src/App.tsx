import { useEffect } from "react";
import { Routes } from "src/routes";
import { createEventEmitters } from "src/utils";
import { ThemeProvider } from "src/theme";
import { AuthProvider } from "src/provider";

// redux
import { Provider as StoreProvider } from "react-redux";
import { store } from "src/redux";

// alert
import { SnackbarProvider } from "notistack";

// mui
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// emotion cache -- to make styles available in the entire component tree
// https://mui.com/guides/server-rendering/#heading-handling-the-request
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/createEmotionCache";

// to switch between light and dark mode (for future implementation)
// and for some font style changes
import CssBaseline from "@mui/material/CssBaseline";

// react-query setup -- https://react-query.tanstack.com/quick-start
import { QueryClientProvider, QueryClient } from "react-query";
import { CustomModal, ErrorBoundary, FlashMessage } from "src/components";
import { ReactQueryDevtools } from "react-query/devtools";

// global css
import "./assets/scss/global.scss";

const clientSideEmotionCache = createEmotionCache();

// react-query setup -- https://react-query.tanstack.com/quick-start
const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(createEventEmitters, []);
  return (
    <ErrorBoundary>
      <CacheProvider value={clientSideEmotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <StoreProvider store={store}>
              <ThemeProvider>
                <SnackbarProvider
                  maxSnack={6}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <CssBaseline />
                  <FlashMessage />
                  <CustomModal />
                  <AuthProvider>
                    <Routes />
                  </AuthProvider>
                </SnackbarProvider>
              </ThemeProvider>
            </StoreProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default App;

import { ThemeProvider as ThemeProviderWrapper } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { themeCreator } from "./utils";
import { useSelector } from "src/redux";

export const ThemeProvider: React.FC<any> = (props) => {
  const cache = createCache({
    key: "css",
    prepend: true,
  });
  const currentTheme = useSelector((state) => state.theme);

  const theme = themeCreator(currentTheme);
  return (
    <CacheProvider value={cache}>
      <ThemeProviderWrapper theme={theme}>
        {props.children}
      </ThemeProviderWrapper>
    </CacheProvider>
  );
};

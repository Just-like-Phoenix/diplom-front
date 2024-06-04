import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./theme";
import { useThemeChecker } from "hooks/useThemeChecker";
import { Global, css } from "@emotion/react";
import Router from "routes/Router";
import { ruRU as coreRuRU } from "@mui/material/locale";
import { ruRU } from "@mui/x-data-grid/locales";

function App() {
  const theme = createTheme(getDesignTokens(useThemeChecker() as PaletteMode), ruRU, coreRuRU);

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            background-color: ${theme.palette.background.default};
          }
          button[type="button"] {
            text-transform: none;
          }
          button[type="submit"] {
            text-transform: none;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.mode === "dark" ? "#272727" : "#fff"} inset !important;
          }
        `}
      />
      <Router />
    </ThemeProvider>
  );
}

export default App;

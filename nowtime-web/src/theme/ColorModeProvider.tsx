import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";
import { getDesignTokens } from "./theme";
import { ColorModeContext } from "./ColorModeContext";

const STORAGE_KEY = "color-mode";

function getInitialMode(): PaletteMode {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

  return prefersDark ? "dark" : "light";
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>(() => getInitialMode());

  const value = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem(STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

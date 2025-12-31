import type { PaletteMode } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: { main: "#7c4dff" },
          secondary: { main: "#00e5ff" },
          background: { default: "#0b0f19", paper: "#111827" },
        }
      : {
          primary: { main: "#5b34ff" },
          secondary: { main: "#0077ff" },
          background: { default: "#f6f7fb", paper: "#ffffff" },
        }),
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      '"Segoe UI"',
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 200ms ease, color 200ms ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { border: "1px solid rgba(0,0,0,0.06)" },
      },
    },
  },
});

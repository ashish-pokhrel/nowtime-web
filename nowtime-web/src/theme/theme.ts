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
          text: {
            primary: "rgba(255,255,255,0.92)",
            secondary: "rgba(255,255,255,0.72)",
          },
          divider: "rgba(255,255,255,0.10)",
        }
      : {
          primary: { main: "#5b34ff" },
          secondary: { main: "#0077ff" },
          // softer, eye-friendly light mode
          background: { default: "#f1f3f5", paper: "#fafafa" },
          text: { primary: "#111827", secondary: "#4b5563" },
          divider: "rgba(17,24,39,0.08)",
        }),
  },

  shape: { borderRadius: 12 },

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
      styleOverrides: (theme) => ({
        body: {
          transition: "background-color 200ms ease, color 200ms ease",
          minHeight: "100vh",

          // ✅ Global background: gradient only in dark mode
          background:
            theme.palette.mode === "dark"
              ? `
                radial-gradient(
                  900px circle at 15% 10%,
                  rgba(124,77,255,0.22),
                  transparent 60%
                ),
                radial-gradient(
                  700px circle at 85% 20%,
                  rgba(0,229,255,0.16),
                  transparent 60%
                ),
                ${theme.palette.background.default}
              `
              : theme.palette.background.default,

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },

        // keep root full height
        "#root": {
          minHeight: "100vh",
        },
      }),
    },

    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700 },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(17,24,39,0.08)",
        }),
      },
    },
  },
});

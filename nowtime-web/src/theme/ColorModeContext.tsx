import React from "react";
import type { PaletteMode } from "@mui/material";

export type ColorModeContextValue = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  mode: "dark",
  toggleColorMode: () => {},
});

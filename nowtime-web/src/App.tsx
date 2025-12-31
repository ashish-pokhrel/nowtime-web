import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "./theme/ColorModeContext";

export default function App() {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar sx={{ backdropFilter: "blur(10px)" }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            nowtime
          </Typography>

          <Box sx={{ flex: 1 }} />

          <IconButton onClick={toggleColorMode} aria-label="toggle theme" edge="end">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* rest of your UI */}
    </Box>
  );
}

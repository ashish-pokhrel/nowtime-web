import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../theme/ColorModeContext";
import styles from "../styles/Header.module.css";
import logo from "../assets/logo.png";
import { useContext } from "react";

export default function Header() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <div className={styles.brand}>
          <img src={logo} alt="Mangopuff" className={styles.logo} />
          <Typography className={styles.brandText}>mangopuff</Typography>
        </div>

        <div className={styles.spacer} />

        <Typography className={styles.helperText}>
          Pick a space to explore
        </Typography>

        <IconButton onClick={toggleColorMode}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

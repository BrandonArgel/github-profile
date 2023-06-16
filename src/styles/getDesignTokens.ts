import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "rgb(0, 160, 253)",
      ...(mode === "dark" && {
        contrastText: "#fff",
        dark: "rgb(0, 114, 232)",
        light: "rgb(112, 255, 250)",
        main: "rgb(0, 254, 118)",
      }),
      ...(mode === "light" && {
        contrastText: "#000",
        dark: "rgb(26, 115, 232)",
        light: "rgb(166, 212, 250)",
        main: "rgb(0, 160, 253)",
      }),
    },
    secondary: {
      main: "rgb(0, 254, 118)",
      ...(mode === "dark" && {
        contrastText: "#fff",
        dark: "rgb(0, 82, 204)",
        light: "rgb(112, 180, 255)",
        main: "rgb(0, 121, 255)",
      }),
      ...(mode === "light" && {
        contrastText: "#000",
        dark: "rgb(26, 115, 54)",
        light: "rgb(166, 212, 148)",
        main: "rgb(0, 254, 118)",
      }),
    },
    background: {
      ...(mode === "light" && {
        default: "rgb(246, 248, 255)",
        paper: "rgb(254, 254, 254)",
      }),
      ...(mode === "dark" && {
        default: "rgb(20 29 47)",
        paper: "rgb(30, 42, 71)",
      }),
    },
    text: {
      ...(mode === "light" && {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
      }),
      ...(mode === "dark" && {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(255, 255, 255, 0.6)",
        disabled: "rgba(255, 255, 255, 0.38)",
      }),
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 20,
  },
});
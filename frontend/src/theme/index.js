import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#38bdf8",
      light: "#bae6fd",
      dark: "#0284c7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#67e8f9",
      light: "#cffafe",
      dark: "#0891b2",
    },
    background: {
      default: mode === "light" ? "#eefaff" : "#07111f",
      paper: mode === "light" ? "rgba(255,255,255,0.52)" : "rgba(8,22,38,0.42)",
    },
    text: {
      primary: mode === "light" ? "#111827" : "#f4f7fb",
      secondary: mode === "light" ? "#5f6b7a" : "#aeb8c7",
    },
    divider: mode === "light" ? "rgba(17,24,39,0.1)" : "rgba(255,255,255,0.1)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Remove weird overlay in dark mode MUI
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

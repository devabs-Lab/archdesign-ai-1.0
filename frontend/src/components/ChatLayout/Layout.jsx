import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAppContext } from "../../context/AppContext";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sidebarOpen } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
        background:
          "radial-gradient(circle at 16% 18%, rgba(186,230,253,0.18), transparent 28%), radial-gradient(circle at 84% 22%, rgba(103,232,249,0.12), transparent 25%), linear-gradient(145deg, #06111f 0%, #0a1b2f 48%, #07111f 100%)",
        p: 0,
      }}
    >
      {/* Sidebar container with smooth collapse transition */}
      <Box
        sx={{
          width: {
            xs: 0,
            sm: sidebarOpen ? 280 : 0,
          },
          transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            sm: sidebarOpen ? "calc(100% - 280px)" : "100%",
          },
          transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          p: 0,
          minHeight: 0,
          bgcolor: "transparent",
        }}
      >
        <Box
          className="glass-panel"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "rgba(8, 22, 38, 0.42)",
            borderRadius: 0,
            overflow: "hidden",
            position: "relative",
            minHeight: 0,
            border: "1px solid rgba(224, 247, 255, 0.18)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

import { createContext, useState, useContext, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "../theme";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [activeSection, setActiveSection] = useState("chat");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const value = {
    mode,
    toggleColorMode,
    sidebarOpen,
    toggleSidebar,
    chats,
    setChats,
    currentChatId,
    setCurrentChatId,
    activeSection,
    setActiveSection,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

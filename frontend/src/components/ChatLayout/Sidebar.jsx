import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import { useAppContext } from "../../context/AppContext";

export default function Sidebar({ mobileOpen, handleDrawerToggle, isMobile }) {
  const {
    chats,
    setCurrentChatId,
    currentChatId,
    sidebarOpen,
    toggleSidebar,
    activeSection,
    setActiveSection,
  } = useAppContext();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 2,
              background:
                "linear-gradient(135deg, rgba(186,230,253,0.95), rgba(56,189,248,0.75))",
              mr: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrastText",
              boxShadow: "0 12px 28px rgba(56, 189, 248, 0.32)",
            }}
          >
            <ArchitectureIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0,
              color: "text.primary",
            }}
          >
            ArchDesign AI
          </Typography>
        </Box>
        <IconButton
          onClick={() => toggleSidebar()}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 2 }}>
        <ListItemButton
          onClick={() => {
            setCurrentChatId(null);
            setActiveSection("chat");
            if (isMobile) handleDrawerToggle();
          }}
          sx={{
            borderRadius: "20px",
            border: (theme) =>
              theme.palette.mode === "light"
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : "1px solid rgba(224, 247, 255, 0.2)",
            color: "text.primary",
            background:
              "linear-gradient(135deg, rgba(224,247,255,0.16), rgba(56,189,248,0.08))",
            backdropFilter: "blur(18px)",
            py: 0.75,
            px: 2,
            justifyContent: "center",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                ? "rgba(255,255,255,0.7)"
                  : "rgba(186,230,253,0.12)",
            },
          }}
        >
          <AddIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <ListItemText
            primary="New chat"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: "0.85rem",
              color: "text.primary",
            }}
            sx={{ flex: "none" }}
          />
        </ListItemButton>
      </Box>

      {/* Slim Search Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "18px",
            height: 32,
            fontSize: "0.8rem",
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255,255,255,0.58)"
                : "rgba(224,247,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "none",
            "& fieldset": {
              border: (theme) =>
                theme.palette.mode === "light"
                  ? "1px solid rgba(56,189,248,0.2)"
                  : "1px solid rgba(224,247,255,0.14)",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "1px",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary", fontSize: 16 }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Main Navigation List */}
      <List sx={{ px: 0, pt: 0, mb: 2 }}>
        {[
          { text: "Explore", value: "explore", icon: <LanguageIcon sx={{ fontSize: 16 }} /> },
          { text: "Library", value: "library", icon: <MenuBookIcon sx={{ fontSize: 16 }} /> },
          { text: "Files", value: "files", icon: <FolderIcon sx={{ fontSize: 16 }} /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              selected={activeSection === item.value}
              onClick={() => {
                setActiveSection(item.value);
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                py: 0.5,
                px: 1.5,
                color: activeSection === item.value ? "text.primary" : "text.secondary",
                bgcolor:
                  activeSection === item.value
                    ? (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(255,255,255,0.72)"
                          : "rgba(186,230,253,0.12)"
                    : "transparent",
                border: "1px solid",
                borderColor:
                  activeSection === item.value
                    ? "rgba(186,230,253,0.24)"
                    : "transparent",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.64)"
                      : "rgba(224,247,255,0.08)",
                  color: "text.primary",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography
        variant="caption"
        sx={{
          px: 1.5,
          py: 0.75,
          color: "text.secondary",
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          display: "block",
          mb: 0.5,
        }}
      >
        Recent
      </Typography>

      <List sx={{ flexGrow: 1, overflowY: "auto", px: 0 }}>
        {chats.length > 0 && (
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 1,
              color: "text.secondary",
              fontWeight: 600,
              display: "block",
            }}
          >
            Today
          </Typography>
        )}
        {chats.map((chat) => (
          <ListItem key={chat.id} disablePadding sx={{ mb: 0 }}>
            <ListItemButton
              selected={currentChatId === chat.id}
              onClick={() => {
                setCurrentChatId(chat.id);
                setActiveSection("chat");
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 2,
                py: 0.6,
                px: 1.5,
                mb: 0.25,
                bgcolor:
                  currentChatId === chat.id
                    ? (theme) =>
                        theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.05)"
                          : "rgba(186,230,253,0.1)"
                    : "transparent",
                color: "text.primary",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(0, 0, 0, 0.03)"
                      : "rgba(224,247,255,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50% 50% 50% 8px",
                    transform: "rotate(-8deg)",
                    position: "relative",
                    background: "transparent",
                    border: "2px solid rgba(255, 255, 255, 0.9)",
                    boxShadow:
                      currentChatId === chat.id
                        ? "0 0 0 1px rgba(255,255,255,0.12)"
                        : "none",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 7,
                      height: 7,
                      left: 2,
                      bottom: -5,
                      background: "transparent",
                      borderLeft: "2px solid rgba(255, 255, 255, 0.9)",
                      borderBottom: "2px solid rgba(255, 255, 255, 0.9)",
                      transform: "rotate(-45deg)",
                      borderRadius: "0 0 0 2px",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={chat.title || "New Conversation"}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "0.85rem",
                  color:
                    currentChatId === chat.id
                      ? "text.primary"
                      : "text.secondary",
                  fontWeight: currentChatId === chat.id ? 500 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          mt: "auto",
          pt: 2,
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: 2,
          bgcolor: "transparent",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Avatar src="" sx={{ width: 36, height: 36, mr: 1.5 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{ fontSize: "0.85rem", fontWeight: 600, color: "text.primary" }}
          >
            Abreham Semu
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            abreham@gmail.com
          </Typography>
        </Box>
        <IconButton size="small">
          <LogoutIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </IconButton>
      </Box>
    </Box>
  );

  const drawerWidth = 280;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: sidebarOpen ? drawerWidth : 0 },
        flexShrink: { sm: 0 },
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: sidebarOpen ? "block" : "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255,255,255,0.5)"
                : "rgba(8,22,38,0.46)",
            backdropFilter: "blur(28px) saturate(150%)",
            borderRight: "1px solid rgba(224,247,255,0.14)",
            transform: {
              xs: "none",
              sm: sidebarOpen ? "none" : "translateX(-280px)",
            },
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

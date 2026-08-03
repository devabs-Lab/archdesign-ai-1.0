import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FolderIcon from "@mui/icons-material/Folder";
import { useChat } from "../hooks/useChat";
import ChatMessage from "../components/Chat/ChatMessage";
import ChatInput from "../components/Chat/ChatInput";
import Layout from "../components/ChatLayout/Layout";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../context/AppContext";

// Simple pulsing dot skeleton
function TypingSkeleton() {
  return (
    <Box sx={{ display: "flex", gap: 1, p: 2, alignItems: "center" }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out 0.2s",
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          bgcolor: "primary.light",
          borderRadius: "50%",
          animation: "pulse 1.5s infinite ease-in-out 0.4s",
        }}
      />
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
    </Box>
  );
}

function SuggestionCard({ icon, title, desc }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 3,
        height: "100%",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(56,189,248,0.18)"
            : "rgba(224,247,255,0.16)",
        cursor: "pointer",
        transition: "all 0.2s",
        bgcolor: "rgba(224, 247, 255, 0.08)",
        backdropFilter: "blur(22px) saturate(150%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
        "&:hover": {
          bgcolor: "rgba(186, 230, 253, 0.13)",
          borderColor: "rgba(186,230,253,0.36)",
          transform: "translateY(-2px)",
          boxShadow: "0 18px 44px rgba(2,132,199,0.16)",
        },
      }}
    >
      <Box sx={{ color: "text.secondary", mb: 0.5 }}>{icon}</Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", lineHeight: 1.2, display: "block" }}
      >
        {desc}
      </Typography>
    </Paper>
  );
}

function SectionCard({ title, desc, action, onClick, index }) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.25,
        minHeight: 190,
        borderRadius: 3,
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "light" ? "rgba(56,189,248,0.18)" : "rgba(224,247,255,0.16)",
        bgcolor: "rgba(224, 247, 255, 0.075)",
        backdropFilter: "blur(26px) saturate(150%)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 20px 48px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.16)",
        "&:hover": onClick
          ? {
              borderColor: "rgba(186,230,253,0.36)",
              bgcolor: "rgba(186, 230, 253, 0.13)",
              transform: "translateY(-2px)",
              boxShadow: "0 26px 64px rgba(2,132,199,0.18)",
            }
          : undefined,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: -24,
          top: -24,
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: "rgba(186,230,253,0.1)",
        }}
      />
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: 2,
          mb: 2,
          display: "grid",
          placeItems: "center",
          color: "primary.contrastText",
          fontSize: "0.8rem",
          fontWeight: 800,
          background:
            "linear-gradient(135deg, rgba(186,230,253,0.96), rgba(56,189,248,0.78))",
          boxShadow: "0 12px 28px rgba(56,189,248,0.18)",
        }}
      >
        {index + 1}
      </Box>
      <Typography sx={{ fontWeight: 800, color: "text.primary", mb: 0.85 }}>
        {title}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.65 }}>
        {desc}
      </Typography>
      {action && (
        <Typography sx={{ color: "primary.light", fontSize: "0.82rem", mt: 2, fontWeight: 700 }}>
          {action}
        </Typography>
      )}
    </Paper>
  );
}

function SidebarSectionView({ section, onPrompt }) {
  const content = {
    explore: {
      icon: <LanguageOutlinedIcon sx={{ fontSize: 22 }} />,
      title: "Explore",
      subtitle: "Start from guided architecture topics instead of a blank chat.",
      eyebrow: "Guided discovery",
      note: "Choose a high-signal starting point and let ArchDesign AI turn it into a complete system-design conversation.",
      chips: ["Scalability", "Trade-offs", "System maps"],
      cards: [
        {
          title: "Design a scalable backend",
          desc: "Ask for services, database choices, queues, caching, and deployment shape.",
          prompt: "Design a scalable backend for an e-commerce platform.",
        },
        {
          title: "Compare architecture patterns",
          desc: "Understand when to use monoliths, microservices, event-driven systems, or serverless.",
          prompt: "Compare monolith, microservices, and event-driven architecture for a startup app.",
        },
        {
          title: "Improve an existing system",
          desc: "Describe your current app and get suggestions for reliability, performance, and maintainability.",
          prompt: "Help me improve the architecture of my existing web application.",
        },
      ],
    },
    library: {
      icon: <MenuBookIcon sx={{ fontSize: 22 }} />,
      title: "Library",
      subtitle: "A place for reusable system-design knowledge and saved prompts.",
      eyebrow: "Reusable knowledge",
      note: "Keep the core architecture concepts close, then launch directly into a focused explanation or checklist.",
      chips: ["Patterns", "Checklists", "Design notes"],
      cards: [
        {
          title: "Architectural thinking",
          desc: "Principles for breaking systems into components, trade-offs, and long-term maintainability.",
          prompt: "Explain architectural thinking in system design.",
        },
        {
          title: "API design checklist",
          desc: "A reusable guide for endpoints, auth, validation, versioning, errors, and documentation.",
          prompt: "Give me an API design checklist for a production backend.",
        },
        {
          title: "Database design guide",
          desc: "Learn how to choose SQL, NoSQL, indexes, relationships, consistency, and migrations.",
          prompt: "Explain how to design a database schema for a new application.",
        },
      ],
    },
    files: {
      icon: <FolderIcon sx={{ fontSize: 22 }} />,
      title: "Files",
      subtitle: "A polished space for future requirement uploads, exported designs, and project artifacts.",
      eyebrow: "Project artifacts",
      note: "This area can become the workspace for requirements, exported architecture docs, and supporting project context.",
      chips: ["Requirements", "Exports", "Documentation"],
      cards: [
        {
          title: "Upload requirements",
          desc: "Later, this can accept PDFs, docs, or text files and send their contents to the backend as context.",
        },
        {
          title: "Exported designs",
          desc: "Store generated architecture plans, API specs, diagrams, and implementation roadmaps here.",
        },
        {
          title: "Project documents",
          desc: "Keep PRDs, notes, and design decisions connected to each chat or architecture session.",
        },
      ],
    },
  }[section];

  return (
    <Box sx={{ width: "100%", maxWidth: 980, mx: "auto", p: { xs: 1.5, sm: 2.5 } }}>
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          p: { xs: 2.25, sm: 3 },
          borderRadius: 3,
          border: "1px solid rgba(224,247,255,0.18)",
          background:
            "linear-gradient(135deg, rgba(224,247,255,0.16), rgba(56,189,248,0.055))",
          backdropFilter: "blur(28px) saturate(150%)",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            right: -52,
            top: -60,
            borderRadius: "50%",
            background: "rgba(186,230,253,0.1)",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2 }}>
          <Box
            sx={{
              color: "primary.contrastText",
              display: "flex",
              p: 1.1,
              borderRadius: 2.5,
              background:
                "linear-gradient(135deg, rgba(186,230,253,0.96), rgba(56,189,248,0.78))",
              boxShadow: "0 14px 34px rgba(56,189,248,0.22)",
            }}
          >
            {content.icon}
          </Box>
          <Typography
            variant="overline"
            sx={{
              color: "primary.light",
              fontWeight: 800,
              letterSpacing: 1.4,
            }}
          >
            {content.eyebrow}
          </Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: "text.primary",
            letterSpacing: 0,
            fontSize: { xs: "2rem", sm: "2.75rem" },
            mb: 1,
          }}
        >
          {content.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: 680, lineHeight: 1.75, mb: 2 }}>
          {content.note}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {content.chips.map((chip) => (
            <Box
              key={chip}
              sx={{
                px: 1.25,
                py: 0.45,
                borderRadius: 999,
                color: "text.primary",
                fontSize: "0.78rem",
                border: "1px solid rgba(224,247,255,0.14)",
                background: "rgba(224,247,255,0.075)",
              }}
            >
              {chip}
            </Box>
          ))}
        </Box>
      </Paper>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 1.5 }}>
        {content.cards.map((card, index) => (
          <SectionCard
            key={card.title}
            title={card.title}
            desc={card.desc}
            action={card.prompt ? "Start this chat" : undefined}
            index={index}
            onClick={card.prompt ? () => onPrompt(card.prompt) : undefined}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function ChatPage() {
  const { messages, sendMessage, loading, error } = useChat();
  const bottomRef = useRef(null);
  const { toggleSidebar, sidebarOpen, activeSection, setActiveSection } = useAppContext();

  const handleSectionPrompt = (prompt) => {
    setActiveSection("chat");
    sendMessage(prompt);
  };

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Layout>
      {/* Topbar: Must not shrink */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 1.5 },
          py: 1.2,

          borderBottom: messages.length > 0 ? "1px solid" : "none",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(56,189,248,0.16)"
              : "rgba(224,247,255,0.1)",
          background:
            "linear-gradient(180deg, rgba(224,247,255,0.1), rgba(224,247,255,0.02))",
          backdropFilter: "blur(18px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!sidebarOpen && (
            <IconButton
              onClick={toggleSidebar}
              sx={{
                mr: 1,
                p: 0.5,
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
          )}
          <Button
            endIcon={<ExpandMoreIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              textTransform: "none",
              color: "text.primary",
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: "rgba(224,247,255,0.1)",
              border: "1px solid rgba(224,247,255,0.16)",
              borderRadius: 8,
              px: 1.5,
              py: 0.5,
              height: 38,
              "&:hover": {
                bgcolor: "rgba(186,230,253,0.16)",
              },
            }}
          >
            ArchDesign AI
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
          <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
            <MoreHorizIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
            <LinkIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon sx={{ fontSize: "14px !important" }} />}
            sx={{
              textTransform: "none",
              borderRadius: 8,
              ml: 0.5,
              height: 38,
              px: 1.5,
              fontSize: "0.86rem",
              borderColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(56,189,248,0.18)"
                  : "rgba(224,247,255,0.18)",
              color: "text.primary",
              bgcolor: "rgba(224,247,255,0.06)",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(56, 189, 248, 0.1)",
              },
            }}
          >
            Export chat
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 8,
              height: 38,
              px: 1.5,
              fontSize: "0.86rem",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              boxShadow: "0 14px 30px rgba(56, 189, 248, 0.22)",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Upgrade
          </Button>
        </Box>
      </Box>

      {/* Scrollable middle container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 840,
            mx: "auto",
            p: { xs: 0.75, sm: 1.25 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {activeSection !== "chat" ? (
            <SidebarSectionView section={activeSection} onPrompt={handleSectionPrompt} />
          ) : messages.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 2,
                pb: 1,
                m: "auto",
              }}
            >
              <Box className="brand-mark" sx={{ mb: 2 }}>
                AI
              </Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  color: "primary.light",
                  mb: 1,
                  textAlign: "center",
                  letterSpacing: 1.5,
                }}
              >
                Architecture intelligence
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  textAlign: "center",
                  letterSpacing: 0,
                  mb: 1,
                  fontSize: { xs: "2rem", sm: "3rem" },
                }}
              >
                Design systems with clarity.
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  maxWidth: 620,
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                Turn rough product ideas into clean architecture, API plans,
                database choices, scaling strategies, and deployment roadmaps.
              </Typography>

              {/* Suggestions forced into horizontal row */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1.5,
                  width: "100%",
                  mb: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<MoreHorizIcon />}
                    title="Synthesize Data"
                    desc="Turn messy requirements into clear components, services, and constraints."
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<LightbulbOutlinedIcon />}
                    title="Creative Brainstorm"
                    desc="Explore architecture options, trade-offs, and implementation paths."
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SuggestionCard
                    icon={<MoreHorizIcon />}
                    title="Check Facts"
                    desc="Review scalability, security, reliability, and deployment assumptions."
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {loading && (
                <Box sx={{ mb: 3 }}>
                  <TypingSkeleton />
                </Box>
              )}
              {error && (
                <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}

          <div ref={bottomRef} />
        </Box>
      </Box>

      {/* Frozen Footer Box */}
      <Box
        sx={{
          flexShrink: 0,
          pt: 0,
          pb: 0,
          width: "100%",
          maxWidth: 840,
          mx: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <ChatInput onSendMessage={sendMessage} disabled={loading} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 0.75,
            position: "relative",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Join the AI developers community for more insights{" "}
            <span
              style={{
                color: "#0d9488",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Join Discord
            </span>
          </Typography>
          <Box
            sx={{ position: "absolute", right: 16, display: "flex", gap: 1 }}
          >
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#e8e6e1"
                    : "rgba(255,255,255,0.1)",
                color: "text.secondary",
              }}
            >
              <LanguageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#e8e6e1"
                    : "rgba(255,255,255,0.1)",
                color: "text.secondary",
              }}
            >
              <HelpOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

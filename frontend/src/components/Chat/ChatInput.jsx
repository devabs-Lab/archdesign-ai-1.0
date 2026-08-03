import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", px: { xs: 0.75, sm: 1 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 1.2,
          borderRadius: "22px",
          bgcolor: "rgba(224, 247, 255, 0.1)",
          backdropFilter: "blur(24px) saturate(150%)",
          border: (theme) =>
            theme.palette.mode === "light"
              ? "1px solid rgba(56,189,248,0.2)"
              : "1px solid rgba(224,247,255,0.18)",
          mb: 1,
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.18)",
          transition: "all 0.2s",
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow:
              "0 28px 72px rgba(56,189,248,0.2), inset 0 1px 0 rgba(255,255,255,0.24)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, mb: 0.5 }}>
          <TextField
            fullWidth
            placeholder="Ask for an architecture, API plan, database design..."
            multiline
            maxRows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "0.95rem",
                color: "inherit",
                paddingLeft: "4px",
                paddingRight: "4px",
              },
            }}
            sx={{
              flexGrow: 1,
              "& .MuiInput-underline:before": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none !important",
              },
            }}
          />

          {/* Ultra-sleek Send Button - Positioned UP like ChatGPT/Grok */}
          <Box
            onClick={handleSend}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: input.trim()
                ? "linear-gradient(135deg, #38bdf8, #67e8f9)"
                : "rgba(186,230,253,0.28)",
              color: "#fff",
              mb: 0.25,
              boxShadow: input.trim()
                ? "0 14px 30px rgba(56,189,248,0.3)"
                : "none",
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 0.5,
          }}
        >
          {/* Left Actions */}
          <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <AutoAwesomeIcon sx={{ fontSize: "9px !important" }} />
              }
              sx={{
                height: 20,
                borderRadius: "14px",
                textTransform: "none",
                fontSize: "0.5rem",
                borderColor: "primary.light",
                color: "primary.main",
                bgcolor: "rgba(186,230,253,0.1)",
                px: 1.2,
                py: 0,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "rgba(186,230,253,0.16)",
                  borderColor: "primary.main",
                },
              }}
            >
              Deeper Research
            </Button>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <ImageIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <LightbulbOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <SettingsOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <IconButton size="small" sx={{ p: 0.5, color: "text.secondary" }}>
              <LanguageOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Bottom bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            color: "text.primary",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 14, color: "primary.main" }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              fontSize: "0.75rem",
              color: "text.secondary",
            }}
          >
            Saved prompts
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AttachFileIcon sx={{ fontSize: "13px !important" }} />}
          sx={{
            height: 26,
            borderRadius: "13px",
            textTransform: "none",
            fontSize: "0.75rem",
            color: "text.secondary",
            borderColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(56,189,248,0.18)"
                : "rgba(224,247,255,0.14)",
            px: 1.5,
            py: 0,
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(56,189,248,0.08)"
                  : "rgba(224,247,255,0.08)",
              borderColor: "text.secondary",
            },
          }}
        >
          Attach file
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Typography, Avatar, Paper } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  // Simple markdown formatting (split paragraphs, basic bold simulation)
  const renderContent = (text) => {
    return text.split("\n").map((str, idx) => {
      if (str.startsWith("###")) {
        return (
          <Typography
            key={idx}
            variant="h6"
            sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
          >
            {str.replace("###", "").trim()}
          </Typography>
        );
      }
      if (str.startsWith("* ")) {
        return (
          <Box component="li" key={idx} sx={{ ml: 2, mb: 0.5 }}>
            <Typography variant="body1">{str.replace("* ", "")}</Typography>
          </Box>
        );
      }
      return (
        <Typography
          key={idx}
          variant="body1"
          sx={{ mb: 1, minHeight: str ? 0 : "1rem" }}
        >
          {str}
        </Typography>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1.25,
        px: { xs: 0.5, sm: 1 },
      }}
    >
      {!isUser && (
        <Avatar
          sx={{
            background: "linear-gradient(135deg, #bae6fd, #38bdf8)",
            mr: 1,
            width: 30,
            height: 30,
            boxShadow: "0 12px 28px rgba(56,189,248,0.24)",
          }}
        >
          <AutoAwesomeIcon fontSize="small" />
        </Avatar>
      )}

      <Paper
        elevation={0}
        sx={{
          px: 1.6,
          py: 1.05,
          maxWidth: { xs: "86%", sm: "76%" },
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          bgcolor: isUser ? "rgba(56,189,248,0.78)" : "rgba(224,247,255,0.1)",
          backdropFilter: "blur(22px) saturate(150%)",
          border: "1px solid",
          borderColor: isUser ? "rgba(186,230,253,0.4)" : "rgba(224,247,255,0.14)",
          color: isUser ? "primary.contrastText" : "text.primary",
          position: "relative",
          boxShadow: isUser
            ? "0 10px 28px rgba(56,189,248,0.14)"
            : "0 10px 28px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {renderContent(message.content)}
      </Paper>
    </Box>
  );
}

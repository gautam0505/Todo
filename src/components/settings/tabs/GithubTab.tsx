import { ContentCopyRounded } from "@mui/icons-material";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        position: "relative",
      }}
    >
      <code>{children}</code>
      <Tooltip title={copied ? "Copied!" : "Copy"}>
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <ContentCopyRounded fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

const GithubTab = () => {
  const correctUrl = "https://github.com/gautam0505/Todo.git";

  return (
    <Stack spacing={2}>
      <Alert severity="error">
        <Typography variant="body2">
          The error `remote origin already exists` occurs when you try to use `git remote add` for a
          remote that is already configured.
        </Typography>
      </Alert>
      <Typography variant="body1">
        To fix this, you need to update the URL of your existing 'origin' remote.
      </Typography>
      <Box>
        <Typography variant="body2" gutterBottom>
          1. Use the `set-url` command to change the remote's URL:
        </Typography>
        <CodeBlock>git remote set-url origin {correctUrl}</CodeBlock>
      </Box>
      <Box>
        <Typography variant="body2" gutterBottom>
          2. Verify that the remote URL has been changed:
        </Typography>
        <CodeBlock>git remote -v</CodeBlock>
        <Typography variant="body2" sx={{ mt: 1 }}>
          The output should now show your correct repository URL for both fetch and push.
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" gutterBottom>
          3. Now, you should be able to push your changes:
        </Typography>
        <CodeBlock>git push -u origin main</CodeBlock>
      </Box>
    </Stack>
  );
};

export default GithubTab;

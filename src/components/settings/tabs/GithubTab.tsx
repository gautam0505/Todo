import { Alert, AlertTitle, Box, Link, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export default function GithubTab() {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <GitHub /> GitHub Repository
      </Typography>

      <Alert severity="info">
        <AlertTitle>Open Source Project</AlertTitle>
        This is an open-source project. You can view the source code, report issues, or contribute
        on GitHub.
      </Alert>

      <Box sx={{ mt: 2 }}>
        <Link
          href="https://github.com/gautam0505/Todo"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GitHub /> View on GitHub
        </Link>
      </Box>
    </Box>
  );
}

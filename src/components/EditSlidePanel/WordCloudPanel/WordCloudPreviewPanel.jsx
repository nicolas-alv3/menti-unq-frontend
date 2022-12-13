import { Container, Paper, Typography } from "@mui/material";
import * as React from "react";

export function WordCloudPreviewPanel({ question }) {
  const paperSx = {
    height: "95%",
    width: "100%",
    borderRadius: "0",
    padding: "0.5em",
  };
  const containerSx = {
    backgroundColor: "#E7E8EB",
    display: "flex",
    alignItems: "center",
    width: "150%",
  };

  return (
    <Container sx={containerSx}>
      <Paper sx={paperSx}>
        <Typography mb={4} variant="h4">
          {question}
        </Typography>
      </Paper>
    </Container>
  );
}

import { Container, Paper, Typography } from "@mui/material";
import * as React from "react";
import { BarChart } from "../BarChart";
import { optionsToBarChartData } from "./utils";

export function MCQPreviewPanel({ question, options }) {
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
        <BarChart data={optionsToBarChartData(options)} />
      </Paper>
    </Container>
  );
}

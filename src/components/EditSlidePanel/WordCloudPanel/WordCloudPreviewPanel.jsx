import { Container, Paper, Typography } from "@mui/material";
import * as React from "react";
import ReactWordcloud from "react-wordcloud";

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

  const words = [
    {
      text: "argentina",
      value: 20,
    },
    {
      text: "aprobados",
      value: 11,
    },
    {
      text: "mundial",
      value: 9,
    },
    {
      text: "messi",
      value: 31,
    },
    {
      text: "scaloneta",
      value: 37,
    },
    {
      text: "texto",
      value: 4,
    },
    {
      text: "copa",
      value: 20,
    },
    {
      text: "qatar",
      value: 22,
    },
    {
      text: "anda'paya",
      value: 24,
    },
  ];
  return (
    <Container sx={containerSx}>
      <Paper sx={paperSx}>
        <Typography mb={4} variant="h4">
          {question}
        </Typography>
        <ReactWordcloud
          words={words}
          options={{
            fontSizes: [30, 80],
            scale: "log",
            rotations: 1,
            rotationAngles: [0],
            padding: 1,
          }}
        />
      </Paper>
    </Container>
  );
}

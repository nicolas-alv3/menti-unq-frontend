import { TextField, Typography } from "@mui/material";
import * as React from "react";

export function WordCloudEditionPanel({ slide, onChange }) {
  return (
    <>
      <Typography marginBottom={2} variant="h5">
        Pregunta:{" "}
      </Typography>
      <TextField
        fullWidth
        sx={{ marginBottom: "1em" }}
        value={slide.question}
        onChange={(e) => onChange({ ...slide, question: e.target.value })}
      />
    </>
  );
}

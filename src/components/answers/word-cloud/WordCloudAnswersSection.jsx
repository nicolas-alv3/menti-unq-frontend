import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import AnswerService from "../../../service/AnswerService";

export function WordCloudAnswersSection({
  question,
  slideId,
  setSuccess,
  startPolling,
}) {
  const [text, setText] = useState("");

  function handleSubmit() {
    AnswerService.answer(text, slideId).then(() => {
      setSuccess(true);
      startPolling();
    });
  }

  return (
    <>
      <Typography style={{ marginBottom: "1em" }} variant="h5">
        {question || ""}
      </Typography>
      <div>
        <TextField
          placeholder="Escribí aca tu respuesta"
          sx={{ width: "40vw", marginBottom: "2em" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        sx={{ width: "24em" }}
        onClick={() => handleSubmit()}
      >
        Enviar
      </Button>
    </>
  );
}

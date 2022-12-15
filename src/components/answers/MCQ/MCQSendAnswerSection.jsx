import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import AnswerService from "../../../service/AnswerService";
import { MCQVoteOption } from "./MCQVoteOption";

export function MCQSendAnswerSection({
  question,
  options,
  slideId,
  setSuccess,
  startPolling,
}) {
  const [selected, setSelected] = useState(null);

  function handleSubmit() {
    AnswerService.answer(options[selected], slideId).then(() => {
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
        {options.map((o, i) => (
          <MCQVoteOption
            id={i}
            key={o}
            text={o}
            selected={selected === i}
            onClick={() => setSelected(i)}
          />
        ))}
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

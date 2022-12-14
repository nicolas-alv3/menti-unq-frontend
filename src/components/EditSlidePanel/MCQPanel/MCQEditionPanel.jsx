import { TextField, Typography } from "@mui/material";
import * as React from "react";
import { MCQOption } from "./MCQOption";
import { AddOptionButton } from "./AddOptionButton";

export function MCQEditionPanel({ slide, onChange }) {
  const updateOption = (optionIndex) => (newOption) => {
    const newOptions = [...slide.options];
    newOptions[optionIndex] = newOption;

    onChange({ ...slide, options: newOptions });
  };

  const removeOption = (optionIndex) => {
    onChange({
      ...slide,
      options: slide.options.filter((_, i) => i !== optionIndex),
    });
  };

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
      <Typography marginBottom={2} variant="h5">
        Opciones:{" "}
      </Typography>
      {slide.options.map((option, optionIndex) => (
        <MCQOption
          editable
          key={`mcq-option-${optionIndex}`}
          option={option}
          updateOption={updateOption(optionIndex)}
          removeOption={() => removeOption(optionIndex)}
        />
      ))}
      <AddOptionButton
        onClick={() => {
          onChange({
            ...slide,
            options: [...slide.options, `Opción ${slide.options.length + 1}`],
          });
        }}
      />
    </>
  );
}

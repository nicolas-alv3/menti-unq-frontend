import {
  Box,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { TabPanel } from "../TabPanel";
import { MCQOption } from "./MCQOption";
import { AddOptionButton } from "./AddOptionButton";
import { MCQPreviewPanel } from "./MCQPreviewPanel";

export function MCQPanel({ index, onChange, selectedTab, slide }) {
  function updateOption(optionIndex) {
    return (newOption) => {
      const newOptions = [...slide.options];
      newOptions[optionIndex] = newOption;

      onChange({ ...slide, options: newOptions });
    };
  }

  const boxSx = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };
  return (
    <TabPanel
      key={`mcq-panel-${index}`}
      index={index}
      show={selectedTab === index}
    >
      <Box sx={boxSx}>
        {/* PREVIEW */}
        <MCQPreviewPanel question={slide.question} options={slide.options} />
        {/* TIPO DE PREGUNTA */}
        {/*  EDITAR */}
        <Container>
          <Select value="MCQ" size="small">
            <MenuItem value="MCQ">Multiple-Choice</MenuItem>
          </Select>
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
              removeOption={() => {
                onChange({
                  ...slide,
                  options: slide.options.filter((_, i) => i !== optionIndex),
                });
              }}
            />
          ))}
          <AddOptionButton
            onClick={() => {
              onChange({
                ...slide,
                options: [
                  ...slide.options,
                  `Opción ${slide.options.length + 1}`,
                ],
              });
            }}
          />
        </Container>
      </Box>
    </TabPanel>
  );
}

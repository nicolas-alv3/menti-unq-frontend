import { Box, Container, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { TabPanel } from "../TabPanel";
import { MCQPreviewPanel } from "./MCQPanel/MCQPreviewPanel";
import { MCQEditionPanel } from "./MCQPanel/MCQEditionPanel";

export function EditSlidePanel({ index, onChange, selectedTab, slide }) {
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
          <MCQEditionPanel onChange={onChange} slide={slide} />
        </Container>
      </Box>
    </TabPanel>
  );
}

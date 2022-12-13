import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { TabPanel } from "../TabPanel";
import { MCQPreviewPanel } from "./MCQPanel/MCQPreviewPanel";
import { MCQEditionPanel } from "./MCQPanel/MCQEditionPanel";
import { WordCloudEditionPanel } from "./WordCloudPanel/WordCloudEditionPanel";
import { WordCloudPreviewPanel } from "./WordCloudPanel/WordCloudPreviewPanel";

export const slideTypes = {
  mcq: "MCQ",
  wordCloud: "WORD_CLOUD",
};

export function EditSlidePanel({ index, onChange, selectedTab, slide }) {
  const [slideType, setSlideType] = useState(slideTypes.mcq);

  const boxSx = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  };

  function resolveEditionPanel() {
    switch (slideType) {
      case slideTypes.mcq:
        return <MCQEditionPanel onChange={onChange} slide={slide} />;
      case slideTypes.wordCloud:
        return <WordCloudEditionPanel slide={slide} onChange={onChange} />;
      default:
        return <MCQEditionPanel onChange={onChange} slide={slide} />;
    }
  }

  function resolvePreviewPanel() {
    switch (slideType) {
      case slideTypes.mcq:
        return (
          <MCQPreviewPanel options={slide.options} question={slide.question} />
        );
      case slideTypes.wordCloud:
        return <WordCloudPreviewPanel question={slide.question} />;
      default:
        return (
          <MCQPreviewPanel options={slide.options} question={slide.question} />
        );
    }
  }

  const selectSx = {
    margin: "1em 0",
  };

  function handleTypeChange(e) {
    setSlideType(e.target.value);
    onChange({ ...slide, type: e.target.value });
  }

  return (
    <TabPanel
      key={`mcq-panel-${index}`}
      index={index}
      show={selectedTab === index}
    >
      <Box sx={boxSx}>
        {/* PREVIEW */}
        {resolvePreviewPanel()}
        {/*  EDITAR */}
        <Container>
          <Box sx={selectSx}>
            <Typography variant="h5">Variante de slide: </Typography>
            <Select
              value={slideType}
              size="small"
              onChange={(e) => handleTypeChange(e)}
            >
              <MenuItem value={slideTypes.mcq}>Multiple-Choice</MenuItem>
              <MenuItem value={slideTypes.wordCloud}>Nube de palabras</MenuItem>
            </Select>
          </Box>
          {resolveEditionPanel()}
        </Container>
      </Box>
    </TabPanel>
  );
}

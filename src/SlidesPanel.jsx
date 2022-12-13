import * as React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MultipleChoiceIcon from "@mui/icons-material/Leaderboard";
import CloudIcon from "@mui/icons-material/Cloud";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  EditSlidePanel,
  slideTypes,
} from "./components/EditSlidePanel/EditSlidePanel";

function DeleteSlideButton(props) {
  return (
    <IconButton
      sx={{
        alignSelf: "flex-end",
        color: "light-grey",
        ":hover": { color: "black", cursor: "click" },
        fontSize: "16px",
        width: "20px",
      }}
      onClick={props.onClick}
    >
      <Delete fontSize="16px" />
    </IconButton>
  );
}

function MCQMiniPreview() {
  return (
    <Box
      sx={{
        padding: "0.5em 0.7em",
        border: "solid 1px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <MultipleChoiceIcon />
      <Typography variant="subtitle2">Multiple-Choice</Typography>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function WordMiniCloudPreview() {
  return (
    <Box
      sx={{
        padding: "0.5em 0.7em",
        border: "solid 1px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <CloudIcon />
      <Typography variant="subtitle2">Nube de palabras</Typography>
    </Box>
  );
}

function resolveTabPreview(type) {
  switch (type) {
    case slideTypes.mcq:
      return <MCQMiniPreview />;
    case slideTypes.wordCloud:
      return <WordMiniCloudPreview />;
    default:
      return <MCQMiniPreview />;
  }
}

export function SlidesPanel({
  slides,
  slideChange,
  deleteSlide,
  handleSortUp,
  handleSortDown,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Tabs
        value={selectedTab}
        orientation="vertical"
        variant="scrollable"
        sx={{ borderColor: "black", height: "90%" }}
      >
        {slides.map((slide, i) => (
          <Tab
            key={i.toString()}
            component={() => (
              <Container
                onClick={() => setSelectedTab(i)}
                sx={{
                  height: "5.3em",
                  backgroundColor: selectedTab === i ? "#D3E1FF" : "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: "0 !important",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography
                    justifySelf="flex-start"
                    ml={0.5}
                  >{`${slide.presentationOrder}.`}</Typography>
                  <DeleteSlideButton onClick={() => deleteSlide(i)} />
                </Box>
                {resolveTabPreview(slide.type)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "0.5em",
                  }}
                >
                  {i !== 0 && (
                    <IconButton
                      sx={{ padding: "0" }}
                      onClick={() => {
                        handleSortUp(i);
                      }}
                    >
                      <KeyboardArrowUp />
                    </IconButton>
                  )}
                  {i !== slides.length - 1 && (
                    <IconButton
                      sx={{ padding: "0" }}
                      onClick={() => handleSortDown(i)}
                    >
                      <KeyboardArrowDown />
                    </IconButton>
                  )}
                </Box>
              </Container>
            )}
          />
        ))}
      </Tabs>
      {slides.map((slide, index) => {
        return (
          <EditSlidePanel
            index={index}
            selectedTab={selectedTab}
            slide={slide}
            onChange={(newSlide) => {
              slideChange(index, newSlide);
            }}
          />
        );
      })}
    </>
  );
}

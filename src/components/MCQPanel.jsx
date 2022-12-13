import {
  Box,
  Button,
  Container,
  Paper,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import * as PropTypes from "prop-types";
import { TabPanel } from "./TabPanel";
import { BarChart } from "./BarChart";

function EditableMCQOption(props) {
  return (
    <Box
      id={props.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1em",
      }}
    >
      <Radio disabled checked />
      <TextField
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        sx={{ width: "40%" }}
      />
      <Button onClick={props.onClick}>
        <DeleteIcon />
      </Button>
    </Box>
  );
}

function StaticMCQOption(props) {
  return (
    <Box
      id={props.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1em",
      }}
    >
      <Radio disabled checked />
      <Typography variant="outlined" sx={{ marginRight: "1em", width: "25%" }}>
        {props.option}
      </Typography>
    </Box>
  );
}

function MCQOption({ option, updateOption, id, removeOption, editable }) {
  return editable ? (
    <EditableMCQOption
      id={id}
      value={option}
      onChange={(e) => updateOption(e.target.value)}
      onClick={removeOption}
    />
  ) : (
    <StaticMCQOption id={id} option={option} />
  );
}

function AddOptionButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{ width: "50%", marginLeft: "3em" }}
      variant="outlined"
    >
      Agregar opción
    </Button>
  );
}

AddOptionButton.propTypes = { onClick: PropTypes.func };

function optionsToBarChartData(options) {
  return options.map((i) => {
    return { label: i };
  });
}

export function MCQPanel({ index, onChange, selectedTab, slide }) {
  function updateOption(optionIndex) {
    return (newOption) => {
      const newOptions = [...slide.options];
      newOptions[optionIndex] = newOption;

      onChange({ ...slide, options: newOptions });
    };
  }

  return (
    <TabPanel
      key={`mcq-panel-${index}`}
      index={index}
      show={selectedTab === index}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Container
          sx={{
            backgroundColor: "#E7E8EB",
            display: "flex",
            alignItems: "center",
            width: "150%",
          }}
        >
          <Paper
            sx={{
              height: "95%",
              width: "100%",
              borderRadius: "0",
              padding: "0.5em",
            }}
          >
            <Typography mb={4} variant="h4">
              {slide.question}
            </Typography>
            <BarChart data={optionsToBarChartData(slide.options)} />
          </Paper>
        </Container>
        <Container>
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

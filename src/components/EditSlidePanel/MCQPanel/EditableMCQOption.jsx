import { Box, Button, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

export function EditableMCQOption({ id, onChange, onClick, value }) {
  return (
    <Box
      id={id}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1em",
      }}
    >
      <Radio disabled checked />
      <TextField
        value={value}
        onChange={onChange}
        variant="outlined"
        sx={{ width: "40%" }}
      />
      <Button onClick={onClick}>
        <DeleteIcon />
      </Button>
    </Box>
  );
}

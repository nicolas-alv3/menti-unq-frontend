import { Box, Radio, Typography } from "@mui/material";
import React from "react";

export function MCQVoteOption({ id, text, selected, onClick }) {
  const styles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1em",
    border: "1px solid lightgray",
    borderRadius: 2,
    padding: "6px",
    width: "20em",
    cursor: "pointer",
  };
  return (
    <Box onClick={onClick} id={id} sx={styles}>
      <Radio checked={selected} />
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}

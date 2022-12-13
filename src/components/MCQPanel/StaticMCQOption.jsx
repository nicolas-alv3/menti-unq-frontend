import { Box, Radio, Typography } from "@mui/material";
import * as React from "react";

export function StaticMCQOption({ id, option }) {
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
      <Typography variant="outlined" sx={{ marginRight: "1em", width: "25%" }}>
        {option}
      </Typography>
    </Box>
  );
}

import { Box } from "@mui/material";
import * as React from "react";

export function TabPanel(props) {
  const { children, value, index, show, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={!show}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      {show && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  );
}

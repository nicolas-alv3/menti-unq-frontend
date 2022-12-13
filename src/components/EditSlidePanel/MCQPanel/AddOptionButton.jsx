import { Button } from "@mui/material";
import * as React from "react";

export function AddOptionButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{ width: "50%", marginLeft: "3em" }}
      variant="outlined"
    >
      Agregar opción
    </Button>
  );
}

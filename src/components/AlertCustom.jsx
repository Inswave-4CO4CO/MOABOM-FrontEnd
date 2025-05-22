import React from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const AlertCustom = ({
  successOpen,
  handleCloseSnackbar,
  title,
  comment,
  color,
}) => {
  return (
    <Snackbar
      open={successOpen}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity="success" color={color}>
        <AlertTitle>{title}</AlertTitle>
        {comment}
      </Alert>
    </Snackbar>
  );
};

export default AlertCustom;

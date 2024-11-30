import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackBar = ({ open, handleClose, message, severity, anchorOrigin }) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin} // Use the passed anchorOrigin prop
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  };

export default CustomSnackBar;
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

function SignIn() {
  return (
    <Box
      className="sign-in-page"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Typography variant="h4" align="center">
        Sign In
      </Typography>
      <form className="sign-in-form">
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            sx={{ width: "fit-content", marginTop: "10%" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            sx={{ width: "fit-content" }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "fit-content", marginTop: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default SignIn;
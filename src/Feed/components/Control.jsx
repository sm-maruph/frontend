import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Control = () => {
  const location = useLocation();

  return (
    <Box
      padding={6}
      marginTop={2}
      marginBottom={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" textTransform="uppercase">
        Control panel
      </Typography>
      <hr />
      <Button
        fullWidth
        variant={location.pathname === "/feed" ? "contained" : "outlined"}
        component={Link}
        to=""
      >
        Home
      </Button>
      <Button
        fullWidth
        variant={
          location.pathname === "/feed/chatGpt" ? "contained" : "outlined"
        }
        component={Link}
        to="chatGpt"
      >
        Gemini Ai
      </Button>
      <Button
        fullWidth
        variant={
          location.pathname === "/feed/myfeed" ? "contained" : "outlined"
        }
        component={Link}
        to="myfeed"
      >
        My Post
      </Button>
      <Button
        fullWidth
        variant={location.pathname === "/feed/users" ? "contained" : "outlined"}
        component={Link}
        to="users"
      >
        Users
      </Button>
    </Box>
  );
};

export default Control;

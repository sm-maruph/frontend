import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const NameAvatar = ({ name, src, subtitle }) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={src ? src : "./profileImage.webp"}
        sx={{ height: 50, width: 50 }}
      />
      <Box padding={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {name ? name : "Shahriar Rahman Shound"}
        </Typography>
        <Typography variant="body2" color="secondary">
          {subtitle ? subtitle : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default NameAvatar;

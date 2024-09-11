import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CornerButton = ({ onClick, Icon, sx }) => {
  return (
    <IconButton
      sx={
        sx
          ? { ...sx, position: "absolute", zIndex: 10 }
          : { position: "absolute", top: 0, right: 0, zIndex: 10 }
      }
      onClick={onClick}
    >
      {Icon ? Icon : <CloseIcon color="white" />}
    </IconButton>
  );
};

export default CornerButton;

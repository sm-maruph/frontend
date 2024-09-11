import React from "react";
import { Typography } from "@mui/material";
const SmallDetails = ({ title, content }) => {
  return (
    <>
      <Typography
        textTransform="uppercase"
        variant="subtitle1"
        color="secondary"
      >
        {title}
      </Typography>
      <Typography variant="h6">{content}</Typography>
    </>
  );
};

export default SmallDetails;

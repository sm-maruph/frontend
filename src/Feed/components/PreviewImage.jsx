import { useEffect, useState } from "react";
import { Box, IconButton, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const PreviewImage = ({ images, update }) => {
  if (images === null) {
    return;
  }

  const handleDelete = (index) => {
    // Convert FileList to array, remove the image, and update the state
    const updatedImages = Array.from(images).filter((_, i) => i !== index);
    update(updatedImages);
  };

  return (
    <>
      <Box display="flex" marginBottom={2} gap={2} flexWrap="wrap">
        {Array.from(images).map((item, index) => {
          const srcLink = URL.createObjectURL(item);
          return (
            <Box position="relative" key={index}>
              <Avatar
                key={index}
                variant="rounded"
                src={srcLink}
                sx={{ height: 100, width: "auto" }}
              />
              <IconButton
                onClick={() => {
                  handleDelete(index);
                }}
                color="white"
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default PreviewImage;

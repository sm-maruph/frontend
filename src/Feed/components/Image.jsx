import React, { useState } from "react";
import { Box, Button, Avatar, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CornerButton from "../../Shared/CornerButton";

const Image = ({ src }) => {
  const [modal, setModal] = useState(false);
  const openPreview = () => {
    setModal(true);
  };
  const closePreview = () => {
    setModal(false);
  };
  return (
    <>
      <Modal open={modal} onClose={closePreview}>
        <Box
          position="absolute"
          height="auto"
          width="auto"
          sx={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        >
          <CornerButton onClick={closePreview} />
          <Avatar
            variant="rounded"
            sx={{
              height: "auto",
              width: "auto",
            }}
            src={src}
          />
        </Box>
      </Modal>
      <Button
        onClick={openPreview}
        sx={{ padding: 0, color: "white !important" }}
      >
        <Avatar
          variant="rounded"
          sx={{ height: 180, width: "auto" }}
          src={src}
        />
      </Button>
    </>
  );
};

export default Image;

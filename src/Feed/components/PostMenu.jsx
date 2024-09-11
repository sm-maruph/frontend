import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../Functions/delete";

const PostMenu = ({ handleClose: Close, postId: id, title, content }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      deletePost(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("getposts");
      queryClient.refetchQueries("getposts");
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Delete = () => {
    mutation.mutate();
    Close();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? <br />
            Once Deleted, It cannot be recoverd
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              Close();
            }}
          >
            cancel
          </Button>
          <Button onClick={Delete} autoFocus>
            {mutation.isPending ? "Loading" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      <MenuItem
        onClick={Close}
        to={`update/${id}`}
        state={{ id, title, content }}
        component={Link}
      >
        Update
      </MenuItem>
      <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
    </>
  );
};

export default PostMenu;

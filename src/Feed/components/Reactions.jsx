import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Box,
  Button,
  Typography,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "../Functions/delete";

const Reactions = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["getLikes", props.id],
    queryFn: async () => {
      return await props.getLikes(props.id);
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ postId, isLiked }) => {
      return await props.giveLike(postId, isLiked);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["getLikes", props.id]);
      queryClient.refetchQueries(["getLikes", props.id]);
    },
  });

  const mutationComment = useMutation({
    mutationFn: () => {
      deleteComment(props.id);
    },
    onSuccess: async () => {
      console.log("success");
    },
  });
  const handleLike = (isLiked) => {
    console.log(props.id);
    mutation.mutate({ postId: props.id, isLiked });
  };
  if (mutation.isError) {
    console.log(mutation.error);
  }
  if (mutation.isPending) {
    return (
      <Box marginLeft="auto">
        <CircularProgress />
      </Box>
    );
  }
  const handleCommentDelete = () => {
    mutationComment.mutate();
    handleClose();
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
            }}
          >
            cancel
          </Button>
          <Button autoFocus onClick={handleCommentDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" marginTop={2} marginBottom={2} gap={2}>
        <Button
          variant={data?.userReaction === "like" ? "contained" : "text"}
          color="primary"
          size="large"
          onClick={() => {
            handleLike("like");
          }}
          startIcon={<ThumbUpOffAltIcon sx={{ transform: "scale(1.5)" }} />}
        >
          {data?.likes}
        </Button>
        <Button
          variant={data?.userReaction === "dislike" ? "contained" : "text"}
          size="large"
          onClick={() => {
            handleLike("dislike");
          }}
          startIcon={<ThumbDownOffAltIcon sx={{ transform: "scale(1.5)" }} />}
        >
          {data?.disLikes}
        </Button>
        {props.comment && (
          <Link to={`comments/${props.dataToPass.id}`} state={props.dataToPass}>
            <Button
              size="large"
              startIcon={
                <ChatBubbleOutlineIcon sx={{ transform: "scale(1.5)" }} />
              }
            >
              {data?.comments}
            </Button>
          </Link>
        )}
        {props.delete && (
          <Button
            size="large"
            onClick={handleClickOpen}
            startIcon={<DeleteIcon sx={{ transform: "scale(1.5)" }} />}
          >
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

export default Reactions;

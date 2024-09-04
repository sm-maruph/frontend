import React, { useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import post from "../Functions/post";
import PreviewImage from "./PreviewImage";
import { useInput } from "../../CustomHooks/useInput";

const PostField = () => {
  const { state, handleChange, uploadImage, updateImage } = useInput({
    title: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
    image: null,
  });

  useEffect(() => {}, [state]);
  const imageRef = useRef([]);
  const clickInput = () => {
    imageRef.current.click();
  };

  // Posting Fucntion
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      post(state.title.value, state.description.value, state.image);
    },

    onSuccess: async () => {
      queryClient.refetchQueries(["getposts"]);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    mutation.mutate();
  };
  if (mutation.isPending) {
    return <h1>Posting</h1>;
  }
  if (mutation.isError) {
    return <h1>Wow..this is nice </h1>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      padding={6}
      marginTop={2}
      marginBottom={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
    >
      <input
        type="file"
        onChange={uploadImage}
        name="image"
        ref={imageRef}
        multiple
        style={{ display: "none" }}
        accept="image/*"
      />

      <Typography variant="h6" textAlign="center">
        WRITE YOUR QUESTIONS
      </Typography>
      <br />
      <TextField
        name="title"
        value={state.title.value}
        onChange={handleChange}
        variant="outlined"
        label="Title"
        fullWidth
        error={state.title.isValid ? false : true}
        helperText={state.title.isValid ? "" : "Title cannot be empty"}
      />

      <TextField
        name="description"
        onChange={handleChange}
        value={state.description.value}
        error={state.description.isValid ? false : true}
        helperText={
          state.description.isValid ? "" : "Description cannot be empty"
        }
        variant="outlined"
        label="Description"
        multiline
        sx={{ marginTop: 2, marginBottom: 2 }}
        minRows={4}
        fullWidth
      />
      <PreviewImage images={state.image} update={updateImage} />
      <Box display="flex" alignItems="center">
        <Button
          sx={{ marginLeft: "auto", marginRight: 2 }}
          variant="outlined"
          color="secondary"
          onClick={clickInput}
        >
          Add Image
        </Button>
        <Button type="submit" variant="contained">
          POST
        </Button>
      </Box>
    </Box>
  );
};

export default PostField;

import React, { useRef, useContext } from "react";
import {
  Box,
  Container,
  Button,
  IconButton,
  Typography,
  Avatar,
  TextField,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PreviewImage from "../components/PreviewImage";
import Posts from "./Posts";

import SingleComment from "./SingleComment";
import { useInput } from "../../CustomHooks/useInput";
import { postComment } from "../Functions/post";
import getComments from "../Functions/getComments";
import { AuthContext } from "../../Auth/AuthContext";

const Comment = () => {
  const auth = useContext(AuthContext);

  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const imageRef = useRef([]);
  const {
    data: commentData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["comment", postId],
    queryFn: async () => {
      return getComments(postId);
    },
    staleTime: 1000 * 60 * 5,
  });

  const { state, handleChange, uploadImage, updateImage } = useInput({
    comment: {
      value: "",
      isValid: true,
    },
    image: null,
  });

  const data = location.state;

  const handleImageClick = () => {
    imageRef.current.click();
  };
  const backHandler = () => {
    navigate(-1);
  };
  //  mutation part
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      postComment(state.comment.value, state.image, postId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("comment", postId);
      queryClient.refetchQueries("comment", postId);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    mutation.mutate();
  };
  if (mutation.isError) {
    return <h1>{mutation.error.message}</h1>;
  }
  if (mutation.isPending) {
    return (
      <Box
        padding={6}
        marginTop={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
      >
        <LinearProgress />
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Container>
        <Box
          padding={6}
          marginTop={2}
          borderRadius={2}
          border="2px solid #EBEBEB"
        >
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 2 }}>
      <IconButton
        size="large"
        onClick={backHandler}
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Posts {...data} />
      <Box
        padding={4}
        marginBottom={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
        position="relative"
      >
        <Box
          display="flex"
          component="form"
          onSubmit={handleSubmit}
          gap={2}
          position="relative"
        >
          <Avatar
            sx={{ height: 50, width: 50 }}
            src={`http://localhost:3000/${auth.profilePicture}`}
          />
          <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
            <TextField
              variant="outlined"
              label="Comment"
              name="comment"
              onChange={handleChange}
              value={state.comment.value}
              error={state.comment.isValid ? false : true}
              helperText={state.comment.isValid ? "" : "Title cannot be empty"}
              multiline
              minRows={2}
              fullWidth
            />

            <Box
              display="flex"
              padding={1}
              alignItems="start"
              flexWrap="wrap"
              sx={{
                height: "auto",
                borderRadius: 1,
                backgroundColor: "#EBEBEB",
              }}
            >
              <input
                type="file"
                onChange={uploadImage}
                name="image"
                ref={imageRef}
                multiple
                accept="image/*"
                style={{ display: "none" }}
              />
              <IconButton onClick={handleImageClick}>
                <CropOriginalIcon fontSize="large" color="primary" />
              </IconButton>
              <Box height="auto">
                <PreviewImage images={state.image} update={updateImage} />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{ alignSelf: "flex-end", marginTop: 1 }}
              type="submit"
            >
              Comment
            </Button>
          </Box>
        </Box>
        {commentData &&
          commentData.map((item, index) => {
            return (
              <SingleComment
                key={index}
                IsDelete={auth.id === item.uid ? true : false}
                {...item}
              />
            );
          })}
      </Box>
    </Container>
  );
};

export default Comment;

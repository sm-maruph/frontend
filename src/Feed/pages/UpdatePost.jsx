import React from "react";
import { Box, Container, Button, Typography, TextField } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useInput } from "../../CustomHooks/useInput";
import { updatePost } from "../Functions/update";

const Update = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const { state, handleChange } = useInput({
    title: { value: data.title, isValid: true },
    description: { value: data.content, isValid: true },
  });
  const mutation = useMutation({
    mutationFn: async () => {
      await updatePost(state.title.value, state.description.value, data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getposts");
    },
  });

  const handleSubmit = (e) => {
    mutation.mutate();
    e.preventDefault();
    navigate(-1);
  };

  if (mutation.isError) {
    return <h1>{mutation.error.message}</h1>;
  }
  if (mutation.isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <Container maxWidth="md">
      <Box
        padding={6}
        marginTop={2}
        marginBottom={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" textTransform="uppercase">
          Update your post
        </Typography>
        <br />
        <TextField
          name="title"
          value={state.title.value}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          label="Title"
          variant="outlined"
          fullWidth
        />

        <TextField
          name="description"
          value={state.description.value}
          fullWidth
          minRows={4}
          onChange={handleChange}
          multiline
          variant="outlined"
          label="Description"
        />

        <Box display="flex" alignItems="center" marginTop={2}>
          <Button sx={{ marginLeft: "auto" }} type="submit" variant="contained">
            POST
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Update;

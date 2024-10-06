import React, { useState } from "react";
import { Modal, Box, TextField, Button, Grid, Typography } from "@mui/material";
import useFetch from "../../CustomHooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";

const UpdateProduct = ({ open, handleClose, id }) => {
  console.log(id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    price: "",
    condition: "",
    address: "",
  });
  const queryClient = useQueryClient();
  // State to hold input values

  const mutation = useFetch({
    url: "http://localhost:3000/marketplace/updateproduct",
    method: "PUT",
    data: {
      title: formData.title,
      description: formData.description,
      phone: formData.phone,
      price: formData.price,
      condition: formData.condition,
      address: formData.address,
    },
    params: {
      id,
    },
  });
  console.log(mutation.error);

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["individualproduct"]);
        queryClient.refetchQueries(["individualproduct"]);
      },
    });
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          width: "700px",
          backgroundColor: "white.main",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: 1,
          padding: 10,
        }}
      >
        <Typography
          variant="h5"
          textTransform="uppercase"
          textAlign="center"
          sx={{ marginBottom: 2 }}
          color="initial"
          gutterBottom
        >
          Update Your Product
        </Typography>
        <TextField
          sx={{ marginBottom: 2 }}
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={formData.title} // Bind state to the input
          onChange={handleChange} // Handle input change
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          multiline
          minRows={3}
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.description} // Bind state to the input
          onChange={handleChange} // Handle input change
        />
        <TextField
          name="phone"
          label="Phone"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.phone} // Bind state to the input
          onChange={handleChange} // Handle input change
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={formData.price} // Bind state to the input
              onChange={handleChange} // Handle input change
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              name="condition"
              label="Condition"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={formData.condition} // Bind state to the input
              onChange={handleChange} // Handle input change
            />
          </Grid>
        </Grid>

        <TextField
          name="address"
          label="Address"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.address} // Bind state to the input
          onChange={handleChange} // Handle input change
        />

        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Update Product
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateProduct;

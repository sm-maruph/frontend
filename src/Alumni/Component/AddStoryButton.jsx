import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton, Typography, Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../../CustomHooks/useFetch";

function AddStoryButton() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [], 
    imagePreviews: [], // Store array of image preview URLs 
  });

  const [open, setOpen] = useState(false);

  // Handle opening the modal
  const handleCreateStory = () => setOpen(true);

  // Handle closing the modal
  const handleClose = () => setOpen(false);

  // Handle input change in modal for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload (multiple)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const imagePreviews = files.map((file) => URL.createObjectURL(file)); // Create image preview URLs
    setFormData({
      ...formData,
      images: [...formData.images, ...files], // Append new images to existing ones
      imagePreviews: [...formData.imagePreviews, ...imagePreviews], // Append new previews to existing ones
    });
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index); // Remove image from array
    const newPreviews = formData.imagePreviews.filter((_, i) => i !== index); // Remove preview from array
    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
      submitConnect();
    // Submit formData (including the array of images)
    console.log(formData);
    // setOpen(false); // Close the modal after submitting
  };


  const queryClient = useQueryClient();

  const mutation = useFetch({
    url: "http://localhost:3000/alumni/createstories",

    params: {
      formData,
    },
    method: "Post",
  });

  const submitConnect = () => {
    mutation.mutate(undefined,{
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["alumnistories"]);
        queryClient.refetchQueries(["alumnistories"]);
        reset();
      },
    });

  };
  console.log(mutation.error);


  return (
    <>
      {/* Button to open the modal */}
      <IconButton
        onClick={handleCreateStory}
        sx={{
          position: "fixed",
          bottom: 40,
          right: 150,
          zIndex: 10,
          backgroundColor: "primary.main",
          color: "white !important",
          "&:hover": {
            transform: "scale(1.2)",
            transition: "transform 0.2s ease",
            color: "white !important",
            backgroundColor: "primary.main",
          },
          p: 2,
        }}
      >
        <AddIcon fontSize="large" />
      </IconButton>

      {/* Modal for Adding Story */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Story</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          
          {/* Image upload button for multiple images */}
          <Button
            variant="contained"
            component="label"
            startIcon={<ImageIcon />}
            sx={{ mt: 2 }}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple // Enable multiple file selection
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          {/* Preview uploaded images with remove (close) icon */}
          {formData.imagePreviews.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {formData.imagePreviews.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
                  {/* Image preview */}
                  <Box
                    component="img"
                    src={image}
                    alt={`Preview ${index}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid #ddd',
                    }}
                  />

                  {/* Close (remove) icon */}
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0px 0px 2px rgba(0,0,0,0.5)',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: 'white',
                      },
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddStoryButton;

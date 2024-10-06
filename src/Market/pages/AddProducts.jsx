import React, { useRef, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Avatar,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useFetch from "../../CustomHooks/useFetch";
import { useInput } from "../../CustomHooks/useInput";
import PreviewImage from "../../Feed/components/PreviewImage";
import { AuthContext } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddProducts = () => {
  const auth = useContext(AuthContext);
  const { state, handleChange, uploadImage, updateImage, reset } = useInput({
    title: { value: "", isValid: true },
    description: { value: "", isValid: true },
    price: { value: "", isValid: true },
    category: { value: "1", isValid: true },
    address: { value: "", isValid: true },
    condition: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    image: null,
  });

  const mutation = useFetch({
    url: "http://localhost:3000/marketplace/addpost",
    method: "POST",
    data: {
      title: state.title.value,
      description: state.description.value,
      price: state.price.value,
      condition: state.condition.value,
      category: state.category.value,
      address: state.address.value,
      phone: state.phone.value,
      files: state.image,
    },
    params: {
      uid: auth.id,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
        reset();
      },
    });
  };

  const imageRef = useRef([]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Box
        display="flex"
        gap={2}
        padding={3}
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
        mb={2}
        marginTop={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
        sx={{
          backgroundColor: "#f9f9f9", // Light background for the entire box
          boxShadow: 1, // Subtle shadow for depth
        }}
      >
        <Typography
          textTransform="uppercase"
          textAlign="center"
          variant="h4"
          color="primary"
          gutterBottom
        >
          List Your Product
        </Typography>
        <Box gap={2} display="flex">
          <Button
            component={Link}
            to="/market"
            variant="outlined"
            color="primary"
            startIcon={<Inventory2Icon />}
            sx={{
              borderRadius: 1,
              padding: "10px 15px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Products
          </Button>
          <Button
            component={Link}
            to="/market/bookmark"
            variant="outlined"
            color="primary"
            startIcon={<BookmarkBorderIcon />}
            sx={{
              borderRadius: 1,
              padding: "10px 15px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Bookmarks
          </Button>

          <Button
            component={Link}
            to="/market/myproduct"
            variant="outlined"
            color="primary"
            startIcon={<Inventory2Icon />}
            sx={{
              borderRadius: 1,
              padding: "10px 15px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            My Products
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            component={Link}
            to="/market/addproduct"
            sx={{
              borderRadius: 1,
              padding: "10px 15px",
              background: "linear-gradient(to right, #2196f3, #64b5f6)",
              "&:hover": {
                background: "linear-gradient(to right, #1976d2, #42a5f5)",
              },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left side for product image upload */}
        <Grid item xs={12} sm={6}>
          <Card elevation={3} sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Product Image
              </Typography>
              <PreviewImage images={state.image} update={updateImage} />
              <input
                type="file"
                name="image"
                multiple
                onChange={uploadImage}
                style={{ display: "none" }}
                ref={imageRef}
              />
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => {
                  imageRef.current.click();
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload Files
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side for product details form */}
        <Grid item xs={12} sm={6}>
          <Card elevation={3} sx={{ padding: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Details
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  sx={{ marginBottom: 2 }}
                  label="Product Title"
                  name="title"
                  value={state.title.value}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  name="description"
                  label="Product Description"
                  value={state.description.value}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="price"
                      label="Price (TK)"
                      value={state.price.value}
                      onChange={handleChange}
                      variant="outlined"
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="condition"
                      value={state.condition.value}
                      onChange={handleChange}
                      label="Condition"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth sx={{ marginY: 2 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    label="Category"
                    value={state.category.value}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Smartphones</MenuItem>
                    <MenuItem value={2}>Computers</MenuItem>
                    <MenuItem value={3}>Electronics</MenuItem>
                    <MenuItem value={4}>Furniture</MenuItem>
                    <MenuItem value={5}>Fashion & Apparel</MenuItem>
                    <MenuItem value={6}>Books & Media</MenuItem>
                    <MenuItem value={7}>Home Appliances</MenuItem>
                    <MenuItem value={8}>Sports & Outdoors</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="address"
                  label="Address"
                  value={state.address.value}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="phone"
                  label="Mobile Number"
                  value={state.phone.value}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button
                  fullWidth
                  sx={{ marginTop: 3 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProducts;

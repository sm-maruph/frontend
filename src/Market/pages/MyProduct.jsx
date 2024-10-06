import React, { useContext } from "react";
import { Box, Container, Button, Typography, Grid } from "@mui/material";
import ProductList from "../Component/ProductList";
import { Link } from "react-router-dom";

// Importing the required Material-UI icons
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useFetch from "../../CustomHooks/useFetch";
import Product from "../Component/Product";
import { AuthContext } from "../../Auth/AuthContext";

const MyProduct = () => {
  const auth = useContext(AuthContext);
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/marketplace/getuserallpost",
    queryKey: ["getmyproductlist"],
    params: {
      id: auth.id,
    },
  });
  console.log(data);
  console.log(error);
  return (
    <Container sx={{ marginTop: 2 }} maxWidth="lg">
      <Box
        display="flex"
        gap={2}
        padding={3}
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
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
          My Products
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
      <Grid container spacing={2} mt={2}>
        {data?.map((item) => {
          return <Product item={item} />;
        })}
      </Grid>
    </Container>
  );
};

export default MyProduct;

import React, { useState } from "react";
import { Box, Container, Grid, TextField, Button } from "@mui/material";
import FilterMarket from "../Component/FilterMarket";
import ProductList from "../Component/ProductList";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, Routes, Route } from "react-router-dom";
import MyProduct from "./MyProduct";

import useFetch from "../../CustomHooks/useFetch";

const Products = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "", // Default category is set to Smartphones
    priceRange: [0, 10000], // Default price range
  });

  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/marketplace/getmarketitem",
    queryKey: [
      "getmarketitem",
      filters.category,
      filters.search,
      filters.priceRange,
    ],
    params: {
      title: filters.search,
      category_id: filters.category,
      min_price: filters.priceRange[0],
      max_price: filters.priceRange[1],
    },
  });
  console.log(error);

  // Handle category change
  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  // Handle price range change
  const handleSliderChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: newValue,
    }));
  };
  const handleSearchChange = (event) => {
    const target = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: target,
    }));
  };
  return (
    <Container sx={{ marginTop: 2 }} maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
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
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiFilledInput-root": {
                  borderRadius: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                },
                "&:hover .MuiFilledInput-root": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onChange={handleSearchChange}
              color="primary"
              label="Search Product"
              variant="outlined"
            />

            {/* Additional Buttons */}
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
        </Grid>
        <Grid item xs={3}>
          <FilterMarket
            handleSliderChange={handleSliderChange}
            handleCategoryChange={handleCategoryChange}
            filters={filters}
          />
        </Grid>

        <Grid item xs={0.2}></Grid>
        <Grid item xs={8.8}>
          <ProductList items={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;

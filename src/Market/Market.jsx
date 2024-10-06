import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";

import Products from "./pages/Products";
import IndividualProduct from "./pages/IndividualProduct";
import AddProducts from "./pages/AddProducts";
import MyProduct from "./pages/MyProduct";

const Market = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/individualproduct/:itemId"
          element={<IndividualProduct />}
        />
        <Route path="/myproduct" element={<MyProduct />} />
        <Route path="/bookmark" element={<h1>Bookmark</h1>} />
        <Route path="/addproduct" element={<AddProducts />} />
      </Routes>
    </Box>
  );
};

export default Market;

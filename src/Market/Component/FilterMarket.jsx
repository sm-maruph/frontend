import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from "@mui/material";

const FilterComponent = ({
  handleCategoryChange,
  handleSliderChange,
  filters,
}) => {
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
        marginBottom: 4,
        marginTop: 2,
      }}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Filters
      </Typography>

      {/* Radio Group for Categories */}
      <Typography variant="subtitle1">Category</Typography>
      <RadioGroup
        column
        value={filters.category || ""} // Default value will be empty string for "Any"
        onChange={handleCategoryChange}
      >
        <FormControlLabel
          value="" // No value will be passed for "Any"
          control={<Radio color="primary" />}
          label="Any"
        />
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="Smartphones"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="Computers"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="Electronics"
        />
        <FormControlLabel
          value="4"
          control={<Radio color="primary" />}
          label="Furniture"
        />
        <FormControlLabel
          value="5"
          control={<Radio color="primary" />}
          label="Fashion & Apparel"
        />
        <FormControlLabel
          value="6"
          control={<Radio color="primary" />}
          label="Books & Media"
        />
        <FormControlLabel
          value="7"
          control={<Radio color="primary" />}
          label="Home Appliances"
        />
        <FormControlLabel
          value="8"
          control={<Radio color="primary" />}
          label="Sports & Outdoors"
        />
      </RadioGroup>

      {/* Price Range Slider */}
      <Box mt={3}>
        <Typography id="range-slider" variant="subtitle1" gutterBottom>
          Price Range:
          <br />
          <span style={{ fontWeight: 500 }}>
            TK{filters.priceRange[0]} - Tk{filters.priceRange[1]}
          </span>
        </Typography>
        <Slider
          value={filters.priceRange} // Bind price range state to the slider
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={50}
          aria-labelledby="range-slider"
        />
      </Box>
    </Box>
  );
};

export default FilterComponent;

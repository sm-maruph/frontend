import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Search = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const handleReset = () => {
    navigate(-1);
  };
  console.log(location.pathname);
  return (
    <Box
      padding={6}
      marginTop={2}
      marginBottom={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
    >
      <Typography variant="h5" gutterBottom textTransform="uppercase">
        Find Topics
      </Typography>

      {location.pathname !== "/feed/searchresults" ? (
        <>
          <TextField
            variant="outlined"
            value={search}
            onChange={handleChange}
            placeholder="Topic"
            fullWidth
          />
          <Button
            component={Link}
            to="searchresults"
            state={search}
            disabled={search === "" ? true : false}
            sx={{ marginTop: 2 }}
            variant="contained"
            fullWidth
          >
            Search
          </Button>
        </>
      ) : (
        <Button
          sx={{ marginTop: 2 }}
          onClick={handleReset}
          variant="contained"
          fullWidth
        >
          Reset
        </Button>
      )}
    </Box>
  );
};

export default Search;

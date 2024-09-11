import React from "react";
import SearchFilter from "../Component/SearchFilter";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const QuestionBank = () => {
  return (
    <Container maxWidth="xl">
      <Box marginTop={2}>
        <Typography variant="h5" textAlign="center">
          Welcome to Question Bank
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SearchFilter />
          </Grid>
          <Grid item xs={9}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default QuestionBank;

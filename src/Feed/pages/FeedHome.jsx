import React from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Wall from "../components/Wall";
import User from "../components/User";
import Search from "../components/Search";
import Top from "../components/Top";
import Control from "../components/Control";
import ChatGpt from "../components/ChatGpt";
import Myposts from "../components/Myposts";
import SearchResults from "../components/SearchResults";
import UserLists from "../components/UserList";

const FeedHome = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Control />
          <User />
        </Grid>
        <Grid item xs={6}>
          <Routes>
            <Route path="/" element={<Wall />} />
            <Route path="/chatGpt" element={<ChatGpt />} />
            <Route path="/myfeed" element={<Myposts />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/users" element={<UserLists />} />
          </Routes>
        </Grid>
        <Grid item xs={3}>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/searchresults" element={<Search />} />
          </Routes>

          <Top />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeedHome;

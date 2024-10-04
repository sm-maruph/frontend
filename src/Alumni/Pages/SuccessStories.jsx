// SuccessStories.js
import React, { useState } from "react";
import { Box, Typography, IconButton, Grid ,LinearProgress}  from "@mui/material";
import StoryCard from "../Component/Storycards";
import useFetch from "../../CustomHooks/useFetch"; 
import AddStoryButton from "../Component/AddStoryButton";

const SuccessStories = () => {
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/alumni/getstories",
    queryKey: ["alumnistories"],
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Box sx={{ 
        width: '60%', 
        margin: '4rem auto',  // Centers the Box and adds margin at the top 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center'  // Center the text inside the Box
    }}>
        <LinearProgress sx={{ width: '100%' }} />  
        <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading Success Stories...
        </Typography>
    </Box>
    
    );
  }
  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const handleCreateStory = () => {
    // Logic to create a new story (e.g., opening a modal)
    alert("Create a new story feature coming soon!");
  };

  return (
    <Box  sx={{ 
        p: 4, 
        position: 'relative', 
        width: '80%', 
        margin: '0 auto', 
        border: '2px solid', 
        borderColor: 'primary.main', 
        borderRadius: '10px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
        marginTop: 4,
      }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Success Stories of Our Alumni
      </Typography>
      <AddStoryButton />

      <Grid container spacing={2} sx={{ mt: 0 }}>
        {data.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <StoryCard story={story} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuccessStories;

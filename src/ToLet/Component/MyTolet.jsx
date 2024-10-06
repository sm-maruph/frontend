import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import Card from '../Component/Card'; // Assuming you have a Card component

function MyTolet() {
  const [toletData, setToletData] = useState([]); // To store the fetched data
  const [loading, setLoading] = useState(false); // To show loading indicator

  // Fetching data using axios
  useEffect(() => {
    setLoading(true)
    const fetchTolets = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:3000/tolet/myTolet', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request headers
          },
        });
        setToletData(response.data); // Update state with the fetched data
        setLoading(false); // Turn off the loading indicator
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Turn off loading in case of an error
      }
    };

    fetchTolets();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <LinearProgress />; // Show a loading indicator while data is being fetched
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {toletData.length > 0 ? (
        toletData.map((item, index) => (
          <Card key={index} item={item} /> // Pass the data to your Card component
        ))
      ) : (
        <p>No advertisements found.</p> // Show this if no ads are available
      )}
    </Box>
  );
}

export default MyTolet;

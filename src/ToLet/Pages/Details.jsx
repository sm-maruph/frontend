import { Box, Grid, CardMedia, Avatar, Typography, Modal } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { timeAgo } from '../Function/TimeTable';
import CustomBox from '../Component/customBox';
import { AuthContext } from "../../Auth/AuthContext";
import { modalStyle, modalStyle1 } from '../Function/Style';
import DeleteModal from '../Component/DeleteModal';
import InsertBookmark from '../Function/InsertBookmark';
import UpdateModal from '../Component/UpdateModal';

function Details() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const { id } = useParams(); // Get the id from the URL
  const [toletDetails, setToletDetails] = useState(null); // State to hold fetched details
  const [selectedImage, setSelectedImage] = useState(''); // State to hold the currently selected image

  const auth = useContext(AuthContext)

  const fetchToletDetails = async () => {
    try {
      // Retrieve the token from localStorage and parse it
      const token = JSON.parse(localStorage.getItem("token"));

      // Make the request with the token in the headers
      const response = await axios.get(`http://localhost:3000/tolet/details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token in the Authorization header
        },
      });

      // Parse JSON fields that are stored as strings in the database
      response.data.image = JSON.parse(response.data.image);
      response.data.facility = JSON.parse(response.data.facility);
      response.data.requirement = JSON.parse(response.data.requirement);
      response.data.room_decoration = JSON.parse(response.data.room_decoration);

      // Set the fetched details to the state
      setToletDetails(response.data);
      setSelectedImage(response.data.image[0]); // Set the first image as default
    } catch (error) {
      console.error('Error fetching tolet details:', error);
    }
  };

  useEffect(() => {
    fetchToletDetails();
  }, [id]); // Fetch details whenever the id changes

  if (!toletDetails) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <Box p={5}>
      <Grid container gap={1}>

        {/* Display selected image in CardMedia */}
        <Grid item xs={6} sx={{ background: '' }} >
          <CardMedia
            component="img"
            alt={toletDetails.location}
            height="400"
            image={selectedImage} // Display the currently selected image
            sx={{ borderRadius: '10px' }}
          />

          {/* Thumbnails of images as Avatars */}
          <Grid item xs={12} p={1} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', marginLeft: 1 }}>
            {toletDetails.image.map((item, index) => (
              <Avatar
                key={index} // Add key prop for unique identification
                alt={`Image ${index + 1}`}
                src={item}
                variant="square"
                sx={{ width: 100, height: 100, cursor: 'pointer', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px', borderRadius: '10px' }} // Make the Avatar clickable
                onClick={() => setSelectedImage(item)} // Change the selected image on click
              />
            ))}
          </Grid>

        </Grid>

        {/* Property details */}
        <Grid container columnGap={1} item xs={5.9} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px', borderRadius: '10px' }} p={2}>

          <Grid item xs={6.9} sx={{ background: '' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px',
              borderRadius: '10px'
            }}
              p={2}>
              <Typography variant="h4">{toletDetails.Gender} Seat for Rent</Typography>
              <Typography variant="h5">{toletDetails.amount} BDT</Typography>
              <Typography variant="body1"><span style={{ fontWeight: 'bold' }}>Location:</span> {toletDetails.location}</Typography>
              <Typography variant="body1"><span style={{ fontWeight: 'bold' }}>Available Since:</span> {timeAgo(toletDetails.timestamp)}</Typography>
            </Box>
          </Grid>

          <Grid item xs={4.9} sx={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px', borderRadius: '10px'}}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center'}} m={2}>
              <Avatar
                src={toletDetails.profile_picture}
                variant="round"
                sx={{ width: 50, height: 50 }}
              />
              <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'center'}}>
                <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{toletDetails.first_name} {toletDetails.last_name}</p>
                <p style={{ margin: 0 }}>☏ 01766897654</p>
              </Box>
            </Box>
          </Grid>


          <Grid container columnGap={1} mt={2}>

            <CustomBox item={toletDetails.facility} name="Room Decoration" />
            <CustomBox item={toletDetails.requirement} name="Room Decoration" />
            <CustomBox item={toletDetails.room_decoration} name="Room Decoration" />

            <Grid item xs={11.8} sx={{ display: 'flex', justifyContent: 'center' }} mt={2} p={2}>

              {auth.id === toletDetails.uid && <IconButton color="primary" sx={{ border: '2px solid', marginRight: 2 }}
              onClick={handleOpen1}
              >
                <EditIcon />
              </IconButton>}

              {auth.id === toletDetails.uid && <IconButton color="primary" sx={{ border: '2px solid', marginRight: 2 }}
                onClick={handleOpen}
              >
                <DeleteIcon />
              </IconButton>}

              <IconButton color="primary" sx={{ border: '2px solid', marginRight: 2 }}
                onClick={() => { InsertBookmark(toletDetails.id) }}
              >
                <TurnedInIcon />
              </IconButton>
            </Grid>

          </Grid>

          {/* Description */}
          <Grid item xs={12} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px', borderRadius: '10px' }} p={2}>
            <h3 style={{ margin: '0 0 1% 0' }}>Description</h3>
            <Typography variant="body1">{toletDetails.description}</Typography>
          </Grid>

        </Grid>

      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <DeleteModal close={handleClose} id={toletDetails.id} />
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
      >
        <Box sx={modalStyle1}>
          <UpdateModal close={handleClose1} item={toletDetails} fetch={fetchToletDetails}/>
        </Box>
      </Modal>

    </Box>
  );
}

export default Details;

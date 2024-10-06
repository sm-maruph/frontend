import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import BedIcon from '@mui/icons-material/Bed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';

const margin = {
    margin: '2% 0',
}
function Card({ item }) {

    const navigate = useNavigate();
    const goToDetails = () => {
        navigate(`/tolet/details/${item.id}`);  // Navigate to the details page
    };


    try {
        item.image = JSON.parse(item.image);
        item.facility = JSON.parse(item.facility); // Fixed typo here
        item.room_decoration = JSON.parse(item.room_decoration);
    } catch (e) {
        // If parsing fails, it's likely already a string (such as a URL)
    }

    console.log(item);




    return (
        <Box sx={{
            width: "31%",
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px',
            borderRadius: '10px'
        }}
        >
            <CardMedia
                component="img"
                alt="green iguana"
                height="190"
                image={item.image[0]}
                sx={{ borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}

            />


            <Grid container>
                <Grid item xs={7.5} sx={{ background: '' }} ml={1}>
                    <h3 style={margin}>{item.amount} BDT</h3>
                    <p style={margin}>{item.rent_type} Available {item.Gender}</p>
                    <div style={{ display: 'flex', gap: 2 }}>

                        <LocationOnIcon color="primary" />
                        <p style={margin}>
                            {item.location.length > 18 ? item.location.substring(0, 18) + '...' : item.location}
                        </p>

                    </div>

                    {item.rent_type === 'Room' ?
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BathtubIcon color="primary" />
                                <p>Bath</p>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BedIcon color="primary" />
                                <p>Bath</p>
                            </Box>
                        </Box> : <p style={{ fontWeight: 'bold' }}>Check Description</p>
                    }



                </Grid>

                <Grid item xs={3.9}>
                    <h4 style={margin}>Facilities</h4>
                    <p style={margin}>{item.facility[0]}</p>
                    <p style={margin}>{item.facility[1]}</p>
                    <p style={margin}>{item.facility[2]}</p>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={goToDetails}
                        sx={{ width: '100%', margin: '2% 0' }}
                    >
                        Details
                    </Button>

                </Grid>
            </Grid>

        </Box>
    );
}

export default Card;

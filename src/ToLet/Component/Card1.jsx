import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Modal } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import BedIcon from '@mui/icons-material/Bed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkDeleteModal from "./BookmarkDeleteModal";
import { modalStyle } from "../Function/Style";

const margin = {
    margin: 0,
}
function Card1({ item, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

            </Grid>


            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
                <Button variant="contained" onClick={goToDetails}>Details</Button>
                <Button color="primary" sx={{ border: '2px solid' }} onClick={handleOpen}>
                    <DeleteIcon />
                </Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <BookmarkDeleteModal close={handleClose} id={id} />
                </Box>
            </Modal>

        </Box>
    );
}

export default Card1;

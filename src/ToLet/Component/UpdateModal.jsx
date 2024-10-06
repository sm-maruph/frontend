import React, { useState } from 'react';
import { Box, Grid, TextField, Autocomplete, Checkbox, FormControlLabel, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { rentType, requirement, facilities, roomDecoration } from '../Function/Data';

function UpdateModal({ item, close, fetch }) {
    const [formData, setFormData] = useState({
        location: item.location || '',
        rentType: item.rent_type || '',
        gender: item.Gender || '',
        amount: item.amount || '',
        facilities: item.facility || [],
        requirements: item.requirement || [],
        roomDecorations: item.room_decoration || [],
        description: item.description || '',
        mediaLink: item.media || '',
        mediaName: item.media_name || '',
    });

    

    const handleCheckboxChange = (field, value) => {
        setFormData((prevData) => {
            const updatedField = prevData[field].includes(value)
                ? prevData[field].filter((item) => item !== value)
                : [...prevData[field], value];
            return { ...prevData, [field]: updatedField };
        });
    };

    const handleInputChange = (field) => (event, newValue) => {
        setFormData({ ...formData, [field]: newValue || event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.put(
                `http://localhost:3000/tolet/update/${item.id}`, // Assuming `id` is available in `item`
                {
                    location: formData.location,
                    rentType: formData.rentType,
                    gender: formData.gender,
                    amount: formData.amount,
                    facility: formData.facilities,
                    requirement: formData.requirements,
                    roomDecoration: formData.roomDecorations,
                    description: formData.description,
                    mediaLink: formData.mediaLink,
                    mediaName: formData.mediaName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            close(); // Close the modal after successful update
            fetch(); // Fetch updated data after submitting
        } catch (error) {
            console.error('Error updating tolet:', error.response ? error.response.data : error.message);
        }
    };


    return (
        <Box component="form" p={1} onSubmit={handleSubmit}>

            <Box sx={{position: 'relative'}}>
                <h2 style={{ marginTop: 0 }}>Update To-Let</h2>
                <IconButton sx={{position: 'absolute', top: 0, right: 0}} onClick={close}><CloseIcon/></IconButton>
            </Box>

            <Grid container gap={1}>
                <Grid item xs={11.9}>
                    <TextField
                        label="Location"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={formData.location}
                        onChange={handleInputChange('location')}
                    />
                </Grid>

                <Grid item xs={3.9}>
                    <Autocomplete
                        options={rentType}
                        sx={{ width: '100%' }}
                        value={formData.rentType}
                        onChange={handleInputChange('rentType')}
                        renderInput={(params) => (
                            <TextField {...params} label="Rent Type" />
                        )}
                    />
                </Grid>

                <Grid item xs={3.9}>
                    <Autocomplete
                        options={['Male', 'Female']}
                        sx={{ width: '100%' }}
                        value={formData.gender}
                        onChange={handleInputChange('gender')}
                        renderInput={(params) => (
                            <TextField {...params} label="Gender" />
                        )}
                    />
                </Grid>

                <Grid item xs={3.9}>
                    <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        sx={{ width: '100%' }}
                        value={formData.amount}
                        onChange={handleInputChange('amount')}
                    />
                </Grid>

                <Grid item xs={3.9} p={1}>
                    <h3>Facilities</h3>
                    <Grid container spacing={2}>
                        {facilities.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.facilities.includes(item)}
                                            onChange={() => handleCheckboxChange('facilities', item)}
                                        />
                                    }
                                    label={item}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={3.9} p={1}>
                    <h3>Requirement</h3>
                    <Grid container spacing={2}>
                        {requirement.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.requirements.includes(item)}
                                            onChange={() => handleCheckboxChange('requirements', item)}
                                        />
                                    }
                                    label={item}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={3.9} p={1}>
                    <h3>Room Decoration</h3>
                    <Grid container spacing={2}>
                        {roomDecoration.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.roomDecorations.includes(item)}
                                            onChange={() => handleCheckboxChange('roomDecorations', item)}
                                        />
                                    }
                                    label={item}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={11.9}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ width: '100%' }}
                        value={formData.description}
                        onChange={handleInputChange('description')}
                    />
                </Grid>

                <Grid item xs={5.9}>
                    <TextField
                        label="Social Media Name"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={formData.mediaName}
                        onChange={handleInputChange('mediaName')}
                    />
                </Grid>

                <Grid item xs={5.9}>
                    <TextField
                        label="Social Media Link"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={formData.mediaLink}
                        onChange={handleInputChange('mediaLink')}
                    />
                </Grid>

                <Grid item xs={11.9}>
                    <Button variant="contained" sx={{ width: '40%', margin: '1% 30%' }} type="submit">
                        Update Tolet
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UpdateModal;

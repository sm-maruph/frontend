import React, { useState } from 'react';
import { Box, Grid, TextField, Autocomplete, Checkbox, FormControlLabel, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { rentType, requirement, facilities, roomDecoration } from '../Function/Data';


function AddTolet({ fetch, isSub }) {
    const [formData, setFormData] = useState({
        location: '',
        rentType: '',
        gender: '',
        amount: '',
        facilities: [],
        requirements: [],
        roomDecorations: [],
        description: '',
        mediaLink: '',
        mediaName: '',
        images: [],
    });

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file: file,
        }));
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files],
        }));
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };

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

    // Axios POST request
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            // Creating FormData to handle images along with other form data
            const form = new FormData();
            form.append('location', formData.location);
            form.append('rentType', formData.rentType);
            form.append('gender', formData.gender);
            form.append('amount', formData.amount);
            form.append('mediaName', formData.mediaName);
            form.append('mediaLink', formData.mediaLink);
            formData.facilities.forEach((facility) => form.append('facilities[]', facility));
            formData.requirements.forEach((requirement) => form.append('requirements[]', requirement));
            formData.roomDecorations.forEach((decoration) => form.append('roomDecorations[]', decoration));
            form.append('description', formData.description);
            formData.images.forEach((image) => form.append('files', image));


            // You can reset the form here if needed
            setFormData({
                location: '',
                rentType: '',
                gender: '',
                amount: '',
                facilities: [],
                requirements: [],
                roomDecorations: [],
                description: '',
                mediaLink: '',
                mediaName: '',
                images: [],
            });
            setSelectedImages([]);

            const response = await axios.post(
                `http://localhost:3000/tolet/post/`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Handling file uploads
                    },
                }
            );


        } catch (error) {
            // Handle error
            console.error('Error uploading tolet:', error.response ? error.response.data : error.message);
        }
        fetch();
        isSub(true);
    };

    return (
        <Box component="form" p={1} onSubmit={handleSubmit}>
            <Grid container gap={1}>
                <Grid item xs={11.9}>
                    <Box p={2} sx={{ border: '2px solid' }}>
                        <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {selectedImages.map((image, index) => (
                                <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
                                    <IconButton
                                        sx={{ position: 'absolute', top: 0, right: 0, background: 'white' }}
                                        onClick={() => handleRemoveImage(index)}
                                        size="small"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <img
                                        src={image.url}
                                        alt={`Selected ${index}`}
                                        style={{ width: 150, height: 150, objectFit: 'cover' }}
                                    />
                                </Box>
                            ))}
                        </Box>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-images"
                            type="file"
                            name='files'
                            multiple
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload-images">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{ width: '30%', marginLeft: '35%' }}
                            >
                                Upload Images
                            </Button>
                        </label>
                    </Box>
                </Grid>

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
                            <TextField
                                {...params}
                                label="Rent Type"
                            />
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
                            <TextField
                                {...params}
                                label="Gender"
                            />
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

                <Grid item xs={3.9} p={1} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px' }}>
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

                <Grid item xs={3.9} p={1} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px' }}>
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

                <Grid item xs={3.9} p={1} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px' }}>
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
                    <Button
                        variant="contained"
                        sx={{ width: '40%', margin: '1% 30%' }}
                        type="submit"
                    >
                        Upload Tolet
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddTolet;

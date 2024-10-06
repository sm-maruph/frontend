import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import LeftNav from '../Component/LeftNav';
import TabbedComponent from '../Component/TabbedComponent';

function ToLet() {
    const [value, setValue] = useState([0, 10000]);  // State for price range
    const [selectedRentType, setSelectedRentType] = useState('');  // State for selected rent type
    const [selectedLocation, setSelectedLocation] = useState([]);  // State for selected locations
    const [searchTerm, setSearchTerm] = useState('');  // State for search field input
    const [loading, setLoading] = useState(false);  // Loader state
    const [data, setData] = useState([]);  // State to hold fetched data

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handles changes to the slider
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMinInputChange = (event) => {
        const newMin = Number(event.target.value);
        setValue([Math.min(newMin, value[1]), value[1]]);
    };

    const handleMaxInputChange = (event) => {
        const newMax = Number(event.target.value);
        setValue([value[0], Math.max(newMax, value[0])]);
    };

    const handleRentTypeChange = (event) => {
        setSelectedRentType(event.target.value);
    };

    const handleLocationChange = (event) => {
        const locationName = event.target.name;
        const updatedLocations = event.target.checked
            ? [...selectedLocation, locationName]
            : selectedLocation.filter(item => item !== locationName);
        setSelectedLocation(updatedLocations);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Fetch filtered data
    const fetchFilteredData = async () => {
        try {
            setLoading(true);  // Start loading
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get('http://localhost:3000/tolet/getTolet', {
                params: {
                    location: selectedLocation.join(','),
                    rent_type: selectedRentType,
                    minAmount: value[0],
                    maxAmount: value[1],
                    search: searchTerm
                },
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            
            setData(response.data);  // Save data
            setLoading(false);  // Stop loading after fetching
        } catch (error) {
            setLoading(false);  // Stop loading even on error
            console.error('Error fetching filtered ToLet data:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchFilteredData();  // Fetch data on mount or filter changes
    }, [selectedLocation, selectedRentType, value, searchTerm]);
    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} ml={1}>

                    <LeftNav
                        value={value}
                        selectedLocation={selectedLocation}
                        selectedRentType={selectedRentType}
                        searchTerm={searchTerm}
                        handleSliderChange={handleSliderChange}
                        handleMinInputChange={handleMinInputChange}
                        handleMaxInputChange={handleMaxInputChange}
                        handleRentTypeChange={handleRentTypeChange}
                        handleLocationChange={handleLocationChange}
                        handleSearchChange={handleSearchChange}
                    />
                </Grid>

                <Grid item xs={8.9}>
                    <TabbedComponent data={data} loading={loading} fetch={fetchFilteredData}/>
                </Grid>

            </Grid>

        </Box>
    );
}

export default ToLet;

import React from 'react'
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, Checkbox, Slider, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {rentType, location, } from '../Function/Data'
function LeftNav({ value, selectedRentType, selectedLocation, searchTerm, handleSearchChange, handleLocationChange, handleRentTypeChange, handleMaxInputChange, handleMinInputChange, handleSliderChange }) {
    return (
        <>

            <TextField
                label="Search Location"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "100%", marginBottom: 1, marginTop: 2 }}
            />



            <Accordion sx={{ marginBottom: 1 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h4 style={{ margin: 0 }}>Rent Type</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup name="rentType" value={selectedRentType} onChange={handleRentTypeChange}>
                        {rentType.map((item, index) => (
                            <FormControlLabel
                                value={item}
                                control={<Radio sx={{ marginLeft: 5 }} />}
                                label={item}
                                key={index}
                            />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>

            <Box p={2} mt={1} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px' }}>
                <h4 style={{ margin: '0 0 5% 0' }}>Price Range</h4>
                <Slider
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    step={100}
                    marks={[
                        { value: 0, label: '0' },
                        { value: 2500, label: '2.5k' },
                        { value: 5000, label: '5k' },
                        { value: 7500, label: '7.5k' },
                        { value: 10000, label: '10k' },
                    ]}
                />

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <TextField
                        label="Min"
                        type="number"
                        value={value[0]}
                        onChange={handleMinInputChange}
                        inputProps={{ min: 0, max: value[1] }}
                    />

                    <TextField
                        label="Max"
                        type="number"
                        value={value[1]}
                        onChange={handleMaxInputChange}
                        inputProps={{ min: value[0], max: 10000 }}
                    />
                </Box>
            </Box>

        </>
    )
}

export default LeftNav
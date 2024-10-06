import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import Card from '../Component/Card'; // Assuming you have a Card component

function CardContainer({ data, loading }) {
    return (
        <>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap',}}>
                {loading ? (
                    <LinearProgress />  // Show loader when loading
                ) : (
                    data.length > 0 ? (
                        data.map((item, index) => (
                            <Card key={index} item={item} />
                        ))
                    ) : (
                        <p>No To-Let available</p>
                    )
                )}
            </Box>
        </>
    )
}

export default CardContainer
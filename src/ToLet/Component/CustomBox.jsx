import React from 'react'
import { Grid, Box } from '@mui/material'

function CustomBox({item, name}) {
    return (
        <Grid item xs={3.8} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;0.35) 0px 5px 15px', borderRadius: '10px' }}>
            <h4 style={{ margin: '2% 0 0 5%' }}>{name}</h4>
            <ul style={{ margin: '1% 0 0' }}>
                {item.map((item, index) => (
                    <Box sx={{ display: 'flex' }} m={1}>
                        <p style={{ margin: '0' }}>✔️</p>
                        <p style={{ margin: '0' }}>{item}</p>
                    </Box>
                ))}
            </ul>
        </Grid>
    )
}

export default CustomBox
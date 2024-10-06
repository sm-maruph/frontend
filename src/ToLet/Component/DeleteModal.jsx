import React from 'react'
import {Box, Button} from '@mui/material'
import DeleteTolet from '../Function/deleteTolet'

function DeleteModal({close, id}) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p>Are you sure want to delete this item ?</p>

        <div style={{display: 'flex', gap: 10}}>

        <Button onClick={() => DeleteTolet(id, close)}>Yes</Button>

        <Button onClick={close}>No</Button>

        </div>
    </Box>
  )
}

export default DeleteModal
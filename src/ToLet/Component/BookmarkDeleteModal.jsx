import React from 'react';
import { Box, Button } from '@mui/material';
import DeleteBookmark from '../Function/DeleteBookmark';

function BookmarkDeleteModal({ close, id }) {
    console.log(id);
    
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Are you sure you want to delete this item?</p>

      <div style={{ display: 'flex', gap: 10 }}>
        {/* Pass the bookmark id to the DeleteBookmark function */}
        <Button
          onClick={() => {
            if (id) {
              DeleteBookmark(id, close); // Delete the bookmark and close the modal
            } else {
              console.error('Bookmark ID is undefined');
            }
          }}
        >
          Yes
        </Button>

        <Button onClick={close}>No</Button>
      </div>
    </Box>
  );
}

export default BookmarkDeleteModal;

// ExtendingRedContainer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ExtendingGallery = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // Position fixed to avoid layout constraints
        top: '600px', // Positioned close to the bottom of the video container
        right: '20px', // Adjustable right margin
        width: '40%',
        height: '500px', // Fixed height of the red container
        backgroundColor: 'red',
        zIndex: 5,
        transform: 'translateY(-150px)', // Moves it up to overlap by a quarter
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      }}
    >
      <Typography
        variant="h6"
        color="white"
        sx={{
          padding: '16px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        This is the red container extending downward.
      </Typography>
    </Box>
  );
};

export default ExtendingGallery;

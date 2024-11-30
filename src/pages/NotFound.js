import React from 'react';
import { Box, Button, Typography } from '@mui/material';
// import { blueG } from '@material-ui/core/node/colors';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { brown } from '@material-ui/core/colors';


const primary = brown[100]; // #f44336

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary,
        padding: '20px', 
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold', 
          fontSize: '4rem', 
          textAlign: 'center',
          marginBottom: '20px', 
        }}
      >
        404
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '20px', 
        }}
      >
        The page you’re looking for doesn't exist.
      </Typography>

       {/* Use Link to navigate to the landing page */}
       <Link to="/home">
        <Button variant="contained" sx={{ backgroundColor: 'white', color: primary }}>
          Back Home
        </Button>
      </Link>
    </Box>
  );
}

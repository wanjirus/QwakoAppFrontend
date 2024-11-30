import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

import { getCurrentUser } from '../../REST-API/auth/AuthProvider';
import VideoBackground from './VideoBackground';
import trialVideo from '../../assets/test2.mp4';

const HomePage = () => {
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('No user found on local storage, kindly login or register a new user !!');
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
         minHeight: '120vh', // Allows content to extend beyond the viewport height
        //  paddingBottom: '100px', // Ensures space before reaching footer
        }}
      >
        <VideoBackground videoSource={trialVideo} />
      </Box>
      <Box
  sx={{
    position: 'relative', // Relative positioning to keep it in the normal flow
    width: '80.5%',
    height: '500px',
    backgroundColor: 'white',
    zIndex: 5,
    marginTop: '-210px', // Moves the element up by 300px without creating extra space
    transform: 'translateX(12.219999%)', // Horizontal translation only
    transition: 'margin 0.3s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // '&:hover': {
    //   width: '52%',
    //   height: '420px',
    //   borderRadius: '16px',
    //   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    // },
    borderRadius: '50px',
  }}
>
  <Typography
    variant="h6"
    color="white"
    sx={{
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  >
    Extending Red Container
  </Typography>
</Box>

    </>
  );
};

export default HomePage;

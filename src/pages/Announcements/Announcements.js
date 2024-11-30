import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import Blog from '../../Component/Announcements/Blog';
import Herosection from '../../Component/Announcements/Herosection'


const Announcements = () => {
  useEffect(() => {
    // const user = getCurrentUser();
    // if (user) {
    //   // Landing page is automatically logged out on mount, and clears logged in user from local storage.
    //   signOut();
    //   localStorage.clear();
    //   console.log('user signed out successfully');
    // } else {
    //   console.log('No user found on local storage, kindly login or register a new user !!');
    // }
  }, []);
  return (

    <Box>


      
      <Blog />
      <Herosection/>
    
      



    </Box>

  );
};

export default Announcements;

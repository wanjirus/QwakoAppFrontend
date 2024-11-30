import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import StaffListResults from 'src/components/staff/StaffListResults';
// import StaffListToolbar from 'src/components/staff/StaffListToolbar';
import StaffListResults from '../Component/staff/StaffListResults';
import StaffListToolbar from '../Component/staff/StaffListToolbar';
import { useApi } from '../REST-API/api';
// import { useApi } from 'src/REST-API/api';
// import { useLocation, useParams } from 'react-router';

function CustomerList() {
  const api = useApi();
  // const { userId } = useParams();
  // const location = useLocation();

  const [staffs, setStaffs] = useState(['']);
  useEffect(() => {
    (async () => {
      // const currentUserId = JSON.parse(localStorage.getItem('user')).id;
      const result = await api.get('property', {
        params: {
          userId: 1
        }
      });
      setStaffs(result.data);
     console.log("this should be the number os properties");
      console.log(staffs);
      // console.log("or is this should be the number os properties")
      // console(result.data);
    })();

  }, []);

  return (
    <>
      <Helmet>
        <title>Staffs | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <StaffListToolbar />
          <Box sx={{ pt: 3 }}>
            <StaffListResults staffs={[staffs]} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerList;

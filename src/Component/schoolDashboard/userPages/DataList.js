import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useApi } from '../../../REST-API/api';
import UserPage from './UserPage';

function DataList() {
  const api = useApi();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
      const userString = localStorage.getItem('user');

      if (userString) {
        const currentUserId = JSON.parse(userString).id;
        const result = await api.get('treeplanting', {
          params: {
            userId: currentUserId
          }
        });
        setProperties(result.data);
        //console.log(result);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>ElimuTrees | Ministry of Education</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false} >
          <Box sx={{ pt: 3 }}>
            <UserPage treeplanting={properties} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default DataList;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import CustomerListResults from 'src/components/customer/CustomerListResults';
// import PropertyListToolbar from 'src/components/property/PropertyListToolbar';
import PropertyListReasults from '../Component/property/PropertyListReasults';
import PropertyListToolbar from '../Component/property/PropertyListToolbar';
import {useApi} from '../REST-API/api';


function PropertiesList() {
  const api = useApi();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    (async () => {
        const currentUserId = JSON.parse(localStorage.getItem('user')).id;
      const result = await api.get('property', {
          params:{
              userId: currentUserId
          }
      });
      setProperties(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <PropertyListToolbar />
          <Box sx={{ pt: 3 }}>
            <PropertyListReasults properties={properties} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PropertiesList;
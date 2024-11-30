import React, { useContext, useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { getCurrentUser  } from '../../REST-API/auth/AuthProvider';
import plantImage from '../../assets/plant.jpg';
import { PropertiesContext } from '../../desc/PropertiesContext';
import PropertyGrid from './PropertyGrid';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PropertySearch = () => {
  const { allPropsList } = useContext(PropertiesContext);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(allPropsList.length / recordsPerPage);

  useEffect(() => {
    const user = getCurrentUser ();
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('No user found on local storage, kindly login or register a new user !!');
    }
  }, []);

  // Get properties for the current page
  const currentRecords = allPropsList.slice(
    currentPage * recordsPerPage,
    currentPage * recordsPerPage + recordsPerPage
  );

  // Pagination Controls
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <section style={{ backgroundColor: 'rehd', marginTop: '40px', top: '250px', height: 'auto' }}>
      <Grid container direction="row" style={{ margin: '1px', height: '100%' }}>
        
        {/* First grid (Image Grid) */}
        <Grid item xs={12} md={1.9} style={{ margin: '1px 5px 1px 1px' }}>
          <Paper elevation={0} style={{ borderRadius: '0 10px 10px 0', overflow: 'hidden', height: '100%' }}>
            <img src={plantImage} alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Paper>
        </Grid>

        {/* Second grid (Contains two inner grids) */}
        <Grid container xs={5} md={10} style={{ backgroundColor: 'yhellow', margin: '1px', height: 'auto', display: 'flex', flexDirection: 'row' }}>
          {/* First inner grid (Information Summary) */}
          <Grid item xs={12} md={12} style={{ height: '200px', backgroundColor: 'brohwn', margin: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
              elevation={0}
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" style={{ marginBottom: '8px' }}>Information Summary</Typography>
              <Typography variant="body2" color="textPrimary" style={{ marginBottom: '16px' }}>
                Below is a list of items and a few input fields for user data.
              </Typography>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
                <li><Typography variant="body2">Item One</Typography></li>
                <li><Typography variant="body2">Item Two</Typography></li>
                <li><Typography variant="body2">Item Three</Typography></li>
              </ul>
              <Grid container spacing={2}>
                <Grid item xs={12} md ={6}>
                  <TextField label="First Name" variant="outlined" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Last Name" variant="outlined" fullWidth size="small" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Second inner grid (Two Columns) */}
          <Grid container xs={5} md={10} style={{ backgroundColor: 'yhellow', margin: '1px', height: 'auto', display: 'flex', flexDirection: 'row' }}>
            {currentRecords.map((property) => (
              <PropertyGrid key={property.id} property={property} />
            ))}
          </Grid>

          {/* Pagination Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '20px', padding: '0 20px' }}>
            <Button 
              variant="contained" 
              onClick={handlePreviousPage} 
              disabled={currentPage === 0} 
              style={{ display: 'flex', alignItems: 'center', backgroundColor: '#3f51b5', color: '#fff' }}
            >
              <ArrowBack style={{ marginRight: '5px' }} />
              Previous
            </Button>
            <Typography style={{ alignSelf: 'center' }}>
              Page {currentPage + 1} of {totalPages}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages - 1} 
              style={{ display: 'flex', alignItems: 'center', backgroundColor: '#3f51b5', color: '#fff' }}
            >
              Next
              <ArrowForward style={{ marginLeft: '5px' }} />
            </Button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default PropertySearch;
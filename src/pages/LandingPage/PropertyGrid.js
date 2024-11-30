import React from 'react';
import { Grid, Paper, Typography } from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import plantImage1 from '../../assets/thehouse.jpg';
import theme from '../../theme';

const PropertyGrid = ({ property }) => (
  <Grid container item xs={12} md={12} direction="row" style={{ backgroundColor: 'bglue', marginTop: '5px', display: 'flex', height: '400px' }}>
    
    {/* Left side of the inner grid: Image Slideshow */}
    <Grid item xs={12} md={8.4} style={{ marginRight: '3px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={0} style={{ borderRadius: '10px', overflow: 'hidden', width: '100%', backgroundColor: 'indiggo', display: 'flex', flex: 1 }}>
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <div>
            <img src={plantImage1} alt="Property Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={property.prop_images?.image2 || plantImage1} alt="Property Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={plantImage1} alt="Property Image 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Carousel>
      </Paper>
    </Grid>

    {/* Right side of the inner grid: Property Details */}
    <Grid item xs={12} md={3.559} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={0} style={{ borderRadius: '10px', padding: '16px', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <Grid>
        <Typography variant="h3" color="textPrimary" style={{ marginBottom: '8px', color: theme.palette.secondary.main }}>
          {property.name}
        </Typography>
        </Grid>

        <Grid>
        <Typography variant="body1" style={{ color: '#333', marginBottom: '8px' }}>
          <strong>Price:</strong> ${property.price.toLocaleString()}
        </Typography>
        </Grid>

        <Grid>
        <Typography variant="body2" style={{ color: '#333', marginBottom: '8px' }}>
          <strong>Owner:</strong> {property.owner?.owner_firstname} {property.owner?.owner_lastname}
        </Typography>
        </Grid>

        <Grid>
        <Typography variant="body2" style={{ color: '#333', marginBottom: '8px' }}>
          <strong>Nearest School:</strong> {property.property_location?.nearest_school}
        </Typography>
        </Grid>

        <Grid>
        <Typography variant="body2" style={{ color: '#333', marginBottom: '8px' }}>
          <strong>Nearest Hospital:</strong> {property.property_location?.nearest_hospital}
        </Typography>
        </Grid>

        <Grid>
        <Typography variant="body2" style={{ color: '#333', marginBottom: '8px' }}>
          <strong>Police Station:</strong> {property.property_location?.nearest_police_station}
        </Typography>
        </Grid>

      </Paper>
    </Grid>

  </Grid>
);

export default PropertyGrid;
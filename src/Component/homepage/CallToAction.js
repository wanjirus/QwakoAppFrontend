import React from 'react';
import { Container, Typography, Button, Box, Link } from '@material-ui/core';

function CallToAction() {
  const ctaStyles = {
    backgroundColor: '#DDF1DA',
    padding: '40px',
     overflow: 'hidden',
    textAlign: 'center',
    fontFamily: 'Roboto Condensed',
  };

  const headingStyles = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  };

  const paragraphStyles = {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  };
  return (
    <Box sx={ctaStyles}
    
    >
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Get Involved Today
        </Typography>
        <Typography variant="h1" gutterBottom style={headingStyles}>
          Join the ElimuTrees Movement
        </Typography>
        <Typography variant="body1" paragraph style={paragraphStyles}>
          Make a Difference Today! Whether you're a school administrator, teacher, student, or a volunteer, ElimuTrees offers you the tools to contribute to a greener world.
        </Typography>
        <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: '#603813' }} color="primary" size="large">
          <Link href='http://nemis.education.go.ke/userregister.aspx'>SIGN UP NOW</Link>
        </Button>
      </Container>
    </Box>
  );
}

export default CallToAction;

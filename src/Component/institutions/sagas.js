import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/womanplanting.jpg";

const defaultTheme = createTheme();
const images = [imgheader];

const Sagas = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "auto" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={1} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",

            }}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{ m: 1, marginBottom: 3 }}
            >
              Semi Autonomous Government Agency (SAGA's)
            </Typography>
            <Typography component="body1" variant="body1">
            Semi-autonomous state agencies play a crucial role in the successful implementation of the 
            ambitious goal of growing 15 billion trees. They are responsible for developing and enforcing policies,
             allocating necessary funding and resources, and ensuring access to nurseries and seedlings for
              tree planting projects at a large scale. These agencies actively engage with communities,
               educational institutions, and other stakeholders to raise public awareness about the significance of tree planting and environmental conservation in achieving this goal. They collaborate with various partners, including private companies, to leverage their expertise and resources. Through research and monitoring, these agencies assess the impact of tree planting initiatives and use the findings to inform future policies and strategies. They also offer technical assistance and capacity building support, empowering communities and organizations to effectively participate in tree planting efforts. Their active involvement and coordination at the state level are vital in ensuring the success and sustainability of tree planting initiatives, ultimately contributing to the achievement of the ambitious target of growing 15 billion trees.            </Typography>

          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={12}
          md={6}
          sx={{
            backgroundImage: `url(${imgheader})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Sagas;

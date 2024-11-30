import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/homepage_header.jpeg";

const defaultTheme = createTheme();
const images = [imgheader];

const primarySchool = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "auto" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
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
              Primary School
            </Typography>
            <Typography component="body1" variant="body1">
            Primary schools play a crucial role in tree planting initiatives and fostering a sense of responsibility towards nature in learners. By integrating tree planting in co-curriculum, schools can raise awareness about the importance of trees and their benefits. They can organize tree planting programs on their premises, allowing learners to actively participate in planting and caring for trees. School gardens provide practical spaces for learners to engage in tree planting and learn about the requirements for tree care. Collaboration with local organizations and environmental clubs can amplify the impact of tree planting efforts. Schools can also integrate tree planting in environmental studies, fostering creativity and appreciation for nature. Involving the local community in tree planting events creates a sense of collective responsibility. Through these activities, primary schools instill a love for nature, develop a sense of ownership and responsibility towards trees, and nurture environmentally conscious individuals.

            </Typography>
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
          sm={6}
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

export default primarySchool;

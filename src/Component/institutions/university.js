import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/PSplantingatree.jpeg";


const defaultTheme = createTheme();
const images = [imgheader];

const university = () => {
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
              Universities
            </Typography>
            <Typography component="body1" variant="body1">
               Universities play a crucial role in tree planting exercises and environmental conservation. They contribute in several ways:

Research and Innovation: Universities conduct research on tree species, planting techniques, and environmental impacts, driving innovation in tree planting practices.

Education and Awareness: They provide education on forestry, ecology, and sustainable land management, raising awareness about the importance of tree planting for climate change mitigation and ecosystem improvement.

Demonstrative Sites: Universities maintain campus grounds as living laboratories for sustainable landscaping, showcasing different tree species and planting methods.

Community Engagement: They organize tree planting events, offer technical expertise, and facilitate knowledge exchange with community organizations.

Arboreta and Botanical Gardens: Universities house diverse tree collections, supporting research, conservation, and serving as seed sources for tree planting initiatives.

Collaboration: Universities partner with government agencies, nonprofits, and industry to promote tree planting exercises, contributing scientific expertise and resources.

Student-Led Initiatives: Universities support student-led tree planting campaigns, clubs, and volunteer programs, fostering environmental stewardship.

Overall, universities serve as knowledge hubs, advancing research, education, and community engagement. Through innovation, awareness, collaboration, and student initiatives, they should contribute to effective tree planting strategies and environmental conservation.
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

export default university;

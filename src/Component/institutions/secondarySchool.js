import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/schoolplantingtrees.jpeg";

const defaultTheme = createTheme();
const images = [imgheader];

const secondarySchool = () => {
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
              Secondary School
            </Typography>
            <Typography component="body1" variant="body1">
              High schools play a significant role in tree planting exercises by:

    Environmental Education:{'\n'}
    They provide comprehensive environmental education, teaching students about the importance of trees, their ecological role, and the benefits they offer in mitigating environmental issues.

    Hands-on Tree Planting: 
    High schools organize tree planting campaigns within their premises or in collaboration with local communities, allowing students to actively participate in selecting, planting, and caring for trees{'\n'}.

    Collaboration: They collaborate with local organizations and forestry departments to gain expertise, resources, and guidance for successful tree planting projects, providing students with practical learning opportunities.

    Restoration Projects: High schools engage in larger-scale tree planting and ecosystem restoration projects, partnering with conservation organizations to restore degraded ecosystems and contribute to local biodiversity.

    Research and Data Collection: Students can undertake research projects related to tree planting, collecting data on growth, biodiversity, and environmental impacts, which contributes to scientific knowledge.

    Advocacy and Awareness: High schools raise awareness about tree planting and environmental conservation through campaigns, events, and educational materials, empowering students to become environmental advocates in their communities.

    Sustainable Practices: They set an example by implementing sustainable practices on their campuses, such as tree preservation and sustainable landscaping, promoting environmental stewardship among students.

Overall, high schools play a vital role in educating students about trees, instilling a sense of environmental responsibility, and actively engaging them in tree planting exercises. Through education, collaboration, research, and advocacy, high schools contribute to fostering a generation of environmentally conscious individuals who understand the importance of tree planting and environmental conservation.
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

export default secondarySchool;

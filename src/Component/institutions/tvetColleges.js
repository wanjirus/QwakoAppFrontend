import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/plant.jpg";

const defaultTheme = createTheme();
const images = [imgheader];

const tvetColleges = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "auto" }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square>
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
              component="h3"
              variant="h3"
              sx={{ m: 1, marginBottom: 3 }}
            >
              Colleges and Technical and Vocational Education and Training ()
            </Typography>
            <Typography component="body1" variant="body1">
            TVET centers have a significant role in tree planting and environmental conservation.
             They should integrate these topics into their curriculum, teaching students about tree
              species, cultivation techniques, and sustainable landscaping. Practical hands-on experience
               in tree planting, prepare students for careers in forestry and environmental management.
                Collaborations with industry partners offer real-world projects and internships,
                 enhancing students' skills and knowledge. TVET centers should also develop green spaces
                  on their campuses, to serve as living laboratories, and engage with communities in tree 
                  planting initiatives. Additionally, they should empower students to explore entrepreneurship
                   opportunities in tree planting and environmental conservation. Overall, TVET centers equip
                    students with the necessary skills, knowledge, and practical experience to contribute to tree
                     planting exercises and environmental conservation, fostering environmentally conscious professionals
                      committed to sustainable practices.

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

export default tvetColleges;

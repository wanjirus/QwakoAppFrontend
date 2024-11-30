import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgheader from "../../assets/kidsplanting.jpg";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const defaultTheme = createTheme();
const images = [imgheader];

const Cookies = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
          }}
        >

          <Typography
            component="h1"
            variant="h2"
            sx={{ 
                marginBottom: 5, 
                padding: 5,          
                backgroundImage: `url(${imgheader})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                    t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
            }}
          >
            Cookies Policy
          </Typography>
          <Typography component="body1" variant="body1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Cookies;

import React from "react";
import { Container, Grid, Typography, Link, Divider } from "@material-ui/core";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../assets/footerlogo.png";
import nemislogo from "../../assets/nemislogo1.png";
import WBlogo from "../../assets/WBlogo1.png";

function Footer() {
  const footerStyles = {
    backgroundColor: "#6D7752",
    color: "#fff",
    // padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto Condensed",
  };

  const contentContainerStyles = {
    maxWidth: "100%",
    padding: "0 20px",
  };

  const logoStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "5px",
  };

  const contactInfoStyles = {
    marginBottom: "1.2rem",
  };

  const linkStyles = {
    color: "#fff",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const hoverLinkStyles = {
    ...linkStyles,
    "&:hover": {
      color: "#ffcc00",
    },
  };

  const quickLinksStyles = {
    marginBottom: "20px",
    padding: "10px",
  };

  const quickLinksPart2Styles = {
    marginTop: "20px",
    padding: "10px",
  };

  const legalStyles = {
    marginBottom: "1.2rem",
  };

  const socialLinksStyles = {
    marginTop: "1.2rem",
  };

  return (
    <footer style={footerStyles}>
      <Container sx={{ maxWidth: "100%" }} maxWidth={false}>
        <div style={contentContainerStyles}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <div style={logoStyles}>
                {/* <img src="src/assets/logo.png" alt="Logo 1" style={{ marginRight: '10px' }} />
                                <a href='../../assets/logo.png'></a>
                                {/* <img src="logo2.png" alt="Logo 2" /> */}
                <div className="gpt3__navbar-links_logo">
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginRight: "10px",
                      justify: "space-between",
                    }}
                  />
                </div>
              </div>
              <div style={contactInfoStyles}>
                <p>
                  <a href="tel:+2540203318581">+254 020 331 8581</a> |{" "}
                  <a href="tel:+25470000000">+254 70000000</a>
                </p>
                <p>
                  <a href="mailto:kemissupport@education.go.ke">
                    kemissupport@education.go.ke
                  </a>
                </p>
                <p>
                  <a href="mailto:kemis@education.go.ke">
                    kemis@education.go.ke
                  </a>
                </p>
                <p>
                  <a href="http://www.education.go.ke" target="_blank">
                    www.education.go.ke
                  </a>
                </p>
                <p>
                  <a href="http://nemis.education.go.ke" target="_blank">
                    kemis.education.go.ke
                  </a>
                </p>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <div style={quickLinksStyles}>
                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
                      Quick Links:
                    </Typography>
                    <ul>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          TUTORIALS
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          CREDITS
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          DATA POLICY
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          MEDIA LINKS
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <div style={quickLinksPart2Styles}>
                    <ul>
                      <li>
                        <Link
                          href="https://www.nhif.or.ke/wp-content/uploads/2021/12/EduAfya_Information_Pack.pdf"
                          style={hoverLinkStyles}
                        >
                          NHIF EDUAFYA
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          COVID GUIDELINES
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.knec.ac.ke/category/cba/"
                          style={hoverLinkStyles}
                        >
                          CBA PORTAL
                        </Link>
                      </li>
                      <li>
                        <Link href="#" style={hoverLinkStyles}>
                          UPCOMING EVENTS
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.education.go.ke/"
                          style={hoverLinkStyles}
                        >
                          MINISTRY OF EDUCATION
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <div style={legalStyles}>
                <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
                  Legal:
                </Typography>
                <ul>
                  <li>
                    <Link href="#" style={hoverLinkStyles}>
                      TERMS AND CONDITIONS
                    </Link>
                  </li>
                  <li>
                    <Link href="#" style={hoverLinkStyles}>
                      LICENSE AGREEMENT
                    </Link>
                  </li>
                  <li>
                    <Link href="#" style={hoverLinkStyles}>
                      PRIVACY POLICY
                    </Link>
                  </li>
                  <li>
                    <Link href="#" style={hoverLinkStyles}>
                      COPYRIGHT INFORMATION
                    </Link>
                  </li>
                  <li>
                    <Link href="#" style={hoverLinkStyles}>
                      COOKIES POLICY
                    </Link>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>

          <Divider style={{ margin: "1.2rem 0", backgroundColor: "#facc47" }} />

          <Grid container alignItems="center">
            <Grid
              container
              justifyContent="space-between"
              style={{ alignItems: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  Powered By <br></br>
                  <img
                    src={nemislogo}
                    alt="Nemis Logo"
                    style={{ width: "100px", height: "auto" }}
                  />
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography variant="body1">
                  Supported By <br></br>
                  <img
                    src={WBlogo}
                    alt="WB Logo"
                    style={{
                      width: "130px",
                      height: "auto",
                    }}
                  />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <Typography variant="body1">
                  &copy; 2024 - Ministry of Education - ElimuTrees | Terms and
                  Conditions apply
                </Typography>
                {/* <p style={{ alignItems: 'center', marginLeft: '50px', fontSize:'8px', marginBottom: '50px'}}> <i>Image by <a href="https://www.freepik.com/free-photo/side-view-hands-gardening_34240837.htm#query=trees%20plannting%20sessions&position=9&from_view=search&track=ais">Freepik </a> </i></p> */}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6} style={{ textAlign: "right" }}>
              <div style={socialLinksStyles}>
                <Link
                  href="https://www.facebook.com/EduMinKenya/"
                  style={{
                    ...hoverLinkStyles,
                    marginRight: "10px",
                    color: "#1877f2",
                  }}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="https://twitter.com/EduMinKenya"
                  style={{
                    ...hoverLinkStyles,
                    marginRight: "10px",
                    color: "#1da1f2",
                  }}
                >
                  <TwitterIcon />
                </Link>
                {/* <Link href="#" style={{ ...hoverLinkStyles, color: "#e4405f" }}>
                    <InstagramIcon />
                  </Link> */}
              </div>
            </Grid>
          </Grid>

          <p
            style={{
              alignItems: "center",
              fontSize: "10px",
              marginTop: "20px",
              color: "black",
              float: "right",
            }}
          >
            {" "}
            <i>
              Images by{" "}
              <a href="https://www.freepik.com/free-photo/side-view-hands-gardening_34240837.htm#query=trees%20plannting%20sessions&position=9&from_view=search&track=ais">
                Freepik{" "}
              </a>{" "}
            </i>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

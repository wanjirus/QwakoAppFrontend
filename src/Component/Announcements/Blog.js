import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

const Blog = () => {
	// const containerStyle1 = {
	//     background: 'grey',
	//     paddingBottom: '20px',
	// };
	const containerStyle = {
		marginTop: "65px", // height of the navbar
		backgroundSize: "cover",
		backgroundPosition: "center",
		// height: '90vh',
		// minHeight: '100vh',
		marginBottom: "5rem",
	};

	const headerStyles = {
		textAlign: "center",
		padding: "5px",
	};

	const EventsStyles = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		maxHeight: "100px",
		padding: "1px",
		marginTop: "20px",
	};

	const EventsStyles2 = {
		textAlign: "left",
	};

	return (
		<>
			{/* <Container style={containerStyle}> */}
			<Container
				sx={{ maxWidth: "100%" }}
				maxWidth={false}
				style={containerStyle}
			>
				<Typography variant="h1" gutterBottom>
					Welcome to the Elimu Trees Blog
				</Typography>

				{/* Content Section 1 */}
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={6}>
						<div style={{ padding: "5px", textAlign: "left" }}>
							<Typography variant="h4" gutterBottom>
								<strong>Elimutrees Launching Soon ...</strong>
							</Typography>
							<Typography>
								Elimutrees is an initiative in the ministry of education for
								planting trees and raising awareness about environmental
								conservation in kenyan learning institutions. The Mission is to
								make the world greener and healthier for future generations.
							</Typography>
						</div>
						{/* <div style={{ padding: '5px', textAlign: 'left' }}>
      
            <Typography>
              Elimu Trees is a nonprofit organization dedicated to planting trees and raising awareness about environmental conservation. Our mission is to make the world greener and healthier for future generations.
            </Typography>
          </div>
          <div style={{ padding: '5px', textAlign: 'left' }}>
            <Typography>
              Elimu Trees is a nonprofit organization dedicated to planting trees and raising awareness about environmental conservation. Our mission is to make the world greener and healthier for future generations.
            </Typography>
          </div> */}
					</Grid>

					<Grid item xs={12} md={6}>
						{/* Add an image related to Elimu Trees */}
						<Paper elevation={0}>
							<img
								src="https://img.freepik.com/premium-photo/people-planting-trees-working-community-garden-promoting-local-food-production-habitat-restoration-concept-sustainability-community-engagement-generate-ai_740533-923.jpg?w=740"
								alt="About Us"
								style={{ width: "80%", maxHeight: "100%", borderRadius: "8px" }}
							/>
						</Paper>
					</Grid>
				</Grid>

				<Grid container spacing={3}>
					{/* left */}
					{/* <Grid item xs={12} sm={6} md={6}>
          <div style={{ padding: '5px' }}>
            <Typography variant="h4" gutterBottom>
              Our Tree Planting Initiatives
            </Typography>
            <Typography>
              Tree Planting sessions at Muthaiga Primary schools <br />
              Our Principal secretary education will be available <br />
              Date: 9th/10/2023 <br />
              See you there!
            </Typography>
          </div> */}
					{/* </Grid> */}

					{/* Right */}
					<Grid item xs={12} sm={6} md={6}>
						<div style={{ padding: "0px" }}>
							<div style={EventsStyles}>
								<div style={EventsStyles2}>
									<Typography variant="h4" gutterBottom>
										<strong>Our Tree Planting Initiatives</strong>
									</Typography>
									<Typography>
										With Elimutrees, the ministry organizes tree planting events
										across kenyan schools. We believe that planting trees is a
										crucial step towards combating climate change and preserving
										our planet's beauty.
									</Typography>
								</div>
							</div>
						</div>
					</Grid>
					{/* </div> */}
				</Grid>
			</Container>
		</>
	);
};

export default Blog;

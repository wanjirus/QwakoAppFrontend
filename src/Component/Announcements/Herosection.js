import React from "react";
import {
	Container,
	Grid,
	Paper,
	useMediaQuery,
	Typography,
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image from "../../assets/plant.jpg";
import image2 from "../../assets/womanplanting.jpg";
import image3 from "../../assets/PSplantingatree.jpeg";
import image4 from "../../assets/homepage_header.jpeg";
import image5 from "../../assets/schoolplantingtrees.jpeg";

function Landing() {
	const isMobile = useMediaQuery("(max-width: 700px");
	const isTablet = useMediaQuery("(max-width: 1024px");
	const isLargeScreen = useMediaQuery("(min-width: 1200px");

	const images = [image, image2, image3, image4, image5];

	const landingStyles = {
		margin: 0,
		padding: 0,
		backgroundImage: `url(${image5})`,
		// opacity: 0.8,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundClip: "text",
		height: "100vh",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: "transparent",
		top: 0,
		width: "auto",
	};

	const headingStyles = {
		backgroundColor: "grey",
		marginBottom: "0.5rem",
		padding: "20px",
	};

	const loginCardStyles = {
		borderRadius: "8px",
		boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
		background:
			"linear-gradient(163.77deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.52) 100%)",
		maxWidth: isMobile ? "100%" : "20%",
		marginLeft: "auto",
		marginRight: "auto",
		color: "#000",
		textAlign: "center",
		float: isMobile ? "left" : "right",
		height: "400px",
	};

	if (isTablet) {
		loginCardStyles.width = "50%";
		loginCardStyles.marginLeft = "10px";
		loginCardStyles.fontSize = "12px";
		loginCardStyles.padding = "12px";
	}
	if (isMobile) {
		loginCardStyles.width = "80%";
		loginCardStyles.height = "70%";
		loginCardStyles.margin = "5px";
	}
	if (isLargeScreen) {
		loginCardStyles.width = "50%";
		loginCardStyles.marginLeft = "20px";
		loginCardStyles.padding = "20px";
	}

	const imageStyles = {
		width: "100%",
		height: "150px",
	};

	if (isMobile) {
		imageStyles.width = "50%";
		imageStyles.height = "200px";
	}
	if (isTablet) {
		imageStyles.width = "100%";
		imageStyles.borderRadius = "8px";
	}

	return (
		<div>
			<Paper style={headingStyles}>
				<Typography
					component="h1"
					variant="h2"
					sx={{
						textAlign: "center",
						fontSize: "40px",
						color: "black",
					}}
				>
					<strong>News and Updates</strong>
				</Typography>
				<Typography
					component="h2"
					variant="h3"
					sx={{
						textAlign: "center",
						fontSize: "32px",
						color: "gold",
					}}
				>
					<strong>Latest Events</strong>
				</Typography>
			</Paper>

			<div className="landing" style={landingStyles}>
				<Container sx={{ maxWidth: "100%" }} maxWidth={false}>
					<Grid container spacing={2}>
						{isMobile ? (
							<Carousel
								showThumbs={false}
								showArrows={true}
								infiniteLoop={true}
								autoPlay
								interval={1500}
								emulateTouch
							>
								{images.map((imageUrl, index) => (
									<div key={index}>
										<img
											src={imageUrl}
											alt={`Carousel img ${index + 1}`}
											style={{ width: "100%", height: "250px" }}
										/>
									</div>
								))}
							</Carousel>
						) : (
							<Grid container spacing={2}>
								<Paper style={loginCardStyles}>
									<Paper>
										<img src={image} alt="Reload!" style={imageStyles} />
									</Paper>
									<p>
										A magnificent tree emerges from the Earth, a symbol of
										nature's timeless grace.
									</p>
								</Paper>
								<Paper style={loginCardStyles}>
									<Paper>
										<img src={image2} alt="Reload!" style={imageStyles} />
									</Paper>
									<p style={{ color: "black" }}>
										Amidst the serene landscape, a woman actively engages in a
										tree-planting session, her hands gently cradling a young
										sapling. With a smile that mirrors the promise of new life,
										she imparts her love and care into the earth. A brighter
										future where the seeds of positive change take root and
										flourish.
									</p>
								</Paper>
								<Paper style={loginCardStyles}>
									<Paper>
										<img src={image3} alt="Reload!" style={imageStyles} />
									</Paper>
									<p>
										Inspiring leadership in action as the Cabinet Secretary
										joins a tree-planting session. With determination and a
										shovel in hand, the CS embodies a commitment to
										environmental stewardship. Together, we strive to create a
										future where the roots of sustainability grow deep, and the
										branches of progress reach high.
									</p>
								</Paper>
								<Paper style={loginCardStyles}>
									<Paper>
										<img src={image4} alt="Reload!" style={imageStyles} />
									</Paper>
									<p>
										Youthful pupils, armed with watering cans, eagerly nurture
										the trees they've planted. With each drop of water, they not
										only quench the tree's thirst but also sow the seeds of
										responsibility and environmental consciousness. In their
										small hands lies the promise of a greener future.
									</p>
								</Paper>
							</Grid>
						)}
					</Grid>
				</Container>
			</div>
		</div>
	);
}

export default Landing;

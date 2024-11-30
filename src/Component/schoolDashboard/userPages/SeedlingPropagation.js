import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { getCurrentUser } from "../../../REST-API/auth/AuthProvider";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	Paper,
	Container,
	TextField,
	TextareaAutosize,
	Grid,
	Alert,
	AlertTitle,
	Select,
	MenuItem,
} from "@material-ui/core";
import { styled } from "@mui/system";

const TableContainerStyled = styled(TableContainer)({
	border: "1px solid #dddddd",
	background: "white",
});
const TableStyled = styled(Table)({
	border: "1px solid #dddddd",
	"& th, & td": {
		fontSize: "16px",
		padding: "8px",
	},
	"@media (max-width: 600px)": {
		"& th, & td": {
			fontSize: "8px",
			padding: "1px",
		},
	},
});

const TableCellStyled = styled(TableCell)({
	border: "1px solid #dddddd",
	"&.image-cell": {
		width: "50px",
		"@media (max-width: 600px)": {
			width: "20px",
		},
	},
});
function SeedlingPropagation() {
	const [formData, setFormData] = useState({
		created_by: "",
		description: "",
		fruit_seedlings: "",
		exotic_seedlings: "",
		indigenous_seedlings: "",
		image: "",
	});
	const user = getCurrentUser();
	const username = user.username;
	let urlhom = window.location.origin;
	const headers = {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Methods": "GET, POST",
		"Access-Control-Allow-Headers": "X-Token",
		"Access-Control-Allow-Credentials": "true",
	};
	const [canSet, setCanSet] = useState([]);
	const [propagate, setPropagations] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isTargetSaved, setIsTargetSaved] = useState(false);
	const [canaddseedlingtarget, setcanaddseedlingtarget] = useState("");
	const [seedLings, setseedLings] = useState([]);
	const [fileuploaded, setFileUploaded] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	// Function to handle image changes
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result;
				setFormData({ ...formData, image: base64Image });
				setFileUploaded(base64Image);
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewImage(null);
		}
	};

	// Fetch data on component mount
	useEffect(() => {
		//seedlings propagation list
		let url = urlhom + `/treeapi/api/v1/TreePlanting/seedlings/${username}`;
		axios.get(url, { headers }).then((res) => {
			if (res.status === 200) {
				setseedLings(res.data);
				console.log(res.data);
				console.log("this data");
			}
		});

		//check seedlings targetset
		let seedlingtargeturl =
			urlhom +
			`/treeapi/api/v1/TreePlanting/getAddSeedlingTargetsStatus/${username}`;
		axios.get(seedlingtargeturl, { headers }).then((res) => {
			if (res.status === 200) {
				setcanaddseedlingtarget(res.data);
				console.log(res.data);
				console.log("seedlingTarget");
			}
		});
	}, []);

	const handleSavePropagation = (data) => {
		let urlhom = window.location.origin;
		let url = urlhom + `/treeapi/api/v1/TreePlanting/AddSeedling`;

		const imageprop = JSON.parse(localStorage.getItem("imageprop"));
		const imageblob = localStorage.getItem("imageblob");
		const result = imageprop;

		const mydata = {
			created_by: username,
			description: data.description,
			fruit_seedlings: data.fruit_seedlings,
			exotic_seedlings: data.exotic_seedlings,
			indigenous_seedlings: data.indigenous_seedlings,
			image: fileuploaded,
		};

		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};

		axios
			.post(url, mydata, { headers: headers })
			.then((response) => {
				// Clear the form
				setFormData({
					created_by: "",
					description: "",
					fruit_seedlings: "",
					exotic_seedlings: "",
					indigenous_seedlings: "",
					image: "",
				});

				// Clear the previewImage state
				setPreviewImage("");

				let url = urlhom + `/treeapi/api/v1/TreePlanting/seedlings/${username}`;
				axios.get(url, { headers }).then((res) => {
					if (res.status === 200) {
						setseedLings(res.data);
						console.log(res.data);
						console.log("this data");
					}
				});
				console.log(response);
				console.log(mydata);
				console.log("this data here");
				// Close the form
				setIsFormVisible(false);
				setIsTargetSaved(true);
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};

	// const handleCaptureImage = (imageData) => {
	//   setFormData({ ...formData, image: imageData });
	//   setIsCameraOpen(false); // Close the camera after capturing
	// };

	return (
		<Container
			sx={{ maxWidth: "100%" }}
			maxWidth={false}
			style={{
				background: "#fff",
				padding: "20px",
				margin: "auto",
				height: "100vh",
				width: "auto",
			}}
		>
			<section
				style={{ background: "#e0e0e0", padding: "20px", width: "100%" }}
			>
				{canaddseedlingtarget.canaddseedlingtarget == 0 && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => setIsFormVisible(!isFormVisible)}
						style={{ marginBottom: "16px" }}
					>
						Seedlings Propagated
					</Button>
				)}
				{canaddseedlingtarget.canaddseedlingtarget == 1 && (
					<Alert severity="warning">
						<AlertTitle>Propagation Error</AlertTitle>
						Your Cannot Propagate Seedlings Before Setting Seedling Target for
						the Month — <strong>Check Seedling Target Section!</strong>
					</Alert>
				)}
				{isFormVisible && (
					<Container style={{ background: "#e0e0e0", padding: "20px" }}>
						<form>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="indigenous_seedlings"
										label="Number of Indigenous Seedlings"
										type="number"
										fullWidth
										value={formData.indigenous_seedlings}
										onChange={(e) =>
											setFormData({
												...formData,
												indigenous_seedlings: e.target.value,
											})
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										//was exotic_seedlings
										name="exotic_seedlings"
										label="Number of Exotic Seedlings"
										type="number"
										fullWidth
										value={formData.exotic_seedlings}
										onChange={(e) =>
											setFormData({
												...formData,
												exotic_seedlings: e.target.value,
											})
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="fruit_seedlings"
										label="Number of Fruit Seedlings"
										type="number"
										fullWidth
										value={formData.fruit_seedlings}
										onChange={(e) =>
											setFormData({
												...formData,
												fruit_seedlings: e.target.value,
											})
										}
										required
									/>
								</Grid>

								<Grid item xs={12} sm={6} lg={6}>
									{previewImage && (
										<img
											src={previewImage}
											alt="seedling pic"
											style={{
												width: "120px",
												height: "120px",
												borderRadius: "100%",
											}}
										/>
									)}
									<TextField
										id="fileuploaded"
										type="file"
										accept="image/*"
										// value={fileuploaded}
										onChange={handleImageChange}
										fullWidth
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextareaAutosize
										name="description"
										// label="Seedlings Source"
										fullWidth
										multiline
										rows={4}
										placeholder="Description"
										value={formData.description}
										onChange={(e) =>
											setFormData({ ...formData, description: e.target.value })
										}
										style={{
											marginTop: "16px",
											width: "100%",
											minHeight: "100px",
										}}
										required
									/>
								</Grid>

								{/* <Grid item xs={12} sm={6} lg={6}>
              <Camera/> 
                <Button onClick={() => setIsCameraOpen(true)}>Open Camera </Button>
                {isCameraOpen && (
                  <camera onCapture={handleCaptureImage} onClose={() => setIsCameraOpen(false)} />
                )}
              </Grid> */}

								<Grid item xs={12}>
									<Button
										variant="contained"
										color="warning"
										onClick={() => handleSavePropagation(formData)}
									>
										Save
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => setIsFormVisible(false)}
										style={{ marginLeft: "8px" }}
									>
										Close
									</Button>
								</Grid>
							</Grid>
						</form>
					</Container>
				)}
			</section>
			<section
				style={{
					background: "#ffffff",
					padding: "20px",
					width: "auto",
				}}
			>
				<Container
					sx={{ maxWidth: "100%" }}
					maxWidth={false}
					style={{
						background: "#fff",
						padding: "20px",
						margin: "auto",
						width: "auto",
					}}
				>
					<TableContainerStyled component={Paper}>
						<TableStyled>
							<TableHead>
								<TableRow>
									<TableCellStyled>Date</TableCellStyled>
									<TableCellStyled> Indigenous Seedlings</TableCellStyled>
									<TableCellStyled> Exotic Seedlings</TableCellStyled>
									<TableCellStyled> Fruit Seedlings</TableCellStyled>
									{/* <TableCellStyled>Seedlings Source</TableCellStyled> */}
									<TableCellStyled>Description</TableCellStyled>
									<TableCellStyled>Image</TableCellStyled>
								</TableRow>
							</TableHead>
							<TableBody>
								{seedLings.map((seedling, index) => (
									<TableRow key={index}>
										<TableCellStyled>
											{dateFormat(seedling.image_date, "dd-mm-yyyy")}
										</TableCellStyled>
										<TableCellStyled>
											{seedling.indigenous_seedlings}
										</TableCellStyled>
										<TableCellStyled>
											{seedling.exotic_seedlings}
										</TableCellStyled>

										<TableCellStyled>
											{seedling.fruit_seedlings}
										</TableCellStyled>

										{/* <TableCellStyled>
											{seedling.source}
										</TableCellStyled> */}
										<TableCellStyled>{seedling.description}</TableCellStyled>
										<TableCellStyled>
											{seedling.image && (
												<img
													src={seedling.image}
													alt="seedling pic"
													style={{ width: "50px" }}
												/>
											)}
										</TableCellStyled>
									</TableRow>
								))}
								{seedLings.length === 0 && (
									<TableRow>
										<TableCellStyled colSpan={6}>
											No data available. Please add targets using the form
											above.
										</TableCellStyled>
									</TableRow>
								)}
							</TableBody>
						</TableStyled>
					</TableContainerStyled>
				</Container>
			</section>
		</Container>
	);
}

export default SeedlingPropagation;

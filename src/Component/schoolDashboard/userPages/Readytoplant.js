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
	Typography,
	Box,
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

function Readytoplant() {
	const [formData, setFormData] = useState({
		fruit_trees: "",
		wood_trees: "",
		exotic_seedlings: "",
		description: "",
	});

	const user = getCurrentUser();
	const username = user.username;
	const userCategory = user.category;

	const [targets, setTargets] = useState([]);
	const [canSet, setCanSet] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [seedLings, setSeedlings] = useState([]);
	const [previewImage, setPreviewImage] = useState("");
	const [isTargetSaved, setIsTargetSaved] = useState(false);
	const [fileuploaded, setFileUploaded] = useState("");
	// const [isCameraOpen, setIsCameraOpen] = useState(false);

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

	const handleSaveReadyToPlant = (data) => {
		let urlhom = window.location.origin;
		// let url = urlhom + "/treeapi/api/v1/Target/addTarget";
		const url = urlhom + "/treeapi/api/v1/Seedling/addreadytoplant";
		// const url = `http://localhost:8092/api/v1/Seedling/addreadytoplant`;
		//console.log("Our Data", data);
		const mydata = {
			created_by: username,
			indiginous_seedlings: data.indiginous_seedlings,
			exotic_seedlings: data.exotic_seedlings,
			fruit_seedlings: data.fruit_seedlings,
			description: data.description,
			image: fileuploaded,
		};
		console.log("Our TransformData", mydata);

		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.post(url, mydata, {
				headers: headers,
			})
			.then((response) => {
				setTargets([...seedLings, response.data]);
				// Clear the form
				setFormData({
					created_by: "",
					description: "",
					fruit_seedlings: "",
					indiginous_seedlings: "",
					exotic_seedlings: "",
					image: "",
					previewImage: "",
				});
				// close the form
				setIsFormVisible(false);
				fetchTargetData();

				setIsTargetSaved(true);
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};

	const fetchTargetData = () => {
		const user = getCurrentUser();
		const username = user.username;
		let urlhom = window.location.origin;
		let url = urlhom + `/treeapi/api/v1/Seedling/readytoplant/${username}`;
		// let url = `http://localhost:8092/api/v1/Seedling/readytoplant/${username}`;
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.get(url, { headers })
			.then((response) => {
				setSeedlings(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	const fetchSetTarget = () => {
		const user = getCurrentUser();
		const username = user.username;
		let urlhom = window.location.origin;
		let urlapi = `/treeapi/api/v1/TreePlanting/getAddTargetsStatus/${username}`;
		let url = urlhom + urlapi;
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.get(url, { headers })
			.then((response) => {
				//console.log(response);
				setCanSet(response.data.canaddtarget);
				//console.log(canSet);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	useEffect(() => {
		fetchTargetData();
		fetchSetTarget();
	}, []);

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
			{/* <Box sx={{ mb: 4 }}>
				<Typography
					color="textSecondary"
					fontSize="20px"
					gutterBottom
					variant="body2"
				>
					Use the form below to upload data on seedlings ready for planting.{" "}
				</Typography>
			</Box> */}
			<section
				style={{ background: "#e0e0e0", padding: "20px", width: "100%" }}
			>
				{canSet === "1" && !isTargetSaved && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => setIsFormVisible(true)}
						style={{ marginBottom: "16px" }}
					>
						Seedlings Ready
					</Button>
				)}
				{/* {canSet !== "1" && !isTargetSaved && (
          <p>
            Unable to set a new target; an active target is in place. Please
            wait until next month.
          </p>
        )} */}
				{isFormVisible && (
					<form>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="wood_seedlings"
									label="Number of Indiginous Trees Seedlings"
									type="number"
									fullWidth
									value={formData.indiginous_seedlings}
									onChange={(e) =>
										setFormData({
											...formData,
											indiginous_seedlings: e.target.value,
										})
									}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="exotic_trees"
									label="Number of Exotic Trees Seedlings"
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
									label="Number of Fruit Trees Seedlings"
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

							{/* <Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="exotic_trees"
										label="Number of Exotic Trees Seedlings"
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
								</Grid> */}

							<Grid item xs={12} sm={6} lg={6}>
								<TextareaAutosize
									name="description"
									rowsMin={6}
									placeholder="Description"
									fullWidth
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
								<label htmlFor="image-upload">Upload Image</label>
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
									onClick={() => handleSaveReadyToPlant(formData)}
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
				)}
			</section>
			<section
				style={{ background: "#ffffff", padding: "20px", width: "100%" }}
			>
				<TableContainerStyled component={Paper}>
					<TableStyled>
						<TableHead>
							<TableRow>
								<TableCellStyled>Date</TableCellStyled>
								<TableCellStyled>
									Number of Indiginous Trees Seedlings
								</TableCellStyled>
								<TableCellStyled>
									Number of Exotic Trees Seedlings
								</TableCellStyled>
								<TableCellStyled>
									Number of Fruit Trees Seedlings
								</TableCellStyled>
								<TableCellStyled>Description</TableCellStyled>
								<TableCellStyled>Image</TableCellStyled>
							</TableRow>
						</TableHead>
						<TableBody>
							{seedLings.map((seedling, index) => (
								<TableRow key={index}>
									<TableCellStyled>
										{dateFormat(seedling.created_at, "dd-mm-yyyy")}
									</TableCellStyled>
									<TableCellStyled>
										{seedling.indiginous_seedlings}
									</TableCellStyled>
									<TableCellStyled>{seedling.exotic_seedlings}</TableCellStyled>
									<TableCellStyled>{seedling.fruit_seedlings}</TableCellStyled>
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
										No data available. Please add targets using the form above.
									</TableCellStyled>
								</TableRow>
							)}
						</TableBody>
					</TableStyled>
				</TableContainerStyled>
			</section>
		</Container>
	);
}

export default Readytoplant;

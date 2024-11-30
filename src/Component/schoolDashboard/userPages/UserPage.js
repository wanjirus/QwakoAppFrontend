import React, { useState, useEffect } from "react";
import axios from "axios";
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
	Grid,
	TextField,
	Box,
	Alert,
	AlertTitle,
	MenuItem,
	Select,
	TextareaAutosize,
	InputLabel,
	FormControl,
} from "@material-ui/core";
import { styled } from "@mui/system";
import Camera from "../../Camera";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import { Link } from 'react-router-dom';
// import  from './MonitorTreeStatus';
// const [user, setUser] = useState(null);
// const [username, setUsername] = useState(null);

// if(getCurrentUser()){
//   const user = getCurrentUser();
//   const username = user.username;
//   const userCategory = user.category;
// };

const TableContainerStyled = styled(TableContainer)({
	border: "1px solid #dddddd",
	background: "white",
});

const TableStyled = styled(Table)({
	border: "1px solid #dddddd",
});

const TableCellStyled = styled(TableCell)({
	border: "1px solid #dddddd",
});

function UserPage() {
	const [formData, setFormData] = useState({
		start_date: "",
		end_date: "",
		learners: "",
		staff: "",
		fruit_trees: "",
		indigenious: "",
		exotic: "",
		description: "",
		user_identifier_id: "",
		// lat: "",
		// lon: "",
		// image_date: "",
		// file_name: "",
		image: "",
		source: "",

		//file_path: "",
	});
	let urlhoms = window.location.origin;
	// const imgfilePath = urlhoms + `/Resources/Images/Planting`;

	const user = getCurrentUser();
	const username = user.username;
	const [isTargetSet, setisTargetSet] = useState(false);
	const [plantsession, setSessions] = useState([]);
	//const [openForm, setOpenForm] = useState(false);

	const [isFormVisible, setIsFormVisible] = useState(false);

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64Image = reader.result;
				setFormData({ ...formData, image: base64Image });
			};

			reader.readAsDataURL(file);
		}
	};
	// const openDataForm = () => {
	//   setOpenForm(true);
	// };

	const [isCameraOpen, setIsCameraOpen] = useState(false);

	const handleButtonClick = () => {
		setIsCameraOpen(true);
	};
	const handleCloseButton = () => {
		setIsCameraOpen(false);
	};
	const handleCaptureImage = (imageData) => {};

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

	const fetchData = () => {
		// Make a GET request to fetch data
		let urlhom = window.location.origin;
		let url =
			urlhom + `/treeapi/api/v1/TreePlanting/plantingsession/${username}`;
		//console.log("Getting Data on: ", url);
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.get(url, { headers })
			.then((response) => {
				setSessions(response.data);
				setIsFormVisible(false);
			})
			.catch((error) => {
				// Handle errors
				console.error("Error fetching data:", error);
			});
	};

	const convertToBuffer = (url) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.responseType = "blob";

			xhr.onload = () => {
				if (xhr.status === 200) {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsArrayBuffer(xhr.response);
				} else {
					reject(new Error("Failed to load image"));
				}
			};

			xhr.onerror = reject;
			xhr.send();
		});
	};

	const handleSaveUpperSection = (data) => {
		// Make a POST request to save data
		let urlhom = window.location.origin;
		let url = urlhom + `/treeapi/api/v1/TreePlanting/Session`;
		//console.log("Our Data", data, url);
		//console.log("the image");
		//console.log(data.image);
		const imageprop = JSON.parse(localStorage.getItem("imageprop"));
		const imageblob = localStorage.getItem("imageblob");
		const result = imageprop;

		//console.log("Our Image", result);

		const mydata = {
			start_date: data.start_date,
			end_date: data.end_date,
			learners: data.learners,
			staff: data.staff,
			fruit_trees: data.fruit_trees,
			indigenous: data.indigenous,
			exotic: data.exotic,
			description: data.description,
			user_identifier_id: username,
			// lat: mlatitude,
			// lon: mlongitude,
			// image_date: imageDate,
			// file_name: fileName,
			image: data.image,
			source: data.source,
			// file_path: filePath,
		};

		//console.log("Our TransformData", mydata);

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
				setSessions([...plantsession, response.data]);
				// Clear the form
				setFormData({
					start_date: "",
					end_date: "",
					learners: "",
					staff: "",
					fruit_trees: "",
					indigenious: "",
					exotic: "",
					description: "",
					user_identifier_id: "",
					// lat: "",
					// lon: "",
					image_date: "",
					// file_name: "",
					image: "",
					source: "",
					// file_path: "",
				});
				// close the form
				setIsFormVisible(false);
				fetchData();
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};

	// Fetch data on component mount
	useEffect(() => {
		//console.log("Getting Data NOW");
		fetchData();
		var indigenoustargets = sessionStorage.getItem(
			"currenttargetindigenoustrees"
		);
		var exotictargets = sessionStorage.getItem("currenttargetexotictrees");
		var fruittargets = sessionStorage.getItem("currenttargetfruittrees");
		var targets = indigenoustargets + exotictargets + fruittargets;
		console.log(
			sessionStorage.getItem("currentliveindigenoustrees"),
			sessionStorage.getItem("currentliveexotictrees"),
			sessionStorage.getItem("currentlivefruittrees"),
			fruittargets,
			indigenoustargets,
			exotictargets
		);
		if (targets > 0) {
			setisTargetSet(true);
		}
	}, []);

	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const imageConvert = (mybyte) => {
		//const base64Data = btoa(String.fromCharCode(...new Uint8Array(mybyte)));
		return `data:image/jpeg;base64,${mybyte}`;
	};

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
				{isTargetSet && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => setIsFormVisible(true)}
						style={{ marginBottom: "16px" }}
					>
						Capture Planting
					</Button>
				)}
				{!isTargetSet && (
					<Alert severity="warning">
						<AlertTitle>Planting Error</AlertTitle>
						Your Cannot Plant Trees Before Setting a Target —{" "}
						<strong>Check Target Setting Section!</strong>
					</Alert>
				)}
				{isFormVisible && (
					<Container style={{ background: "#e0e0e0", padding: "20px" }}>
						<form>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="start_date"
										label="Start Date"
										type="date"
										fullWidth
										value={formData.start_date || ""}
										onChange={(e) =>
											setFormData({ ...formData, start_date: e.target.value })
										}
										required
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="end_date"
										label="End Date"
										type="date"
										fullWidth
										value={formData.end_date || ""}
										onChange={(e) =>
											setFormData({ ...formData, end_date: e.target.value })
										}
										required
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={4} lg={4}>
									<TextField
										name="indigenious"
										label="Number of indigenious Seedlings"
										type="number"
										fullWidth
										value={formData.indigenous || ""}
										onChange={(e) =>
											setFormData({ ...formData, indigenous: e.target.value })
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={4} lg={4}>
									<TextField
										name="exotic"
										label="Number of exotic Seedlings"
										type="number"
										fullWidth
										value={formData.exotic || ""}
										onChange={(e) =>
											setFormData({ ...formData, exotic: e.target.value })
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={4} lg={4}>
									<TextField
										name="fruit_trees"
										label="Number of Fruit Trees Seedlings"
										type="number"
										fullWidth
										value={formData.fruit_trees || ""}
										onChange={(e) =>
											setFormData({ ...formData, fruit_trees: e.target.value })
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="staff"
										label="Number of Staff"
										type="number"
										fullWidth
										value={formData.staff || ""}
										onChange={(e) =>
											setFormData({ ...formData, staff: e.target.value })
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="learners"
										label="Number of Learners"
										type="number"
										fullWidth
										value={formData.learners || ""}
										onChange={(e) =>
											setFormData({ ...formData, learners: e.target.value })
										}
										required
									/>
								</Grid>

								<Grid item xs={12} sm={6} lg={6}>
									<FormControl fullWidth>
										<InputLabel id="source-label">Seedlings Source</InputLabel>
										<Select
											labelId="source-label"
											name="source"
											value={formData.source}
											onChange={(e) =>
												setFormData({
													...formData,
													source: e.target.value,
												})
											}
											style={{
												backgroundColor: "#f0f0f0",
												color: "#000",
												width: "200px",
											}}
										>
											<MenuItem
												style={{ backgroundColor: "#f0f0f0", color: "#000" }}
												value="Donation"
											>
												Donation
											</MenuItem>
											<MenuItem
												style={{ backgroundColor: "#f0f0f0", color: "#000" }}
												value="Seedling Nursery"
											>
												Seedling Nursery
											</MenuItem>
											<MenuItem
												style={{ backgroundColor: "#f0f0f0", color: "#000" }}
												value="Outsourced"
											>
												Outsourced
											</MenuItem>
											<MenuItem
												style={{ backgroundColor: "#f0f0f0", color: "#000" }}
												value="Other"
											>
												Other - Specify
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										type="file"
										accept="image/*"
										id="image-upload"
										onChange={handleFileChange}
									/>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="description"
									label="Description"
									fullWidth
									multiline
									rows={4}
									value={formData.description || ""}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
								/>
							</Grid>

							{/* <Grid item xs={12} sm={6} lg={6}>
                  <TextareaAutosize
                    name="description"
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
                </Grid> */}
							<Grid
								item
								xs={12}
								sm={6}
								lg={6}
								// style={{
								//   display: "flex",
								//   flexDirection: "row",
								//   padding: "10px",
								//   marginTop: "20px",
								// }}
							>
								{/* <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {isCameraOpen ? (
                      <div>
                        <Button
                          onClick={handleCloseButton}
                          style={{ marginBottom: "10px", float: "right" }}
                        >
                          <CloseIcon />
                        </Button>
                        <Camera onCapture={handleCaptureImage} />
                      </div>
                    ) : (
                      <Button onClick={handleButtonClick}>
                        <Box display="flex" alignItems="center">
                          <PhotoCameraIcon
                            style={{
                              marginRight: "5px",
                              width: "40px",
                              height: "30px",
                              color: "black",
                            }}
                          />
                          <label style={{ color: "black" }}>Take Photo </label>
                        </Box>
                      </Button>
                    )}
                  </div> */}

								<Grid item xs={12}>
									<Button
										variant="contained"
										color="warning"
										onClick={() => handleSaveUpperSection(formData)}
									>
										Save
									</Button>
									<Button
										variant="contained"
										color="warning"
										onClick={() => setIsFormVisible(false)}
										style={{ marginLeft: "16px" }}
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
									<TableCellStyled>StartDate</TableCellStyled>
									<TableCellStyled>EndDate</TableCellStyled>
									<TableCellStyled>IndigenousTrees</TableCellStyled>
									<TableCellStyled>ExoticTrees</TableCellStyled>
									<TableCellStyled>FruitTrees</TableCellStyled>
									<TableCellStyled>Staff</TableCellStyled>
									<TableCellStyled>Learners</TableCellStyled>
									{/* <TableCellStyled>Description</TableCellStyled> */}
									{/* <TableCellStyled>Latitude</TableCellStyled>
                  <TableCellStyled>Longitude</TableCellStyled>
                  <TableCellStyled>Upload</TableCellStyled> */}
									<TableCellStyled>Images</TableCellStyled>
									<TableCellStyled>Seedlings Source</TableCellStyled>
								</TableRow>
							</TableHead>
							<TableBody>
								{plantsession.map((row, index) => (
									<TableRow key={index}>
										<TableCellStyled>{row.start_date}</TableCellStyled>
										<TableCellStyled>{row.end_date}</TableCellStyled>
										<TableCellStyled>{row.indigenous}</TableCellStyled>
										<TableCellStyled>{row.exotic}</TableCellStyled>
										<TableCellStyled>{row.fruit_trees}</TableCellStyled>
										<TableCellStyled>{row.staff}</TableCellStyled>
										<TableCellStyled>{row.learners}</TableCellStyled>
										{/* <TableCellStyled>{row.description}</TableCellStyled> */}
										{/* <TableCellStyled>{row.lat.slice(0,8)}</TableCellStyled>
                    <TableCellStyled>{row.lon.slice(0,7)}</TableCellStyled> */}
										<TableCellStyled>
											{row.image && (
												<img
													src={row.image}
													alt="TreePhoto"
													style={{ width: "50px" }}
												/>
											)}
										</TableCellStyled>
										<TableCellStyled>{row.source}</TableCellStyled>
									</TableRow>
								))}
							</TableBody>
						</TableStyled>
					</TableContainerStyled>
				</Container>
			</section>
		</Container>
	);
}

export default UserPage;

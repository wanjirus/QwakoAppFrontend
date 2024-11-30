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
} from "@material-ui/core";
import { styled } from "@mui/system";
import Camera from "../../Camera";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import { useLocation } from "react-router";

function MonitoringPage() {
	const [formData, setFormData] = useState({
		created_by: "",
		fruit_trees_alive: "",
		indigenous_trees_alive: "",
		exotic_trees_alive: "",
		participants: "",
		description: "",
		user_identifier_id: "",
		image: "",
		file_path: "",
		file_name: "",
		image_date: "",
		lat: "",
		lon: "",
	});

	const location = useLocation();
	const user = getCurrentUser();
	const username = user.username;

	const [monitoringsession, setSessions] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [isMonitor, setisMonitor] = useState(false);
	const [plantedindigenoustrees, setplantedIndigenousTrees] = useState(0);
	const [plantedexotictrees, setplantedExoticTrees] = useState(0);
	const [plantedfruittrees, setplantedfruittrees] = useState(0);
	const [plantedtotaltrees, setplantedtotaltrees] = useState(0);
	const [monitorerror, setmonitorerror] = useState(false);

	const handleButtonClick = () => {
		setIsCameraOpen(true);
	};
	const handleCloseButton = () => {
		setIsCameraOpen(false);
	};
	const handleCaptureImage = (imageData) => {};

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
			urlhom + `/treeapi/api/v1/TreePlanting/treemonitoring/${username}`;
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

	const handleUpload = (file, filename) => {
		// Now 'fileName' contains the original file name with a timestamp
		const buffer = convertToBuffer(file);
		const updatedImageBlob = new Blob([buffer], { type: "image/jpeg" });

		const formData = new FormData();
		formData.append("file", updatedImageBlob, filename);
		let urlhom = window.location.origin;
		const filePath = urlhom + `/Resources/Images/Monitoring`;
		const result = axios.post(filePath, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		//console.log('File name with timestamp:', filename);
	};

	const handleUpload2 = (fileblob, filename) => {
		// Now 'fileName' contains the original file name with a timestamp

		let urlhom = window.location.origin;
		const url = urlhom + `/treeapi/api/v1/Image/upload`;

		const file = new File([fileblob], filename, { type: "image/jpeg" }); // Adjust the MIME type as needed
		//console.log(file, url);
		const headers = {
			"Content-Type":
				"multipart/form-data; boundary=----WebKitFormBoundaryexampleboundary",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};

		//console.log("Method One !!!")

		axios
			.post(url, formData, { headers })
			.then((response) => {
				//console.log(response)
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});

		//console.log("Another Method!!!")

		fetch(url, {
			method: "POST",
			body: formData,
			headers: headers,
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response from the server
				//console.log(data);
			})
			.catch((error) => {
				console.error("Error uploading image:", error);
			});
	};

	const handleSaveUpperSection = (data) => {
		// Make a POST request to save data
		let urlhom = window.location.origin;
		let url = urlhom + `/treeapi/api/v1/TreePlanting/Monitoring`;
		//console.log("Our Data", data, url);
		const imageprop = JSON.parse(localStorage.getItem("imageprop"));
		// const imageblob = localStorage.getItem('imageblob');
		const result = imageprop;
		//console.log("Our Image", result);

		// const mlatitude = result.latitude;
		// const mlongitude = result.longitude;
		// const imageDate = result.imagedate;
		// const fileName = result.filename;
		// const myImage = result.image;
		if (
			plantedfruittrees >= data.fruit_trees_alive &&
			plantedindigenoustrees >= data.indigenous_trees_alive &&
			plantedexotictrees >= data.exotic_trees_alive
		) {
			const mydata = {
				created_by: username,
				fruit_trees_alive: data.fruit_trees_alive,
				indigenous_trees_alive: data.indigenous_trees_alive,
				exotic_trees_alive: data.exotic_trees_alive,
				participants: data.participants,
				description: data.description,
				user_identifier_id: username,
				image: data.image,
				// file_name: fileName,
				// image_date: imageDate,
				// lat: mlatitude,
				// lon: mlongitude
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
					setSessions([...monitoringsession, response.data]);
					// Clear the form
					setFormData({
						created_by: "",
						fruit_trees_alive: "",
						indigenous_trees_alive: "",
						exotic_trees_alive: "",
						participants: "",
						description: "",
						user_identifier_id: "",
						image: "",
						// file_path: "",
						// file_name: "",
						// image_date: "",
						// lat: "",
						// lon: "",
					});
					// close the form
					setIsFormVisible(false);
					fetchData();
					//getStatusData();
				})
				.catch((error) => {
					console.error("Error saving data:", error);
				});
		} else {
			//console.log("Cannot monitor more trees than those planted!!!");
			setmonitorerror(true);
		}
	};
	// Fetch data on component mount
	useEffect(() => {
		//console.log("Getting Data NOW");
		fetchData();
		// let woodtargets = sessionStorage.getItem("currenttargetindegenoustrees");
		// let fruittargets = sessionStorage.getItem("currenttargetfruittrees");
		// let exoticTargets = sessionStorage.getItem("currenttargetexotictrees");
		let plantedIndegenoustrees = sessionStorage.getItem(
			"currentliveindigenoustrees"
		);
		let plantedFtrees = sessionStorage.getItem("currentlivefruittrees");
		let plantedExoticTrees = sessionStorage.getItem("currentliveexotictrees");
		console.log(
			"Current Trees: ",
			plantedFtrees,
			plantedIndegenoustrees,
			plantedExoticTrees
		);

		let plantedtrees =
			plantedIndegenoustrees + plantedFtrees + plantedExoticTrees;
		if (plantedtrees > 0) {
			setisMonitor(true);
		}
		setplantedfruittrees(plantedFtrees);
		setplantedIndigenousTrees(plantedIndegenoustrees);
		setplantedExoticTrees(plantedExoticTrees);
		setplantedtotaltrees(plantedtrees);
	}, []);

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
				{isMonitor && (
					<Button
						variant="contained"
						color="warning"
						onClick={() => setIsFormVisible(true)}
						style={{ marginBottom: "16px" }}
					>
						GROWTH REPORTING
					</Button>
				)}
				{!isMonitor && (
					<Alert severity="warning">
						<AlertTitle>Growth Reporting Error</AlertTitle>
						Your Cannot Monitor Trees Which You Have Not Planted —{" "}
						<strong>Check Trees Planted Section to Verify!</strong>
					</Alert>
				)}
				{monitorerror && (
					<Alert severity="failure">
						<AlertTitle>Growth Reporting Data Error!!!</AlertTitle>
						Your Growth Report on Fruit / Wood Trees cannot be More than Current
						Alive — <strong>Check and correct Accordingly!</strong>
					</Alert>
				)}
				{isFormVisible && (
					<Container style={{ background: "#e0e0e0", padding: "20px" }}>
						<form>
							<Grid container spacing={3}>
								{/* First 3 fields */}
								<Grid item xs={12} sm={6} lg={4}>
									<TextField
										name="indigenous_trees_alive"
										label=" Indigenous Trees Alive"
										type="number"
										fullWidth
										value={formData.indigenous_trees_alive || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												indigenous_trees_alive: e.target.value,
											})
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={4}>
									<TextField
										name="exotic_trees_alive"
										label="Exotic Trees Alive"
										type="number"
										fullWidth
										value={formData.exotic_trees_alive || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												exotic_trees_alive: e.target.value,
											})
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={4}>
									<TextField
										name="fruit_trees_alive"
										label="Fruit Trees Alive"
										type="number"
										fullWidth
										value={formData.fruit_trees_alive || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												fruit_trees_alive: e.target.value,
											})
										}
										required
									/>
								</Grid>

								{/* Remaining fields */}
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="participants"
										label="Number of Participants"
										type="number"
										fullWidth
										value={formData.participants || ""}
										onChange={(e) =>
											setFormData({ ...formData, participants: e.target.value })
										}
										required
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={6}>
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

								<Grid item xs={12} sm={6} lg={6}>
									<label htmlFor="image-upload">Upload Image</label>
									<input
										type="file"
										accept="image/*"
										id="image-upload"
										onChange={handleFileChange}
									/>
								</Grid>

								<Grid item xs={12}>
									<Button
										variant="contained"
										color="warning"
										onClick={() => handleSaveUpperSection(formData)}
										// disabled={!isPhotoCaptured}
									>
										Save
									</Button>
									<Button
										variant="contained"
										color="warning"
										onClick={() => {
											// setCreated_at("");
											// setParticipants("");
											// setwood_trees_alive("");
											// setfruit_trees_alive("");
											// setdescription("");
											setIsFormVisible(false);
										}}
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
				style={{ background: "#ffffff", padding: "20px", width: "100%" }}
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
									<TableCellStyled>GrowthReportingDate</TableCellStyled>
									<TableCellStyled>Username</TableCellStyled>
									<TableCellStyled>IndigenousTreesAlive</TableCellStyled>{" "}
									<TableCellStyled>ExoticTreesAlive</TableCellStyled>{" "}
									<TableCellStyled>FruitTreesAlive</TableCellStyled>
									<TableCellStyled>No. Participants</TableCellStyled>
									{/* <TableCellStyled>Description</TableCellStyled> */}
									{/* <TableCellStyled>Latitude</TableCellStyled>
                  <TableCellStyled>Longitude</TableCellStyled> */}
									<TableCellStyled>Image</TableCellStyled>
								</TableRow>
							</TableHead>
							<TableBody>
								{monitoringsession.map((row, index) => (
									<TableRow key={index}>
										<TableCellStyled>{row.image_date}</TableCellStyled>
										<TableCellStyled>{row.user_identifier_id}</TableCellStyled>
										<TableCellStyled>
											{row.indigenous_trees_alive}
										</TableCellStyled>{" "}
										<TableCellStyled>{row.exotic_trees_alive}</TableCellStyled>{" "}
										<TableCellStyled>{row.fruit_trees_alive}</TableCellStyled>
										<TableCellStyled>{row.participants}</TableCellStyled>
										{/* <TableCellStyled>{row.description}</TableCellStyled> */}
										{/* <TableCellStyled>{row.lat.slice(0,8)}</TableCellStyled>
                    <TableCellStyled>{row.lon.slice(0,7)}</TableCellStyled> */}
										<TableCellStyled>
											{row.image && (
												<img
													src={`${row.image}`}
													alt="TreePhoto"
													style={{ width: "50px" }}
												/>
											)}
										</TableCellStyled>
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

export default MonitoringPage;

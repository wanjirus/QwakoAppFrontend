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

function SchoolTargets() {
	const [formData, setFormData] = useState({
		learners: "",
		staff: "",
		wood_trees: "",
		fruit_trees: "",
		target_area: "",
		description: "",
	});

	const user = getCurrentUser();
	const username = user.username;
	const userCategory = user.category;
	const [Homebaseurl, setNemisURL] = useState("");
	const [totalTargets, setTotalTargets] = useState([]);
	const [targets, setTargets] = useState([]);
	const [canSet, setCanSet] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isTargetSaved, setIsTargetSaved] = useState(false);
	// const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

	useEffect(() => {
		determineHomebaseUrl();
		if (Homebaseurl) {
			fetchEnrollement();
		}
	}, [Homebaseurl]);

	const determineHomebaseUrl = () => {
		const locURL = window.location.origin;
		if (locURL.includes("education.go.ke")) {
			setNemisURL("http://nemis.education.go.ke");
		}
		if (locURL.substring(7, 18) === "10.104.100.") {
			setNemisURL("http://10.104.100.83");
		}
		if (locURL.substring(7, 16) === "localhost") {
			setNemisURL("http://nemis.education.go.ke");
		}
	};

	const urlhom = window.location.origin;
	const getStatusData = () => {
		axios
			.get(
				urlhom + `/treeapi/api/v1/TreePlanting/plantedtreestatus/${username}`
			)
			.then((response) => {
				//console.log(response.data);
				var tabledata = response.data;
				//console.log(tabledata);
				sessionStorage.setItem(
					"currenttargetindigenoustrees",
					tabledata.targetindigenoustrees
				);
				sessionStorage.setItem(
					"currenttargetexotictrees",
					tabledata.targetexotictrees
				);
				sessionStorage.setItem(
					"currenttargetfruittrees",
					tabledata.targetfruittrees
				);
				sessionStorage.setItem(
					"currentliveindigenoustrees",
					tabledata.currentliveindigenoustrees
				);
				sessionStorage.setItem(
					"currentliveexotictrees",
					tabledata.currentliveexotictrees
				);
				sessionStorage.setItem(
					"currentlivefruittrees",
					tabledata.currentlivefruittrees
				);
				//console.log(sessionStorage.getItem("currentlivewoodtrees"),sessionStorage.getItem("currentlivefruittrees"));
			})
			.catch((error) => {
				console.error("Error fetching total trees data:", error);
			});
	};

	const crdpassword = "9876$Teta";
	const crdusername = "nemisadmin";
	const credentials = `${crdusername}:${crdpassword}`;
	const base64Credentials = btoa(credentials);
	const headers = {
		Authorization: `Basic ${base64Credentials}`,
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Methods": "GET, POST",
		"Access-Control-Allow-Headers": "X-Token",
		"Access-Control-Allow-Credentials": "true",
	};

	const fetchEnrollement = () => {
		const urlhomeEnrollement =
			Homebaseurl + `/generic2/api/SchDashboard/${username}`;
		const urlhomeStaff =
			Homebaseurl + `/generic2/api/SchDashboard/StaffSummary/${username}`;

		// Fetch enrollement data
		axios
			.get(urlhomeEnrollement, { headers })
			.then((responseEnrollement) => {
				console.log("Enrollement data:", responseEnrollement.data);

				// Calculate the studentsEnrollement
				const studentsEnrollement = responseEnrollement.data.reduce(
					(acc, obj) => {
						return acc + (parseInt(obj.total) || 0);
					},
					0
				);

				console.log("Students Enrollement:", studentsEnrollement);
				const studentsTargets = studentsEnrollement * 4;
				// setStudentsTargets(studentsTargets);
				console.log("Students targets:", studentsTargets);

				// Fetch staff enrollement data
				axios
					.get(urlhomeStaff, { headers })
					.then((responseStaff) => {
						console.log("Staff enrollement data:", responseStaff.data);

						// Calculate the staffTotal
						const staffTotal = responseStaff.data.reduce((acc, obj) => {
							return (
								acc +
								(parseInt(obj.totalTrs) || 0) +
								(parseInt(obj.support_Total) || 0)
							);
						}, 0);

						console.log("Staff Total:", staffTotal);
						const staffTargets = staffTotal * 30;
						// setStaffTargets(staffTargets);
						console.log("Staff Targets:", staffTargets);

						const allTargets = studentsTargets + staffTargets;
						setTotalTargets(allTargets);
						console.log("all targets" + allTargets);
					})
					.catch((error) => {
						console.error("Error fetching staff enrollement data:", error);
					});

				// Now you can set the studentsEnrollement value to state or perform any other action
			})
			.catch((error) => {
				console.error("Error fetching enrollement data:", error);
			});
	};

	const handleSaveTarget = (data) => {
		let urlhom = window.location.origin;
		let url = urlhom + "/treeapi/api/v1/Target/addTarget";
		//console.log("Our Data", data);
		const mydata = {
			learners: data.learners,
			staff: data.staff,
			target_area: data.target_area,
			fruit_trees: data.fruit_trees,
			// wood_trees: data.wood_trees,
			exotic_trees: data.exotic_trees,
			indigenous_trees: data.indigenous_trees,
			description: data.description,
			user_identifier_id: username,
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
				setTargets([...targets, response.data]);
				// Clear the form
				setFormData({
					learners: "",
					staff: "",
					fruit_trees: "",
					exotic_trees: "",
					indigenous_trees: "",
					target_area: "",
					description: "",
				});
				// close the form
				setIsFormVisible(false);
				fetchTargetData();
				getStatusData();
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
		let url = urlhom + `/treeapi/api/v1/Target/getTarget/${username}`;
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.get(url, { headers })
			.then((response) => {
				setTargets(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	const fetchSetTarget = () => {
		const user = getCurrentUser();
		const username = user.username;
		let urlhom = window.location.origin;
		let url =
			urlhom + `/treeapi/api/v1/TreePlanting/getAddTargetsStatus/${username}`;
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
						Tree Targets
					</Button>
				)}
				{canSet !== "1" && !isTargetSaved && (
					<p>
						Unable to set a new target; an active target is in place. Please
						wait until next Year.
					</p>
				)}
				{isFormVisible && (
					<form>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="learners"
									label="Number of Learners"
									type="number"
									fullWidth
									value={formData.learners}
									onChange={(e) =>
										setFormData({ ...formData, learners: e.target.value })
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
									value={formData.staff}
									onChange={(e) =>
										setFormData({ ...formData, staff: e.target.value })
									}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="indigenous_trees"
									label="Number of indigenous Trees"
									type="number"
									fullWidth
									value={formData.indigenous_trees}
									onChange={(e) =>
										setFormData({
											...formData,
											indigenous_trees: e.target.value,
										})
									}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="exotic_trees"
									label="Number of exotic Trees"
									type="number"
									fullWidth
									value={formData.exotic_trees}
									onChange={(e) =>
										setFormData({ ...formData, exotic_trees: e.target.value })
									}
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="fruit_trees"
									label="Number of Fruit Trees"
									type="number"
									fullWidth
									value={formData.fruit_trees}
									onChange={(e) =>
										setFormData({ ...formData, fruit_trees: e.target.value })
									}
									required
								/>
							</Grid>

							<Grid item xs={12} sm={6} lg={6}>
								<TextField
									name="target_area"
									label="Total Allocated Area (Hectares)"
									type="number"
									fullWidth
									value={formData.target_area}
									onChange={(e) =>
										setFormData({ ...formData, target_area: e.target.value })
									}
									required
								/>
							</Grid>
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
									onClick={() => handleSaveTarget(formData)}
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
								<TableCellStyled>Number of Learners</TableCellStyled>
								<TableCellStyled>Number of Staff</TableCellStyled>
								<TableCellStyled>Number of Indigenous Trees</TableCellStyled>
								<TableCellStyled>Number of Exotic Trees</TableCellStyled>
								<TableCellStyled>Number of Fruit Trees</TableCellStyled>
								<TableCellStyled>
									Total Allocated Area (Hectares)
								</TableCellStyled>
								<TableCellStyled>Description</TableCellStyled>
							</TableRow>
						</TableHead>
						<TableBody>
							{targets.map((target, index) => (
								<TableRow key={index}>
									<TableCellStyled>
										{dateFormat(target.created_at, "dd-mm-yyyy")}
									</TableCellStyled>
									<TableCellStyled>{target.learners}</TableCellStyled>
									<TableCellStyled>{target.staff}</TableCellStyled>
									<TableCellStyled>{target.indigenous_trees}</TableCellStyled>
									<TableCellStyled>{target.exotic_trees}</TableCellStyled>
									<TableCellStyled>{target.fruit_trees}</TableCellStyled>
									<TableCellStyled>{target.target_area}</TableCellStyled>
									<TableCellStyled>{target.description}</TableCellStyled>
								</TableRow>
							))}
							{targets.length === 0 && (
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

export default SchoolTargets;

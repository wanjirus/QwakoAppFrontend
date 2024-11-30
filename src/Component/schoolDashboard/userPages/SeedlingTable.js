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

function SeedlingTable() {
	const [formData, setFormData] = useState({
		fruit_trees: "",
		indigenous_trees: "",
		exotic_trees: "",
		description: "",
	});

	const user = getCurrentUser();
	const username = user.username;
	const userCategory = user.category;

	const [targets, setTargets] = useState([]);
	const [canSet, setCanSet] = useState([]);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isTargetSaved, setIsTargetSaved] = useState(false);
	// const [isCameraOpen, setIsCameraOpen] = useState(false);
	const getStatusData = () => {
		axios
			.get(`treeapi/api/v1/TreePlanting/plantedtreestatus/${username}`)
			.then((response) => {
				//console.log(response.data);
				var tabledata = response.data;
				//console.log(tabledata);
				sessionStorage.setItem(
					"currenttargetindigenoustrees",
					tabledata.targetwoodtrees
				);
				sessionStorage.setItem(
					"currenttargetexotictrees",
					tabledata.targetwoodtrees
				);
				sessionStorage.setItem(
					"currenttargetfruittrees",
					tabledata.targetfruittrees
				);
				sessionStorage.setItem(
					"currentliveindigenoustrees",
					tabledata.currentlivewoodtrees
				);
				sessionStorage.setItem(
					"currentliveexotictrees",
					tabledata.currentlivewoodtrees
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
	const handleSaveTarget = (data) => {
		let urlhom = window.location.origin;
		const url = urlhom + "/treeapi/api/v1/Seedling/addSeedlingTarget";
		const mydata = {
			created_by: username,
			fruit_trees: data.fruit_trees,
			indigenous_trees: data.indigenous_trees,
			exotic_trees: data.exotic_trees,
			description: data.description,
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
					indigenous_trees: "",
					exotic_trees: "",
					fruit_trees: "",
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
		let url = urlhom + `/treeapi/api/v1/Seedling/${username}`;
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
				{/* hide and unhide the form */}
				<Button
					variant="contained"
					color="warning"
					onClick={() => setIsFormVisible(!isFormVisible)}
					style={{ marginBottom: "16px" }}
				>
					Seedlings Targets
				</Button>
				{/* )} */}
				{/* {
			canSet !== '1' && !isTargetSaved (
				<p>Unable to set a new target; an active target is in place. (targets are set once every month)</p>
			)
		} */}

				{isFormVisible && (
					<Container style={{ background: "#e0e0e0", padding: "20px" }}>
						<form>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6} lg={6}>
									<TextField
										name="indigenous_trees"
										label="Number of Indigenous Trees Seedlings"
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
										label="Number of Exotic Trees Seedlings"
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
										label="Number of Fruit Trees Seedlings"
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
					</Container>
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
								<TableCellStyled>Indigenous Trees</TableCellStyled>
								<TableCellStyled>Exotic Trees</TableCellStyled>
								<TableCellStyled>Fruit Trees </TableCellStyled>
								<TableCellStyled>Total</TableCellStyled>
								<TableCellStyled>Description</TableCellStyled>
							</TableRow>
						</TableHead>
						<TableBody>
							{targets.map((target, index) => (
								<TableRow key={index}>
									<TableCellStyled>
										{new Date(target.created_at).toLocaleDateString()}
									</TableCellStyled>
									<TableCellStyled>{target.indigenous_trees}</TableCellStyled>
									<TableCellStyled>{target.exotic_trees}</TableCellStyled>
									<TableCellStyled>{target.fruit_trees}</TableCellStyled>
									<TableCellStyled>{target.total}</TableCellStyled>
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

export default SeedlingTable;

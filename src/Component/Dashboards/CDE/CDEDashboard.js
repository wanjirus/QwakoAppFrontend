import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Bar } from "react-chartjs-2";
import SchoolsTable from "../SCDE/Schooldata";
import { getCurrentUser } from "../../../REST-API/auth/AuthProvider";
import axios from "axios";
import IndividualReports from "../../IndividualReports";

const CDEDashboard = () => {
	const [totalTargets, setTotalTargets] = useState([]);
	const [totalTrees, setTotalTrees] = useState([]);
	const [label, setLabels] = useState([]);
	const [schools, setSchools] = useState([]);
	const [fruitTrees, setFruitTrees] = useState([]);
	const [indigenousTrees, setIndigenousTrees] = useState([]);
	const [exoticTrees, setExoticTrees] = useState([]);
	const [seedlingsTarget, setSeedlingsTarget] = useState([]);
	const [totalseedlings, setSeedlingsTotal] = useState([]);
	const [seedlingsReady, setSeedlingsReady] = useState([]);
	const [trees_dead, setTreesDead] = useState([]);
	const [target, setTarget] = useState([]);
	const [monitor, setMonitor] = useState([]);
	const [totalMonitors, setTotalMonitor] = useState([]);
	const user = getCurrentUser();
	const username = user.username;

	useEffect(() => {
		const fetchTreeData = () => {
			// Fetch total trees data from the API
			axios
				.get(
					`treeapi/api/v1/TreePlanting/getTotalTreesPerMonthAdmin/${username}`
				)
				.then((response) => {
					setTotalTrees(response.data.map((entry) => entry.total_trees));
					setTotalTargets(
						response.data.map((entry) => entry.target_total_trees)
					);
					setTotalMonitor(
						response.data.map((entry) => entry.monitor_total_trees)
					);
					setLabels(response.data.map((entry) => entry.month_name));
					//console.log('Total trees data:', response.data);
				})
				.catch((error) => {
					console.error("Error fetching total trees data:", error);
				});
		};

		fetchTreeData();
	}, []);

	useEffect(() => {
		const fetchTotalData = () => {
			// Fetch total trees data from the API
			axios
				.get(
					`treeapi/api/v1/TreePlanting/getTotalTreesGenaralAdmin/${username}`
				)
				.then((response) => {
					setSchools(response.data.map((entry) => entry.total_schools));
					setFruitTrees(response.data.map((entry) => entry.fruit_trees));
					setIndigenousTrees(
						response.data.map((entry) => entry.indigenous_trees)
					);
					setExoticTrees(response.data.map((entry) => entry.exotic_trees));
					setTarget(response.data.map((entry) => entry.target_total_trees));
					setMonitor(response.data.map((entry) => entry.monitor_total_trees));
					setSeedlingsTarget(
						response.data.map((entry) => entry.totalseedlingstargets)
					);
					setSeedlingsTotal(response.data.map((entry) => entry.totalseedlings));
					setSeedlingsReady(
						response.data.map((entry) => entry.total_seedlings_ready)
					);
					setTreesDead(
						response
							? response.data.map(
									(entry) =>
										(entry.total_trees || 0) -
										((entry.fruit_trees_alive || 0) +
											(entry.indigenous_trees_alive || 0) +
											(entry.exotic_trees_alive || 0))
							  )
							: []
					);
					//console.log('Total trees data:', response.data);
				})
				.catch((error) => {
					console.error("Error fetching total trees data:", error);
				});
		};

		fetchTotalData();
	}, []);

	const sessionReports = {
		labels: label,
		datasets: [
			{
				label: "Target Trees",
				data: totalTargets,
				borderColor: "green",
				backgroundColor: "rgba(0, 128, 0, 0.2)",
			},
			{
				label: "Trees Planted",
				data: totalTrees,
				borderColor: "blue",
				backgroundColor: "rgba(0, 0, 255, 0.2)",
			},

			{
				label: "Tree Monitoring",
				data: totalMonitors,
				borderColor: "orange",
				backgroundColor: "orange",
			},
		],
	};

	const chartStyles = {
		width: "100%",
		height: "auto",
		marginBottom: "50px",
	};

	return (
		<Container
			sx={{ maxWidth: "100%" }}
			maxWidth={false}
			className="dashboard"
			marginTop="auto"
			style={{ backgroundColor: "white" }}
		>
			<h2>Dashboard</h2>
			<Grid
				container
				spacing={2}
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					marginTop: "20px",
				}}
			>
				{/* Institutions Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Institutions
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{schools}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Seedlings Targets Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Seedlings-Targets
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{seedlingsTarget}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Seedlings Propagated Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Seedlings-Propagated
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{totalseedlings}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Seedlings Ready Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Seedlings-Ready
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{seedlingsReady}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Targets Set Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Trees Targeted
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{target}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Planted Trees Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Planted Trees
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{!isNaN(parseInt(fruitTrees)) &&
								!isNaN(parseInt(indigenousTrees)) &&
								!isNaN(parseInt(exoticTrees))
									? parseInt(fruitTrees) +
									  parseInt(indigenousTrees) +
									  parseInt(exoticTrees)
									: 0}
							</Typography>
						</div>
					</CardContent>
				</Card>

				{/* Monitored Trees Card */}
				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Monitored Trees
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{monitor}
							</Typography>
						</div>
					</CardContent>
				</Card>

				<Card
					className="card-stats mb-4 mb-xl-0"
					style={{
						width: "23%",
						marginTop: "8px",
						marginBottom: "8px",
						backgroundColor: "#e3e3e3",
					}}
				>
					<CardContent style={{ paddingBottom: "10px" }}>
						<div className="col">
							<Typography
								variant="h5"
								component="h2"
								style={{ fontSize: "14px" }}
							>
								Trees Dead
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{trees_dead}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Grid>

			<IndividualReports />
			<div style={chartStyles}>
				<Bar
					data={sessionReports}
					options={{ scales: { x: { display: false }, y: { display: false } } }}
				/>
			</div>
			<div>
				<SchoolsTable />
			</div>

			<div
				sx={{
					...chartStyles,
					"@media (max-width: 600px)": {
						/* Styles for small screens */
						height: "300px",
					},
					"@media (min-width: 601px) and (max-width: 960px)": {
						/* Styles for medium screens */
						height: "400px",
					},
					"@media (min-width: 961px)": {
						/* Styles for large screens */
						width: "70%",
						height: "50vh",
					},
				}}
			></div>
		</Container>
	);
};

export default CDEDashboard;

import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import SchoolsTable from ".././../Dashboards/SCDE/Schooldata";
import { getCurrentUser } from "../../../REST-API/auth/AuthProvider";
import axios from "axios";
import IndividualReports from "../../IndividualReports";

const Dashboard = () => {
	const [Homebaseurl, setNemisURL] = useState("");
	const [locURL, setLocURL] = useState("");
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
	const [trees_alive, setTreesAlive] = useState([]);
	const [trees_dead, setTreesDead] = useState([]);

	const [target, setTarget] = useState([]);
	const [monitor, setMonitor] = useState([]);
	const [totalMonitors, setTotalMonitor] = useState([]);
	const user = getCurrentUser();
	const username = user.username;
	const [countylist, setCountylist] = useState([]);
	const [scountylist, setScountylist] = useState([]);
	const [county_code, setCounty] = useState("AllCounties");
	const [county_name, setCountyName] = useState("");
	const [sub_county_code, setSubCounty] = useState("AllSubCounties");
	const [sub_county_name, setSubCountyName] = useState("");
	const [sessionReports, setSessionReports] = useState({});
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [],
	});

	const determineHomebaseUrl = () => {
		const locURL = window.location.origin;

		// console.log(locURL);
		// console.log(
		//   locURL.substring(7, 23),
		//   locURL.substring(7, 23) === "education.go.ke"
		// );
		// console.log(
		//   locURL.substring(7, 18),
		//   locURL.substring(7, 18) === "10.104.100."
		// );
		// console.log(
		//   locURL.substring(7, 16),
		//   locURL.substring(7, 16) === "localhost"
		// );

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

	useEffect(() => {
		determineHomebaseUrl();
		if (Homebaseurl) {
			getCounties();
		}
	}, [Homebaseurl]);

	useEffect(() => {
		if (Homebaseurl) {
			getSubCounties(county_code);
		}
	}, [county_code, Homebaseurl]);

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
	const getCounties = () => {
		const url = "/generic2/api/Cascade/Counties";
		const urlhome = `${Homebaseurl}${url}`;

		//console.log(urlhome);

		axios
			.get(urlhome, { headers })
			.then((response) => {
				setCountylist(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	const getSubCounties = (countycode) => {
		const url = `/generic2/api/Cascade/SubCounties/${countycode}`;
		const urlhome = `${Homebaseurl}${url}`;

		//console.log(urlhome);

		axios
			.get(urlhome, { headers })
			.then((response) => {
				setScountylist(response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	const handleCountyChange = (e) => {
		const selectedCountyCode = e.target.value;
		setCounty(selectedCountyCode);

		if (selectedCountyCode === "AllCounties") {
			// Reset subcounty selection when "All Counties" is selected
			setSubCounty("AllSubCounties");
		} else {
			// Fetch new subcounty data based on the selected county
			const option = countylist.find(
				(option) => option.county_Code === selectedCountyCode
			);
			const text = option.county_Name;
			setCountyName(text);

			getSubCounties(selectedCountyCode);
		}
	};

	const handleSubCountyChange = (e) => {
		setSubCounty(e.target.value);
		var mscounty = e.target.value;
		const option = scountylist.find(
			(option) => option.sub_County_Code === mscounty
		);
		var text = option.sub_County_Name;
		setSubCountyName(text);
	};

	// useEffect(() => {
	//   getCounties();
	// }, []);
	// useEffect(() => {
	//   getSubCounties(county_code);
	// }, [county_code]);

	useEffect(() => {
		const fetchTotalData = () => {
			// Build the base URL with the username
			let apiUrl = `treeapi/api/v1/TreePlanting/getTotalTreesGenaralAdmin/${username}`;

			// Check if county_code is available, append it to the URL
			if (county_code && county_code !== "AllCounties") {
				apiUrl += `/${county_code}`;

				// Check if sub_county_code is available, append it to the URL
				if (sub_county_code && sub_county_code !== "AllSubCounties") {
					apiUrl += `/${sub_county_code}`;
				}
			}

			// If neither county_code nor sub_county_code are available, fetch data with the base URL
			axios
				.get(apiUrl)
				.then((response) => {
					const data =
						response.data.length === 0
							? [
									{
										total_schools: 0,
										fruit_trees: 0,
										indigenous_trees: 0,
										exotic_trees: 0,
										target_total_trees: 0,
										monitor_total_trees: 0,
										totalseedlingstargets: 0,
										totalseedlings: 0,
										trees_alive: 0,
										trees_dead: 0,
									},
							  ]
							: response.data;

					setTotalData(data);
				})
				.catch((error) => {
					console.error("Error fetching total trees data:", error);
				});
		};

		const setTotalData = (data) => {
			setSchools(data.map((entry) => entry.total_schools));
			setFruitTrees(data.map((entry) => entry.fruit_trees));
			setIndigenousTrees(data.map((entry) => entry.indigenous_trees));
			setExoticTrees(data.map((entry) => entry.exotic_trees));
			setTarget(data.map((entry) => entry.target_total_trees));
			setMonitor(data.map((entry) => entry.monitor_total_trees));
			setSeedlingsTarget(data.map((entry) => entry.totalseedlingstargets));
			setSeedlingsTotal(data.map((entry) => entry.totalseedlings));
			setSeedlingsReady(data.map((entry) => entry.total_seedlings_ready));
			setTreesAlive(
				data
					? data.map(
							(entry) =>
								(entry.fruit_trees_alive || 0) +
								(entry.indigenous_trees_alive || 0) +
								(entry.exotic_trees_alive || 0)
					  )
					: []
			);

			setTreesDead(
				data
					? data.map(
							(entry) =>
								(entry.total_trees || 0) -
								((entry.fruit_trees_alive || 0) +
									(entry.indigenous_trees_alive || 0) +
									(entry.exotic_trees_alive || 0))
					  )
					: []
			);
		};

		// Fetch data when the component mounts
		fetchTotalData();
	}, [username, county_code, sub_county_code]);

	useEffect(() => {
		// Update the chart data when sessionReports changes
		setChartData({
			labels: label,
			datasets: [
				{
					label: "Trees Targeted",
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
					label: "Growth Reporting",
					data: totalMonitors,
					borderColor: "orange",
					backgroundColor: "orange",
				},
			],
		});
	}, [sessionReports, label, totalTargets, totalTrees, totalMonitors]);

	useEffect(() => {
		const fetchTreeData = () => {
			let apiUrl = `treeapi/api/v1/TreePlanting/getTotalTreesPerMonthAdmin/${username}`;
			// Check if county_code is available, append it to the URL
			if (county_code && county_code !== "AllCounties") {
				apiUrl += `/${county_code}`;

				// Check if sub_county_code is available, append it to the URL
				if (sub_county_code && sub_county_code !== "AllSubCounties") {
					apiUrl += `/${sub_county_code}`;
				}
			}
			axios
				.get(apiUrl)
				.then((response) => {
					const responseData = response.data;

					setTotalTrees(responseData.map((entry) => entry.total_trees));
					setTotalTargets(
						responseData.map((entry) => entry.target_total_trees)
					);
					setLabels(responseData.map((entry) => entry.month_name));
					setTotalMonitor(
						responseData.map((entry) => entry.monitor_total_trees)
					);
				})
				.catch((error) => {
					console.error("Error fetching total trees data:", error);
				});
		};

		fetchTreeData();
	}, [username, county_code, sub_county_code]);

	const chartStyles = {
		width: "100%",
		height: "auto",
		marginBottom: "50px",
	};

	const [selectedDate, setSelectedDate] = useState(
		new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
	);

	const [datePickerOpen, setDatePickerOpen] = useState(false);

	const setDate = (date) => {
		setSelectedDate(date);
	};

	const handleDateClick = () => {
		setDatePickerOpen(true);
	};

	const handleDatePickerChange = (newDate) => {
		setSelectedDate(newDate);
		setDatePickerOpen(false);
	};

	return (
		<Container
			sx={{ maxWidth: "100%" }}
			maxWidth={false}
			className="dashboard"
			marginTop="auto"
			style={{ backgroundColor: "white" }}
		>
			<Grid container spacing={2}>
				<Grid item xs={6} style={{ marginTop: "16px" }}>
					<FormControl fullWidth>
						<InputLabel id="type-label">County</InputLabel>
						<Select
							labelId="type-label"
							id="county_code"
							value={county_code}
							onChange={(e) => handleCountyChange(e)}
							required
							MenuProps={{
								PaperProps: {
									style: {
										backgroundColor: "#394d0b",
										color: "#fff",
									},
								},
							}}
							sx={{
								"& .MuiSelect-select": {
									padding: "8px",
								},
							}}
						>
							<MenuItem value="AllCounties">All Counties</MenuItem>
							{countylist?.map((option) => (
								<MenuItem key={option.county_Name} value={option.county_Code}>
									{option.county_Name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} style={{ marginTop: "16px" }}>
					<FormControl fullWidth>
						<InputLabel id="subcounty-label">Sub_County</InputLabel>
						<Select
							labelId="subcounty-label"
							id="sub_county_code"
							value={sub_county_code}
							onChange={(e) => handleSubCountyChange(e)}
							required
							MenuProps={{
								PaperProps: {
									style: {
										backgroundColor: "#394d0b",
										color: "#fff",
									},
								},
							}}
							sx={{
								"& .MuiSelect-select": {
									padding: "8px",
								},
							}}
						>
							<MenuItem value="AllSubCounties">All Sub-Counties</MenuItem>
							{scountylist?.map((option) => (
								<MenuItem
									key={option.sub_County_Name}
									value={option.sub_County_Code}
								>
									{option.sub_County_Name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{/* <h2>Dashboard</h2> */}
			<Grid
				container
				spacing={2}
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					marginTop: "20px",
				}}
			>
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
				{/* <Card className="card-stats mb-4 mb-xl-0" style={{ width: "15%" }}>
					<CardContent>
						<div className="col">
							<Typography variant="h5" component="h2">
								Fruit Trees
							</Typography>

							<Typography variant="h2" component="h3">
								{fruitTrees || 0}
							</Typography>
						</div>
					</CardContent>
				</Card>

				<Card className="card-stats mb-4 mb-xl-0" style={{ width: "15%" }}>
					<CardContent>
						<div className="col">
							<Typography variant="h5" component="h2">
								Wood Trees
							</Typography>
							<Typography variant="h2" component="h3">
								{woodTrees || 0}
							</Typography>
						</div>
					</CardContent>
				</Card> */}

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
								Trees Planted
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
				{/* <Card
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
								Trees Monitored
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
				</Card> */}
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
								Trees Alive
							</Typography>
							<Typography
								variant="h2"
								component="h3"
								style={{ fontSize: "21px" }}
							>
								{trees_alive}
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
			<div style={{ width: "90%", margin: "0 auto" }}>
				<Bar
					data={chartData}
					options={{
						scales: { x: { display: false }, y: { display: false } },
					}}
				/>
			</div>
			<div>
				<SchoolsTable county={county_code} subCounty={sub_county_code} />
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

export default Dashboard;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	InputAdornment,
	IconButton,
	TextField,
	TablePagination,
	Button,
	Menu,
	MenuItem,
	Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import Papa from "papaparse";
import { getCurrentUser } from "../../../REST-API/auth/AuthProvider";

const SchoolsTable = ({ county, subCounty }) => {
	const [schools, setSchools] = useState([]);
	const [filters, setFilters] = useState({
		global: "",
	});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [anchorEl, setAnchorEl] = useState(null);
	const tableRef = useRef(null);

	const [tableData, setTableData] = useState([]);

	const user = getCurrentUser();
	const username = user.username;

	useEffect(() => {
		const fetchTotalData = () => {
			let apiUrl = `treeapi/api/v1/TreePlanting/getSchoolListTotalTreesReports/${username}`;

			// Check if county_code is available, append it to the URL
			if (county && county !== "AllCounties") {
				apiUrl += `/${county}`;

				// Check if sub_county_code is available, append it to the URL
				if (subCounty && subCounty !== "AllSubCounties") {
					apiUrl += `/${subCounty}`;
				}
			}

			axios
				.get(apiUrl)
				.then((response) => {
					setTableData(response.data);
				})
				.catch((error) => {
					console.error("Error fetching total trees data:", error);
				});
		};

		fetchTotalData();
	}, [username, county, subCounty]);

	const handleFilterChange = (field, value) => {
		setFilters({ ...filters, [field]: value });
	};

	const handleClearFilter = () => {
		setFilters({ global: "" });
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDownloadClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleDownloadClose = (format) => {
		setAnchorEl(null);
		if (format === "CSV") {
			exportCSV();
		} else if (format === "Excel") {
			exportExcel();
		}
	};

	const exportExcel = () => {
		let filename = "ElimuTreesdata.xlsx";
		if (county && subCounty) {
			filename = `${county}-${subCounty}-ElimuTreesdata.xlsx`;
		} else if (county) {
			filename = `${county}-AllSubCounties-ElimuTreesdata.xlsx`;
		} else {
			filename = "AllCounties-AllSubCounties-ElimuTreesdata.xlsx";
		}

		const data = tableData.map((school) => ({
			UIC: school.uic,
			Type: school.type,
			"School Name": school.institution_name,
			"Seedlings Targets": school.totalseedlingstargets,
			"Seedlings Propagated": school.totalseedlings,
			"Seedlings Ready": school.total_seedlings_ready,
			"Trees Targets": school.target_total_trees,
			"Fruit Trees": school.fruit_trees,
			"Indigenous Trees": school.indigenous_trees,
			"Exotic Trees": school.exotic_trees,
			"Total Planted": school.total_trees,
			"Trees Alive": school.total_alive_trees,
		}));

		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Data");
		XLSX.writeFile(wb, filename);
	};

	const exportCSV = () => {
		let filename = "ElimuTreesdata.csv";
		if (county && subCounty) {
			filename = `${county}-${subCounty}-ElimuTreesdata.csv`;
		} else if (county) {
			filename = `${county}-AllSubCounties-ElimuTreesdata.csv`;
		} else {
			filename = "AllCounties-AllSubCounties-ElimuTreesdata.csv";
		}

		const data = tableData.map((school) => ({
			UIC: school.uic,
			Type: school.type,
			"School Name": school.institution_name,
			"Seedlings Targets": school.totalseedlingstargets,
			"Seedlings Propagated": school.totalseedlings,
			"Seedlings Ready": school.total_seedlings_ready,
			"Trees Targets": school.target_total_trees,
			"Fruit Trees": school.fruit_trees,
			"Indigenous Trees": school.indigenous_trees,
			"Exotic Trees": school.exotic_trees,
			"Total Planted": school.total_trees,
			"Trees Alive": school.total_alive_trees,
		}));

		const csvData = Papa.unparse(data);
		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
		FileSaver.saveAs(blob, filename);
	};

	return (
		<Grid item xs={12} sm={6} md={8}>
			<Paper
				elevation={3}
				style={{
					padding: "16px",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TextField
					label="Search"
					variant="outlined"
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								{filters.global && (
									<IconButton onClick={handleClearFilter}>
										<ClearIcon />
									</IconButton>
								)}
							</InputAdornment>
						),
					}}
					value={filters.global}
					onChange={(e) => handleFilterChange("global", e.target.value)}
				/>
				<Button
					color="primary"
					aria-label="Filter List"
					onClick={handleDownloadClick}
					style={{ background: "#007bff", color: "#fff" }}
				>
					<GetAppIcon />
					Export
				</Button>
			</Paper>
			<TableContainer
				component={Paper}
				style={{
					padding: "16px",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Table ref={tableRef} id="Treedata">
					<TableHead>
						<TableRow>
							<TableCell>UIC</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>School Name</TableCell>
							<TableCell>Seedlings Targets</TableCell>
							<TableCell>Seedlings Propagated</TableCell>
							<TableCell>Seedlings Ready</TableCell>
							<TableCell>Trees Targets</TableCell>
							<TableCell>Indigenous Trees</TableCell>
							<TableCell>Exotic Trees</TableCell>
							<TableCell>Fruit Trees</TableCell>
							<TableCell>Total Planted</TableCell>
							<TableCell>Trees Alive</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData
							.filter((school) => {
								const globalFilter = filters.global.toLowerCase();
								return (
									globalFilter === "" ||
									school.type.toString().includes(globalFilter) ||
									school.uic.toLowerCase().includes(globalFilter)
								);
							})
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((school) => (
								<TableRow key={school.id}>
									<TableCell>{school.uic}</TableCell>
									<TableCell>{school.type}</TableCell>
									<TableCell>{school.institution_name}</TableCell>
									<TableCell>{school.totalseedlingstargets}</TableCell>
									<TableCell>{school.totalseedlings}</TableCell>
									<TableCell>{school.total_seedlings_ready}</TableCell>
									<TableCell>{school.target_total_trees}</TableCell>
									<TableCell>{school.indigenous_trees}</TableCell>
									<TableCell>{school.exotic_trees}</TableCell>
									<TableCell>{school.fruit_trees}</TableCell>
									<TableCell>{school.total_trees}</TableCell>
									<TableCell>{school.total_alive_trees}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={tableData.length}
				page={page}
				onPageChange={handlePageChange}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleRowsPerPageChange}
			/>

			<Grid item xs={12} sm={6} md={4}>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleDownloadClose}
					PaperProps={{
						style: {
							backgroundColor: anchorEl ? "#ffffff" : "transparent",
						},
					}}
				>
					{["Excel", "CSV"].map((format) => (
						<MenuItem key={format} onClick={() => handleDownloadClose(format)}>
							{format}
						</MenuItem>
					))}
				</Menu>
			</Grid>
		</Grid>
	);
};

export default SchoolsTable;

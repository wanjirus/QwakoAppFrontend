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
	// InputAdornment,
	// IconButton,
	// TextField,
	// TablePagination,
	// Button,
	// Menu,
	// MenuItem,
	Grid,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ClearIcon from "@mui/icons-material/Clear";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
//import Papa from "papaparse";
import { getCurrentUser } from "../REST-API/auth/AuthProvider";

const IndividualReports = () => {
	const [tabledata, setTableData] = useState([]);
	const user = getCurrentUser();
	const username = user.username;

	const fetchTotalData = () => {
		axios
			.get(`treeapi/api/v1/TreePlanting/plantedtreestatus/${username}`)
			.then((response) => {
				console.log(response.data);
				setTableData(response.data);
				console.log(tabledata);
			})
			.catch((error) => {
				console.error("Error fetching total trees data:", error);
			});
	};

	useEffect(() => {
		fetchTotalData();
	}, []);

	return (
		<Grid item xs={12} sm={6} md={8}>
			<div>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{/* <TableCell>Seedlings Targets</TableCell> */}
								<TableCell>Set Targets</TableCell>
								<TableCell>Trees Planted</TableCell>
								<TableCell>Trees Alive</TableCell>
								{/* <TableCell>Growth Reported</TableCell> */}
								<TableCell>Trees Dead</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow key={tabledata.user_id}>
								{/* <TableCell>{tabledata.totalseedlingstargets}</TableCell> */}
								<TableCell>
									{tabledata.targetfruittrees +
										tabledata.targetindigenoustrees +
										tabledata.targetexotictrees}
								</TableCell>
								<TableCell>
									{tabledata.currentliveindigenoustrees +
										tabledata.currentliveexotictrees +
										tabledata.currentlivefruittrees +
										tabledata.fruittreesdead +
										tabledata.exotictreesdead +
										tabledata.indigenoustreesdead || 0}
								</TableCell>
								<TableCell>
									{tabledata.currentliveindigenoustrees +
										tabledata.currentliveexotictrees +
										tabledata.currentlivefruittrees}
								</TableCell>
								{/* <TableCell>{tabledata.lastmonitoredwoodtrees+ tabledata.lastmonitoredfruittrees}</TableCell> */}
								<TableCell>
									{tabledata.fruittreesdead +
										tabledata.indigenoustreesdead +
										tabledata.exotictreesdead}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Grid>
	);
};

export default IndividualReports;

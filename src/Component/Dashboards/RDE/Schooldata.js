import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";

const SchoolsTable = () => {
  const [schools, setSchools] = useState([]);
  const [filters, setFilters] = useState({
    global: "",
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Simulated dummy data for testing
    const dummyData = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      rank: index + 1,
      name: `School ${index + 1}`,
      treesPlanted: 300 + Math.floor(Math.random() * 200),
      zone: `Zone ${String.fromCharCode(65 + (index % 26))}`,
    }));

    setSchools(dummyData);
    setLoading(false);
  }, []);

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

  const handleDownloadClose = () => {
    setAnchorEl(null);
  };

  const exportFormats = ["CSV", "Excel"];

  return (
    <div style={{ width: "80%", marginTop: "20px" }}>
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
          style={{ background: "transparent" }}
        >
          <GetAppIcon />
        </Button>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>School Name</TableCell>
              <TableCell>Trees Planted</TableCell>
              <TableCell>Zone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools
              .filter((school) => {
                const globalFilter = filters.global.toLowerCase();
                return (
                  globalFilter === "" ||
                  school.rank.toString().includes(globalFilter) ||
                  school.name.toLowerCase().includes(globalFilter) ||
                  school.treesPlanted.toString().includes(globalFilter) ||
                  school.zone.toLowerCase().includes(globalFilter)
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.rank}</TableCell>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.treesPlanted}</TableCell>
                  <TableCell>{school.zone}</TableCell>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDownloadClose}
      >
        {exportFormats.map((format) => (
          <MenuItem key={format} onClick={handleDownloadClose}>
            {format}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SchoolsTable;

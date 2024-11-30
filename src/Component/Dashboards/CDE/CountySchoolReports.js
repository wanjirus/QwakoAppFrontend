
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Select,
  MenuItem, 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const dummySchools = [
  { id: 1, name: "aquinas high school", type: "boys boarding", subcounty: "subcounty 1", treesPlanted: 120, target: 100 },
  { id: 2, name: "highway secondary school", type: "boys day", subcounty: "subcounty 2", treesPlanted: 90, target: 100 },
  { id: 3, name: "huruma girls' high school", type: "girls day & boarding", subcounty: "subcounty 3", treesPlanted: 150, target: 100 },
  { id: 4, name: "our lady of mercy secondary school south b", type: "girls day", subcounty: "subcounty 4", treesPlanted: 70, target: 100 },
  { id: 5, name: "ofafa jericho high school", type: "boys boarding", subcounty: "subcounty 1", treesPlanted: 110, target: 100 },
  { id: 6, name: "nileroad secondary", type: "girls day", subcounty: "subcounty 2", treesPlanted: 85, target: 100 },
  { id: 7, name: "st. teresa's boys secondary school", type: "boys day", subcounty: "subcounty 3", treesPlanted: 130, target: 100 },
  { id: 8, name: "makongeni secondary school", type: "mixed day", subcounty: "subcounty 4", treesPlanted: 95, target: 100 },
  { id: 9, name: "ruaraka high school", type: "mixed day", subcounty: "subcounty 1", treesPlanted: 105, target: 100 },
  { id: 10, name: "buruburu girls secondary school", type: "girls boarding", subcounty: "subcounty 2", treesPlanted: 140, target: 100 },
  { id: 11, name: "our lady of fatima secondary school", type: "mixed day", subcounty: "subcounty 3", treesPlanted: 80, target: 100 },
  { id: 12, name: "baba dogo secondary school", type: "mixed day", subcounty: "subcounty 4", treesPlanted: 75, target: 100 },
  { id: 13, name: "c.g.h.u secondary school", type: "mixed day", subcounty: "subcounty 1", treesPlanted: 115, target: 100 },
  { id: 14, name: "eastleigh high school", type: "boys day", subcounty: "subcounty 2", treesPlanted: 110, target: 100 },
  { id: 15, name: "maina wanjigi secondary school", type: "mixed day", subcounty: "subcounty 3", treesPlanted: 90, target: 100 },
  { id: 16, name: "uhuru secondary school", type: "boys day", subcounty: "subcounty 4", treesPlanted: 120, target: 100 },
  { id: 17, name: "kamukunji secondary school", type: "mixed day", subcounty: "subcounty 1", treesPlanted: 100, target: 100 },
  { id: 18, name: "o.l.m shauri moyo girls sec. school", type: "girls boarding", subcounty: "subcounty 2", treesPlanted: 135, target: 100 },
  { id: 19, name: "jamhuri high school", type: "boys day", subcounty: "subcounty 3", treesPlanted: 95, target: 100 },
  { id: 20, name: "parklands secondary school", type: "boys day", subcounty: "subcounty 4", treesPlanted: 125, target: 100 },
  { id: 21, name: "pumwani secondary school", type: "boys boarding", subcounty: "subcounty 1", treesPlanted: 140, target: 100 },
  { id: 22, name: "ngara girls' high school", type: "girls boarding", subcounty: "subcounty 2", treesPlanted: 160, target: 100 },
  { id: 23, name: "st teresa's girls secondary school", type: "girls day", subcounty: "subcounty 3", treesPlanted: 125, target: 100 },
  { id: 24, name: "ndururuno secondary school", type: "mixed day", subcounty: "subcounty 4", treesPlanted: 85, target: 100 },
  { id: 25, name: "murang'a road mixed day secondary school", type: "mixed day", subcounty: "subcounty 1", treesPlanted: 110, target: 100 },
  { id: 26, name: "pumwani girls secondary school", type: "girls day", subcounty: "subcounty 2", treesPlanted: 70, target: 100 },
  { id: 27, name: "lang'ata high school", type: "mixed day", subcounty: "subcounty 3", treesPlanted: 115, target: 100 },
  { id: 28, name: "karen 'c' secondary school", type: "mixed day", subcounty: "subcounty 4", treesPlanted: 95, target: 100 },
  { id: 29, name: "olympic high school", type: "mixed day", subcounty: "subcounty 1", treesPlanted: 120, target: 100 },
  { id: 30, name: "raila educational centre", type: "mixed day", subcounty: "subcounty 2", treesPlanted: 130, target: 100 },
].sort((a, b) => a.name.localeCompare(b.name));


function CountySchoolReports() {
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [countyName, setCountyName] = useState('Your County Name'); // Replace with your actual county name
  const [filters, setFilters] = useState({ global: '' });
  const [topSchoolsCount, setTopSchoolsCount] = useState(10); // Display top 10 schools by default


  const getTopSchoolsByTreesPlanted = (schools, count) => {
    return schools
      .filter((school) => {
        const globalFilter = filters.global;
        return (
          globalFilter === '' ||
          (school.name && school.name.toLowerCase().includes(globalFilter)) ||
          (school.subcounty && school.subcounty.toLowerCase().includes(globalFilter)) ||
          (school.treesPlanted && school.treesPlanted.toString().includes(globalFilter)) ||
          (school.target && school.target.toString().includes(globalFilter))
        );
      })
      .sort((a, b) => b.treesPlanted - a.treesPlanted) // Sort by trees planted in descending order
      .slice(0, count); 
  };

  const handleTopSchoolsChange = (newCount) => {
    setTopSchoolsCount(newCount);
  };

  // Simulated Axios request using dummySchools
  useEffect(() => {
    setSchools(dummySchools);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setFilters({ ...filters, global: searchTerm });
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '30px' }}>
      <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item>
          <h2>
            <strong>Schools in {countyName} County</strong>
          </h2>
        </Grid>
        <Grid item>
          <div>
            <TextField
              label="Search"
              variant="outlined"
              value={filters.global}
              onChange={handleSearchInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {filters.global && (
                      <IconButton onClick={() => setFilters({ ...filters, global: '' })}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>School Name</TableCell>
                <TableCell>Trees Planted</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Subcounty</TableCell> {/* Subcounty column */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

        {/* adding the filtering logic incase there a fields that are null */}
        {schools
          .filter((school) => {
            const globalFilter = filters.global;
            return (
              globalFilter === '' ||
              (school.name && school.name.toLowerCase().includes(globalFilter)) ||
              (school.subcounty && school.subcounty.toLowerCase().includes(globalFilter)) ||
              (school.treesPlanted && school.treesPlanted.toString().includes(globalFilter)) ||
              (school.target && school.target.toString().includes(globalFilter))
            );
          })
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((school, index) => (
            <TableRow key={school.id}>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>{index + 1}</TableCell>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>{school.name}</TableCell>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>{school.treesPlanted}</TableCell>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>{school.target}</TableCell>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>{school.subcounty}</TableCell>
              <TableCell style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Button
                  component={Link}
                  to={`/school/${school.id}`}
                  variant="outlined"
                  color="primary"
                >
                  View More
                </Button>
              </TableCell>
            </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={schools.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
        
    </div>
  );
}

export default CountySchoolReports;

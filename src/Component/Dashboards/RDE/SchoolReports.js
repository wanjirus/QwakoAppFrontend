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
} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const dummySchools = [
  { id: 1, name: "Aquinas High School", type: "Boys Boarding", treesPlanted: 120, target: 100 },
  { id: 2, name: "Highway Secondary School", type: "Boys Day", treesPlanted: 90 ,target: 100},
  { id: 3, name: "Huruma Girls' High School", type: "Girls Day & Boarding", treesPlanted: 150 , target: 100},
  { id: 4, name: "Our Lady of Mercy Secondary School South B", type: "Girls Day", treesPlanted: 70, target: 100 },
  { id: 5, name: "Ofafa Jericho High School", type: "Boys Boarding", treesPlanted: 110, target: 100 },
  { id: 6, name: "Nileroad Secondary", type: "Girls Day", treesPlanted: 85 , target: 100},
  { id: 7, name: "St. Teresa's Boys Secondary School", type: "Boys Day", treesPlanted: 130 , target: 100},
  { id: 8, name: "Makongeni Secondary School", type: "Mixed Day", treesPlanted: 95 ,target: 100},
  { id: 9, name: "Ruaraka High School", type: "Mixed Day", treesPlanted: 105 ,target: 100},
  { id: 10, name: "Buruburu Girls Secondary School", type: "Girls Boarding", treesPlanted: 140 ,target: 100},
  { id: 11, name: "Our Lady of Fatima Secondary School", type: "Mixed Day", treesPlanted: 80 ,target: 100},
  { id: 12, name: "Baba Dogo Secondary School", type: "Mixed Day", treesPlanted: 75 ,target: 100},
  { id: 13, name: "C.G.H.U Secondary School", type: "Mixed Day", treesPlanted: 115,target: 100 },
  { id: 14, name: "Eastleigh High School", type: "Boys Day", treesPlanted: 110,target: 100 },
  { id: 15, name: "Maina Wanjigi Secondary School", type: "Mixed Day", treesPlanted: 90 ,target: 100},
  { id: 16, name: "Uhuru Secondary School", type: "Boys Day", treesPlanted: 120 ,target: 100},
  { id: 17, name: "Kamukunji Secondary School", type: "Mixed Day", treesPlanted: 100 ,target: 100},
  { id: 18, name: "O.L.M Shauri Moyo Girls Sec. School", type: "Girls Boarding", treesPlanted: 135 ,target: 100},
  { id: 19, name: "Jamhuri High School", type: "Boys Day", treesPlanted: 95 ,target: 100 },
  { id: 20, name: "Parklands Secondary School", type: "Boys Day", treesPlanted: 125 ,target: 100},
  { id: 21, name: "Pumwani Secondary School", type: "Boys Boarding", treesPlanted: 140,target: 100 },
  { id: 22, name: "Ngara Girls' High School", type: "Girls Boarding", treesPlanted: 160 ,target: 100},
  { id: 23, name: "St Teresa's Girls Secondary School", type: "Girls Day", treesPlanted: 125 ,target: 100},
  { id: 24, name: "Ndururuno Secondary School", type: "Mixed Day", treesPlanted: 85 ,target: 100},
  { id: 25, name: "Murang'a Road Mixed Day Secondary School", type: "Mixed Day", treesPlanted: 110 ,target: 100},
  { id: 26, name: "Pumwani Girls Secondary School", type: "Girls Day", treesPlanted: 70 ,target: 100},
  { id: 27, name: "Lang'ata High School", type: "Mixed Day", treesPlanted: 115 },
  { id: 28, name: "Karen 'C' Secondary School", type: "Mixed Day", treesPlanted: 95 ,target: 100},
  { id: 29, name: "Olympic High School", type: "Mixed Day", treesPlanted: 120 ,target: 100},
  { id: 30, name: "Raila Educational Centre", type: "Mixed Day", treesPlanted: 130 },
  { id: 31, name: "Dagoretti High School", type: "Boys Boarding", treesPlanted: 105 },
  { id: 32, name: "Upper Hill School", type: "Boys Boarding", treesPlanted: 140, target: 100 },
  { id: 33, name: "Moi Gilrs' School Nairobi", type: "Girls Boarding", treesPlanted: 150 },
  { id: 34, name: "Precious Blood Riruta", type: "Girls Boarding", treesPlanted: 130 },
  { id: 35, name: "Mutuini High School", type: "Boys Day", treesPlanted: 80 },
  { id: 36, name: "Ruthimitu Secondary School", type: "Mixed Day", treesPlanted: 110 },
  { id: 37, name: "Nembu Girls High School", type: "Girls Boarding", treesPlanted: 140 },
  { id: 38, name: "Ruthimitu Girls Sec School", type: "Girls Day", treesPlanted: 90 },
  { id: 39, name: "Dagoretti Mixed Sec School", type: "Mixed Day", treesPlanted: 100 },
  { id: 40, name: "Parklands Arya Girls High School", type: "Girls Boarding", treesPlanted: 120 },
  { id: 41, name: "Statehous Girls H. Sch", type: "Girls Boarding", treesPlanted: 130 },
  { id: 42, name: "Kangemi High School", type: "Boys Boarding", treesPlanted: 110 },
  { id: 43, name: "Hospital Hill High School", type: "Mixed Boarding", treesPlanted: 95 },
  { id: 44, name: "St. George's Girls' Secondary School", type: "Girls Boarding", treesPlanted: 140 },
  { id: 45, name: "Nairobi Milimani Secondary School", type: "Boys Day", treesPlanted: 120 },
  { id: 46, name: "Lavington Mixed Secondary School", type: "Mixed Boarding", treesPlanted: 105 },
  { id: 47, name: "Highridge Mixed Secondary School", type: "Mixed Boarding", treesPlanted: 110 },
  { id: 48, name: "Kahawa Garrison Secondary School", type: "Mixed Day", treesPlanted: 95 },
  { id: 49, name: "Kamiti Secondary School", type: "Mixed Day", treesPlanted: 90 },
  { id: 50, name: "Kayole Secondary School", type: "Mixed Day", treesPlanted: 100 },
];

function SchoolReports() {
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [subcountyName, setSubcountyName] = useState('');
  const [filters, setFilters] = useState({ global: '' }); // Initialize filters with an empty global filter

  // Simulate fetching the subcounty name (replace this with your actual logic)
  const fetchSubcountyName = async () => {
    // Example: Fetch subcounty name from your API or context
    const subcountyName = 'Laikipia East'; // Replace with the actual subcounty name

    // Set the subcounty name in the component's state
    setSubcountyName(subcountyName);
  };

  useEffect(() => {
    // Fetch the subcounty name when the component mounts
    fetchSubcountyName();
    // Replace this with your actual API URL
    const apiUrl = 'https://api.example.com/schools';

    // Simulated Axios request using dummySchools
    // You should replace this with your actual API request
    setSchools(dummySchools);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    setFilters({ ...filters, global: searchTerm });
  };

  return (
    <div style={{ backgroundColor: 'white', padding:'30px' }}>
      <Grid container style={{ display: 'flex', justifyContent: 'space-between',}}>
        <Grid item>
          {/* <Typography variant="h5" gutterBottom> */}
           <h2> <strong>Schools in {subcountyName} Subcounty</strong> </h2>
          {/* </Typography> */}
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

               {/* adding the filtering logic incase there a fields that are null */}
        {schools
          .filter((school) => {
            const globalFilter = filters.global.toLowerCase();
            return (
              globalFilter === '' ||
              (school.name && school.name.toLowerCase().includes(globalFilter)) ||
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

export default SchoolReports;

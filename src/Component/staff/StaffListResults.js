import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';
import getInitials from '../../utils/getInitials';

const StaffListResults = ({ staffs, ...rest }) => {
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedStaffIds;

    if (event.target.checked) {
      newSelectedStaffIds = staffs.map((staff) => staff.id);
    } else {
      newSelectedStaffIds = [];
    }

    setSelectedStaffIds(newSelectedStaffIds);
  };

  const handleSelectOne = (event, id) => {
    console.log(staffs);
    const selectedIndex = selectedStaffIds.indexOf(id);
    let newSelectedStaffIds = [];

    if (selectedIndex === -1) {
      newSelectedStaffIds = newSelectedStaffIds.concat(selectedStaffIds, id);
    } else if (selectedIndex === 0) {
      newSelectedStaffIds = newSelectedStaffIds.concat(newSelectedStaffIds.slice(1));
    } else if (selectedIndex === selectedStaffIds.length - 1) {
      newSelectedStaffIds = newSelectedStaffIds.concat(newSelectedStaffIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStaffIds = newSelectedStaffIds.concat(
        newSelectedStaffIds.slice(0, selectedIndex),
        newSelectedStaffIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStaffIds(newSelectedStaffIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStaffIds.length === staffs.length}
                    color="primary"
                    indeterminate={
                      selectedStaffIds.length > 0
                      && selectedStaffIds.length < staffs.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>


                <TableCell>
                  avatar
                </TableCell>

                <TableCell>
                  name
                </TableCell>

                <TableCell>
                  location
                </TableCell>
                
                <TableCell>
                  contact
                </TableCell>

                <TableCell>
                  price
                </TableCell>
                
                <TableCell>
                  action
                </TableCell>




              </TableRow>

            </TableHead>

            <TableBody>
              {staffs.slice(0, limit).map((staff) => (
                <TableRow
                  hover
                  key={staff.id}
                  selected={selectedStaffIds.indexOf(staff.id) !== -1}
                >

                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStaffIds.indexOf(staff.id) !== -1}
                      onChange={(event) => handleSelectOne(event, staff.id)}
                      value="true"
                    />
                  </TableCell>


                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={staff.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(staff.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {staff.location}
                  </TableCell>

                  <TableCell>
                    {/* {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`} */}
                    {staff.contact}
                  </TableCell>

                  <TableCell>
                    {staff.price}
                  </TableCell>
                  <TableCell>
                    {staff.location}
                  </TableCell>
            


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={staffs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

StaffListResults.propTypes = {
  staffs: PropTypes.array.isRequired
};

export default StaffListResults;

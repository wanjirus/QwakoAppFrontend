import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@material-ui/core';
import AdminSidebar from './AdminSidebar';
import DashboardNavbar from '../schoolDashboard/DashboardNavbar';

const AdminDashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  })
);

const AdminDashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  })
);

const AdminDashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const AdminDashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

const AdminDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AdminDashboardLayoutRoot>
      {/* <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(!isMobileNavOpen)} /> */}
      <AdminSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <AdminDashboardLayoutWrapper>
        <AdminDashboardLayoutContainer>
          <AdminDashboardLayoutContent>
            <Outlet />
          </AdminDashboardLayoutContent>
        </AdminDashboardLayoutContainer>
      </AdminDashboardLayoutWrapper>
    </AdminDashboardLayoutRoot>
  );
};

export default AdminDashboardLayout;

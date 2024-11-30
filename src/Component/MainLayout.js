import React from 'react';
import { Outlet } from 'react-router';
import { styled } from '@mui/material/styles';
import AppNavbar from './navbar/AppNavbar';
import Footer from './homepage/Footer';
import { CallToAction } from './homepage';

const MainLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Changed from height to minHeight for full scrollable content
  width: '100%',
}));

const MainLayoutWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const MainLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflowY: 'auto', // Allows vertical scrolling
  overflowX: 'hidden', // Prevents horizontal scrolling
  padding: '20px',
});

const MainLayout = () => (
  <MainLayoutRoot>
    <AppNavbar />
    <MainLayoutWrapper>
      <MainLayoutContent>
        <Outlet />
        <CallToAction />
      </MainLayoutContent>
    </MainLayoutWrapper>
    <Footer /> Footer is outside the MainLayoutContent for better visibility
  </MainLayoutRoot>
);

export default MainLayout;

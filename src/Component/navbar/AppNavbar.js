import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, SvgIcon, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// Animation for logo text
const curvyAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Detailed House Icon with Circular Border
function HouseIcon() {
  return (
    <SvgIcon
      sx={{
        fontSize: 50,
        color: '#8E7BAF',
      }}
    >
      {/* Circular Border */}
      <circle cx="12" cy="12" r="11" fill="none" stroke="#ffffff" strokeWidth="1" />
      {/* House Base */}
      <rect x="7" y="12" width="10" height="8" fill="#8E7BAF" stroke="#8E7BAF" strokeWidth="0.5" />
      {/* Roof */}
      <path d="M4 12L12 4l8 8" fill="none" stroke="#8E7BAF" strokeWidth="1.5" />
      {/* Door */}
      <rect x="11" y="14" width="2" height="6" fill="#FFFFFF" />
      {/* Windows */}
      <rect x="8.5" y="13.5" width="2" height="2" fill="#FFFFFF" />
      <rect x="13.5" y="13.5" width="2" height="2" fill="#FFFFFF" />
      {/* Chimney */}
      <rect x="14.5" y="7" width="1.5" height="3" fill="#8E7BAF" />
    </SvgIcon>
  );
}

function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Properties', path: '/properties' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        
        backgroundColor: 'rgba(12, 153, 5, 0.5)', // Purpleish-blue color with transparency for the blur effect
       backdropFilter: 'blur(10px)', // Blur effect
        paddingLeft: '20px',
        paddingRight: '20px',
        height:'62px',
        boxShadow: 'none',
      }}
      
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleNavClick('/')}
        >
          <IconButton color="inherit" sx={{ p: 0, marginRight: 1 }}>
            <HouseIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              background: 'linear-gradient(270deg, #8E7BAF, #3D85C6)', // Purple and blue gradient
              backgroundClip: 'text',
              textFillColor: 'transparent',
              animation: `${curvyAnimation} 2s ease-in-out infinite`,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            Stan Properties
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          component="nav"
          sx={{
            display: 'flex',
            gap: '25px',
            marginLeft: '25px', // Adjust space from logo
            flexGrow: 1,
          }}
        >
          {navLinks.map((link) => (
            <Typography
              key={link.label}
              onClick={() => handleNavClick(link.path)}
              sx={{
                cursor: 'pointer',
                color: 'white',
                // location.pathname === link.path ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                '&:hover': { color: theme.palette.secondary.main },
                fontWeight: 'bold',
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
          onClick={() => handleNavClick('/login')}
        >
          LOGIN
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;

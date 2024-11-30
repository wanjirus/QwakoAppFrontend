import React, { useState } from 'react';
import './MainNavbar.css';
import { AppBar, Toolbar, Menu, MenuItem, Card, CardContent } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/log.png';
import { useTheme } from '@material-ui/core/styles';

const MainNavbar = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNavCard, setShowNavCard] = useState(false);
  const navigate = useNavigate();

  const handleInstitutionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInstitutionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavCardOpen = () => {
    setShowNavCard(true);
  };

  const handleNavCardClose = () => {
    setShowNavCard(false);
  };

  const handleNavItemClick = (path) => {
    // Close the navigation card
    handleNavCardClose();

    // Redirect to the clicked link
    navigate(path);
  };

  return (
    <AppBar elevation={0} {...props}>
      <Toolbar className="gpt3__navbar" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <RouterLink to="/">
          <div className='gpt3__navbar-links_logo'>
            <img src={logo} alt='logo' />
          </div>
        </RouterLink>

        {/* Hamburger icon for small screens */}
        <div className={`hamburger-icon ${showNavCard ? 'hidden' : ''}`} onClick={handleNavCardOpen}>
          &#9776;
        </div>

        {/* Navigation card for small screens */}
        {showNavCard && (
          <Card className="nav-card">
            <CardContent>
              <div className="nav-card-links">
                <RouterLink to='/' className={`gpt3__navbar-links ${location.pathname === '/' ? 'active' : ''}`}>
                  <p onClick={() => handleNavItemClick('/')} > Home</p>
                </RouterLink>

                <RouterLink to='/about' className={`gpt3__navbar-links ${location.pathname === '/about' ? 'active' : ''}`}>
                  <p onClick={() => handleNavItemClick('/about')}>About</p>
                </RouterLink>

                <div>
                  <p
                    onClick={handleInstitutionMenuClick}
                    aria-controls="institution-menu"
                    aria-haspopup="true"
                    className={`gpt3__navbar-links ${location.pathname === '/institution' ? 'active' : ''}`}
                  >
                    Institutions
                  </p>
                  <Menu
                    id="institution-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleInstitutionMenuClose}
                  >
                  </Menu>
                </div>

                <RouterLink to='/announcement' className={`gpt3__navbar-links ${location.pathname === '/announcement' ? 'active' : ''}`}>
                  <p onClick={() => handleNavItemClick('/announcement')}>Announcements</p>
                </RouterLink>
              </div>
              <div className="nav-card-close" onClick={handleNavCardClose}>
                &#10005;
              </div>
            </CardContent>
          </Card>
        )}

        {/* Normal navigation links for large screens */}
        <div className={`gpt3__navbar-links_container ${showNavCard ? 'hidden' : ''}`}
         style={{ '--text-primary': theme.palette.text.primary }}
        >
          <RouterLink to='/' className={`gpt3__navbar-links ${location.pathname === '/' ? 'active' : ''}`}>
            <p> Home</p>
          </RouterLink>

          <RouterLink to='/about' className={`gpt3__navbar-links ${location.pathname === '/about' ? 'active' : ''}`}>
            <p>About</p>
          </RouterLink>

          <div>
            <p
              onClick={handleInstitutionMenuClick}
              aria-controls="institution-menu"
              aria-haspopup="true"
              className={`gpt3__navbar-links ${location.pathname === '/institution' ? 'active' : ''}`}
            >
              Institutions
            </p>
            <Menu
              id="institution-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleInstitutionMenuClose}
            >
              <MenuItem onClick={() => handleNavItemClick('/ecde')}>ECDE</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/primaryschool')}>PRIMARY SCHOOL</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/juniourschool')}>JUNIOUR SCHOOL</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/secondaryschool')}>SECONDARY SCHOOL</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/tvetcolleges')}>TVET & COLLEGES</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/university')}>UNIVERSITIES</MenuItem>
              <MenuItem onClick={() => handleNavItemClick('/sagas')}>SAGAs</MenuItem>
            
            </Menu>

          </div>

          

          <RouterLink to='/announcement' className={`gpt3__navbar-links ${location.pathname === '/announcement' ? 'active' : ''}`}>
            <p>Announcements</p>
          </RouterLink>

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
 
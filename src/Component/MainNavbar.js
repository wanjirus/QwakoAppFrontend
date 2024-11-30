import React, { useState } from 'react';
import './MainNavbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Button, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
// import { Search } from '@mui/icons-material';
import logo from '../assets/log.png';


const MainNavbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignUpForm = () => navigate('/register');
  const handleLoginForm = () => navigate('/login');

  const handleInstitutionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleInstitutionMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={0} {...props}>
      <Toolbar className="gpt3__navbar" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <RouterLink to="/">
          <div className='gpt3__navbar-links_logo'>
            <img src={logo} alt='logo' />
          </div>
        </RouterLink>

        {/* Add a responsive menu button */}
        <div className={`gpt3__navbar-menu ${toggleMenu ? 'active' : ''}`}>
          {toggleMenu
            ? <RiCloseLine color='white' size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color='white' size={27} onClick={() => setToggleMenu(true)} />
          }

{toggleMenu && (
  <div className={`gpt3__navbar-menu_container open`}>
    <div className='gpt3__navbar-menu_container-links' style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', paddingLeft: '20px' }}>
    <div className='gpt3__navbar-menu_container-close-button' onClick={() => setToggleMenu(false)} style={{ fontSize: '36px', color: 'black', cursor: 'pointer', marginTop: '20px' }}>
      <span>&times;</span>
    </div>
      <div className='gpt3__navbar-menu_container-links-item'>
        <RouterLink to='/' onClick={() => setToggleMenu(false)} style={{ fontSize: '24px', color: 'black', textDecoration: 'none' }}>
          Home
        </RouterLink>
      </div>
      <div className='gpt3__navbar-menu_container-links-item'>
        <RouterLink to='/institution' onClick={() => setToggleMenu(false)} style={{ fontSize: '24px', color: 'black', textDecoration: 'none' }}>
          Institution
        </RouterLink>
      </div>
      <div className='gpt3__navbar-menu_container-links-item'>
        <RouterLink to='/about' onClick={() => setToggleMenu(false)} style={{ fontSize: '24px', color: 'black', textDecoration: 'none' }}>
          About
        </RouterLink>
      </div>
    </div>
    
  </div>
)}

        </div>

        <div className='gpt3__navbar-links_container' style={{ marginLeft: 'auto' }}>
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
              <MenuItem onClick={handleInstitutionMenuClose}>ECDE</MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>PRIMARY SCHOOL</MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>JUNIOR SCHOOL</MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>SECONDARY SCHOOL</MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>POLYTECHINC </MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>TVETs & COLLEGES</MenuItem>
              <MenuItem onClick={handleInstitutionMenuClose}>UNIVERSITY</MenuItem>
            </Menu>
          </div>

          <RouterLink to='/announcement' className={`gpt3__navbar-links ${location.pathname === './news/announcements.js' ? 'active' : ''}`}>
            <p>Announcements</p>
          </RouterLink>
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;

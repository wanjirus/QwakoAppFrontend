import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { getCurrentUser } from "../../REST-API/auth/AuthProvider";
import Log from "../../assets/log.png";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();
  const [notifications] = useState([]);
  const [username, setUsername] = useState(undefined);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    // Clear everything in localStorage
    localStorage.clear();
    navigate("/home", { replace: true });
  };

  return (
    <AppBar
      elevation={0}
      {...rest}
      sx={{
        backgroundColor: "#ffffff99", // Background color with transparency
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <RouterLink to="/">
          <div className="gpt3__navbar-links_logo">
            <img src={Log} alt="logo" />
          </div>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />

        <Hidden lgDown>
          {/* <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} color="inherit">
              <InputIcon />
            </IconButton>
          </Tooltip>

          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={handleClose}>
              {' '}
              <RouterLink to="/app/account">
                My Profile
              </RouterLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>Account</MenuItem> 
          </Menu>

          <Typography>
            Hi,
            {' '}
            {username}
          </Typography> */}
        </Hidden>
        {/* <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden> */}
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  // Calendar as CalendarIcon,
  // BarChart as BarChartIcon,
  // Briefcase as BriefcaseIcon,
  Settings as SettingsIcon,
  // Trello as TrelloIcon,
  User as UserIcon,
  // UserCheck as UserCheckIcon,
  // Users as UsersIcon,
  // UserPlus as UserPlusIcon,
  LogOut as LogoutIcon,
} from "react-feather";
import getInitials from "../REST-API/utils/getInitials";
import { getCurrentUser } from "../REST-API/auth/AuthProvider";
import NavItem from "./NavItem";

const items = [
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Dashboard",
  },
  {
    href: "/app/properties",
    icon: UserIcon,
    title: "Properties",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
  {
    href: "",
    icon: LogoutIcon,
    title: "Logout",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [username, setUsername] = useState(undefined);
  const [roles, setRoles] = useState("");

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  useEffect(() => {
    // Assign current user to a variable user.
    const user = getCurrentUser();

    // Once logged in.
    if (user && user.accessToken) {
      // Set the username of the current logged in user from the jwt-token response.
      setUsername(user.username);

      // Set the roles of the current logged in user from the jwt-token response.
      setRoles(user.authorities);
      // user.authorities.array.forEach((authority) => {
      //   // Add a comma between each role if a user has more then one role.
      //   setRoles(`${roles} , ${authority.authority}`);
      // });
    }
  }, []);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          // src={}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="#"
        >
          {getInitials(username)}
        </Avatar>
        <Typography color="textPrimary" variant="h5">
          {username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {roles}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: "background.default",
          m: 2,
          p: 2,
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          Need more?
        </Typography>
        <Typography align="center" variant="body2">
          Upgrade to PREMIUM version and access more features.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            PREMIUM
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;

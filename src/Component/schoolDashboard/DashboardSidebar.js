import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/logo.png";

import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
	Menu,
	MenuItem,
	MenuList,
	Grid,
} from "@material-ui/core";
import {
	Dashboard as DashboardIcon,
	Logout as LogoutIcon,
	Public as PublicIcon,
	LegendToggle as LegendToggleIcon,
	EventAvailable as EventAvailableIcon,
	ExpandLess,
	ExpandMore,
} from "@material-ui/icons";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import getInitials from "../../REST-API/utils/getInitials";
import { getCurrentUser, signOut } from "../../REST-API/auth/AuthProvider";
import NavItem from "../navbar/NavItem";
import DashboardNavbar from "./DashboardNavbar";
import { Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const items = [
	{
		href: "",
		icon: DashboardIcon,
		title: "Dashboard",
	},
	{
		title: "Seedlings",
		icon: PublicIcon,
		items: [
			{
				href: "/app/seedlingsTarget",
				title: "Seedlings Targeted",
			},
			{
				href: "/app/seedlingsPropagation",
				title: "Seedlings Propagated",
			},
			{
				href: "/app/readyToPlant",
				title: "Seedlings -Ready to Plant",
			},
		],
	},
	{
		href: "/app/targettrees",
		icon: EventAvailableIcon,
		title: "Trees Targeted",
	},
	{
		href: "/app/treeplanting",
		icon: PublicIcon,
		title: "Trees Planted",
	},
	{
		href: "/app/statusmonitoring",
		icon: LegendToggleIcon,
		title: "Growth Reporting",
	},
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose();
		}
	}, [location.pathname, onMobileClose, openMobile]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const currentUser = await getCurrentUser();

				if (currentUser) {
					setUser(currentUser);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/home", { replace: true });
	};

	const handleToggleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleNavItemClick = (path) => {
		handleMenuClose(); // Close the menu
		navigate(path);
	};

	const NestedNavItem = ({ title, icon: Icon, items }) => {
		const [open, setOpen] = useState(false);

		const handleClick = () => {
			setOpen(!open);
		};

		return (
			<>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<Icon />
					</ListItemIcon>
					<ListItemText primary={title} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{items.map((item) => (
							<ListItem
								key={item.title}
								button
								onClick={() => handleNavItemClick(item.href)}
								sx={{ pl: 4 }}
							>
								<ListItemText primary={item.title} />
							</ListItem>
						))}
					</List>
				</Collapse>
			</>
		);
	};

	const content = (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				backgroundColor: "#6B8E23",
				color: "#fff",
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
					src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
					alt="Avatar"
					component={RouterLink}
					to=""
					sx={{
						cursor: "pointer",
						width: 64,
						height: 64,
					}}
				>
					{getInitials(user?.username || "")}
				</Avatar>
				<Typography color="white" variant="h4">
					{user?.username}
				</Typography>
				<Typography color="white" variant="body2">
					{user?.surname || "School Manager"}
				</Typography>
			</Box>
			<Divider />
			<Box sx={{ p: 2 }}>
				<List>
					{items.map((item) =>
						item.items ? (
							<NestedNavItem
								key={item.title}
								title={item.title}
								icon={item.icon}
								items={item.items}
							/>
						) : (
							<ListItem
								button
								key={item.title}
								onClick={() => handleNavItemClick(item.href)}
							>
								<ListItemIcon>
									<item.icon />
								</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItem>
						)
					)}
				</List>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Button
				color="primary"
				fullWidth
				onClick={handleLogout}
				startIcon={<LogoutIcon />}
			>
				Logout
			</Button>
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
				<DashboardNavbar />
				<Drawer
					anchor="left"
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: 257,
							top: 64,
							height: "calc(100% - 64px)",
						},
					}}
				>
					{content}
				</Drawer>
			</Hidden>

			<Hidden lgUp>
				<Box
					sx={{
						position: "fixed",
						top: 0,
						padding: 2,
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Grid container>
						<Grid item sx={{ marginRight: "auto" }}>
							<img src={logo} alt="Logo" style={{ maxWidth: 100 }} />
						</Grid>
						<Grid item sx={{ right: 0 }}>
							<Button onClick={handleToggleMenu}>
								<MenuIcon sx={{ color: "black" }} />
							</Button>
						</Grid>
					</Grid>
					<Menu
						id="Trees-planted"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuList style={{ backgroundColor: "white" }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									mt: 2,
									right: 0,
								}}
							>
								<Button onClick={handleMenuClose} color="primary">
									{" "}
									<CloseIcon />
								</Button>
							</Box>
							{items.map((item) => (
								<MenuItem
									key={item.title}
									onClick={() => handleNavItemClick(item.href)}
								>
									{item.title}
								</MenuItem>
							))}
							<Box sx={{ flexGrow: 1 }}>
								<Button
									color="primary"
									fullWidth
									onClick={handleLogout}
									startIcon={<LogoutIcon />}
								>
									Logout
								</Button>
							</Box>
						</MenuList>
					</Menu>
				</Box>
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

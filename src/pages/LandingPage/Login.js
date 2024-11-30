import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik"; // Make sure 'Formik' is imported
import {
	Box,
	useMediaQuery,
	Avatar,
	Button,
	Container,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import axios from "axios";
import Alert from "@material-ui/core/Alert";
import AlertTitle from "@material-ui/core/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
//import image1 from "../../assets/treeStudent.jpeg";
import { getCurrentUser } from "../../REST-API/auth/AuthProvider";
import { CallToAction } from "@material-ui/icons";
import { useEffect } from "react";

function Login() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [message, setmessage] = useState("");
	const [successful, setsuccessful] = useState(false);
	const [Homebaseurl, setHomebaseurl] = useState("");

	useEffect(() => {
		const isOnLAN =
			//window.location.hostname.includes("localhost") ||
			window.location.hostname.includes("10.104.100");
		const newHomebaseUrl = isOnLAN
			? "http://10.104.100.29"
			: "http://localhost:8005/api/v1";

		setHomebaseurl(newHomebaseUrl);
	}, []);

	const crdpassword = "9876$Teta";
	const crdusername = "nemisadmin";
	const credentials = `${crdusername}:${crdpassword}`;
	const base64Credentials = btoa(credentials);
	const headers = {
		Authorization: `Basic ${base64Credentials}`,
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Methods": "GET, POST",
		"Access-Control-Allow-Headers": "X-Token",
		"Access-Control-Allow-Credentials": "true",
	};

	// const headers2 = {
	//   "Access-Control-Allow-Origin": "*",
	//   "Access-Control-Allow-Credentials": true,
	// };

	const handleSuccessAlertOpen = () => {
		setsuccessful(true);
	};
	const handleSuccessAlertClose = async () => {
		setsuccessful(true);
		const user = getCurrentUser();
		const username = user[0].user_name;
		const userCategory = user[0].user_category;
		console.log('mycategory is ' +  userCategory);
		if (parseInt(userCategory, 10) === 1) {
			// fetchAnyNecessaryUserDetails;
			navigate("/about");
			return;
		}
		else{

		try {
			// Make a GET request to fetch the user's role
			const baseurl = `${Homebaseurl}/users/role/${username}`;
			const myroleresponse = await axios.get(`${baseurl}`, {
				headers: {
					'Content-Type': 'application/json' // Ensure that the server knows you're sending JSON
				},
			});

			console.log(myroleresponse.data[0] + 'myresponse');

			const role = myroleresponse.data[0].role_name;
			// const categoryDesc = myroleresponse.data[0].category;
			console.log('category description' + role); 
			// console.log('category description' + roleDescription);
			if (role === "ROLE_ADMIN") {
				navigate("/admin");
			} else if (role === "Sub-County") {
				navigate("/SCDE");
			} else if (role === "County") {
				navigate("/CDE");
			} else if (role === "Regional") {
				navigate("/RDE");
			} else {
				navigate("/Generic");
			}
		} catch (error) {
			console.error("Error while checking user data:", error);
		}
	}
	};

	const findUserRegions = async (musername) => {
		const username = musername;
		try {
			// Make a GET request to fetch the user's county information
			const regionResponse = await axios.get(
				`${Homebaseurl}/generic2/api/Cascade/MyRegions/${username}`,
				{
					headers,
				}
			);

			const regionData = regionResponse.data;
			//console.log(regionData);

			const mydata = {
				username: musername,
				roleid: regionData.roleCode,
				roledesc: regionData.roleDescription,
				category: regionData.category,
				categorydesc: regionData.categoryDesc,
				area_code: regionData.regionCode,
			};

			//Save User Region Mapping
			handleSaveUserRole(mydata);
		} catch (error) {
			console.error("Error while checking user roles:", error);
		}
	};

	const fetchSchoolLocation = async (uic) => {
		try {
			const baseurl = `${Homebaseurl}/generic2/api/institution/Admin/${uic}`;
			const schoolResponse = await axios.get(`${baseurl}`, {
				headers,
			});
			const schoolData = schoolResponse.data[0];
			const data = {
				uic: schoolData.institution_Code,
				institution_name: schoolData.institution_Name,
				region_code: schoolData.region_Code,
				region_name: schoolData.region_Name,
				county_code: schoolData.county_Code,
				county_name: schoolData.county_Name,
				sub_county_code: schoolData.sub_County_Code,
				sub_county_name: schoolData.sub_County_Name,
				constituency_code: schoolData.constituency_Code,
				constituency_name: schoolData.constituency_Name,
				ward_code: schoolData.ward_Code,
				ward_name: schoolData.ward_Name,
				level_code: schoolData.institution_Level_Code,
				level_name: schoolData.level_Name,
				type: schoolData.institution_Type,
			};

			handleSaveSchoolLocation(data);
		} catch (error) {
			console.error("Error while fetching school location:", error);
		}
	};

	const handleSaveSchoolLocation = (mdata) => {
		// Make a POST request to save data
		let urlhom = window.location.origin;
		let url = urlhom + "/treeapi/api/v1/School/AddLocation";
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.post(url, JSON.stringify(mdata), { headers })
			.then((response) => {})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};

	const handleSaveProfile = (data) => {
		// Make a POST request to save data
		let urlhom = window.location.origin;
		let url = urlhom + "/treeapi/api/v1/Profile/AddProfile";
		//console.log("Our Profile", data, url);
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.post(url, data, { headers })
			.then((response) => {
				//console.log(response)
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};

	const handleSaveUserRole = (musername, regionData) => {
		// Make a POST request to save data
		const mydata = {
			username: musername,
			roleid: regionData.roleCode,
			roledesc: regionData.roleDescription,
			category: regionData.category,
			categorydesc: regionData.categoryDesc,
			area_code: regionData.regionCode,
		};

		let urlhom = window.location.origin;
		let url = urlhom + "/treeapi/api/v1/Profile/AddRole";
		//console.log("Our Role", mydata, url);
		const headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Access-Control-Allow-Methods": "GET, POST",
			"Access-Control-Allow-Headers": "X-Token",
			"Access-Control-Allow-Credentials": "true",
		};
		axios
			.post(url, mydata, { headers })
			.then((response) => {
				//console.log(response)
			})
			.catch((error) => {
				console.error("Error saving data:", error);
			});
	};
	// Opens Error Alert Message when login fails.
	const handleErrorAlertOpen = () => {
		setOpen(true);
	};

	// Handles Closing of Error Alert Message.
	const handleErrorAlertClose = () => {
		setOpen(false);
		window.location.reload();
	};

	const signin = async (validationSchema) => { 
		const uname = validationSchema.username;
		const password = validationSchema.password;
	
		try {
			const baseurl = `${Homebaseurl}/users/signin`;
			const response = await axios.post(baseurl, {
				uname,
				password
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// Handle the successful response here
			if (response) {
				const userData = response.data;
				localStorage.setItem("user", JSON.stringify(userData));
				let mydata = { 
					id: userData.id,
					dept_code: userData.dept_code,
					username: userData.user_name,          // Maps 'user_name' from JSON
					first_name: userData.first_name,       // Maps 'first_name' from JSON
					last_name: userData.last_name,         // Maps 'last_name' from JSON
					full_names: userData.full_names,       // Maps 'full_names' from JSON
					gender: userData.gender,               // Maps 'gender' from JSON
					phone_number: userData.phone_number,   // Maps 'phone_number' from JSON
					email: userData.email,                 // Maps 'email' from JSON
					user_group: userData.user_group,       // Maps 'user_group' from JSON
					status: userData.status,               // Maps 'status' from JSON
					job_type: userData.user_description,   // Maps 'user_description' from JSON
					responsibilities: userData.responsibilities, // Maps 'responsibilities' from JSON
					created_by: userData.created_by,       // Maps 'created_by' from JSON
					created_on: userData.created_on,       // Maps 'created_on' from JSON
					user_category: userData.user_category, // Maps 'user_category' from JSON
					locked: userData.lock === "False" ? false : true, // Converts 'lock' from string to boolean
					lock2: userData.lock2 === "False" ? false : true, // Converts 'lock2' from string to boolean
					view_reports: userData.view_reports === "0" ? false : true, // Converts 'view_reports' to boolean
					view_reports2: userData.view_reports2 === "False" ? false : true, // Converts 'view_reports2' to boolean
					right_level: userData.right_level,     // Maps 'right_level' from JSON
					right_levels2: userData.right_levels2 === "False" ? false : true, // Converts 'right_levels2' to boolean
					right_levels3: userData.right_levels3 === "False" ? false : true, // Converts 'right_levels3' to boolean
					reports_level: userData.reports_level, // Maps 'reports_level' from JSON
					reports_levels2: userData.reports_levels2 === "True" ? true : false // Converts 'reports_levels2' to boolean
				  };

				handleSaveProfile(mydata);
				axios
					.get(`treeapi/api/v1/TreePlanting/plantedtreestatus/${uname}`)
					.then((response) => {
						var tabledata = response.data;
						sessionStorage.setItem(
							"currenttargetindigenoustrees",
							tabledata.targetindigenoustrees
						);
						sessionStorage.setItem(
							"currenttargetexotictrees",
							tabledata.targetexotictrees
						);
						sessionStorage.setItem(
							"currenttargetfruittrees",
							tabledata.targetfruittrees
						);
						sessionStorage.setItem(
							"currentliveindigenoustrees",
							tabledata.currentliveindigenoustrees
						);
						sessionStorage.setItem(
							"currentliveexotictrees",
							tabledata.currentliveexotictrees
						);
						sessionStorage.setItem(
							"currentlivefruittrees",
							tabledata.currentlivefruittrees
						);
					})
					.catch((error) => {
						console.error("Error fetching total trees data:", error);
					});

				setmessage("Kindly close this alert to access your dashboard.");
			}
		} catch (err) {
			console.error(err.toString());
			throw err;
		}
	};

	const handleRegisterClick = () =>{
		navigate('/register');

	}

	const isMobile = useMediaQuery("(max-width: 700px)");
	const isTablet = useMediaQuery("(max-width: 1024px)");
	const isLargeScreen = useMediaQuery("(min-width: 1200px)");
	const navbarHeight = "100px";

	const loginContainerStyles = {
		margin: 0,
		padding: 0,
		background: `url()`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100vh ",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		top: "0",
		width: "auto",
		paddingTop: isMobile ? navbarHeight : "65px",
		paddingBottom: isMobile ? CallToAction : "65px",
	};

	const loginCardStyles = {
		borderRadius: "12px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		background: "rgba(255, 255, 255, 0.8)",
		width: "100%",
		maxWidth: isMobile ? "100%" : "800px",
		marginLeft: "auto",
		marginRight: "auto",
		color: "#000",
		flexDirection: "column",
		padding: "20px",
		textAlign: "center",
		float: isMobile ? "left" : "right",
	};

	if (isTablet) {
		loginCardStyles.width = "80%";
		loginCardStyles.marginLeft = "10px";
	}
	if (isMobile) {
		loginCardStyles.width = "100%";
		loginCardStyles.marginLeft = "10px";
		loginCardStyles.height = "100%";
	}
	if (isLargeScreen) {
		loginCardStyles.width = "60%";
		loginCardStyles.marginLeft = "20px";
		loginCardStyles.padding = "20px";
	}

	const avatarStyles = {
		width: "5rem",
		height: "5rem",
		backgroundColor: "#808080",
		borderRadius: "50%",
		margin: "0 auto 1.2rem",
		color: "#fff",
	};

	if (isMobile) {
		avatarStyles.width = "2.3rem";
		avatarStyles.margin = "0 auto 0.1rem";
		avatarStyles.height = "2.3rem";
	}

	const formStyles = {
		textAlign: "left",
		width: "100%",
		height: "100%",
	};

	if (isMobile) {
		formStyles.marginBottom = "2px";
	}

	const headerStyles = {
		fontSize: isMobile ? "20px" : "30px",
		marginTop: isMobile ? "2rem" : "0",
	};

  return (
    <div className="login-container" style={loginContainerStyles}>
      <Container sx={{ maxWidth: "100%" }} maxWidth={false}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Paper style={loginCardStyles}>
              <Avatar src="" alt="Avatar" style={avatarStyles} />
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string().max(255).required("Username is required"),
                  password: Yup.string().max(255).required("Password is required"),
                })}
                onSubmit={(validationSchema) => {
                  signin(validationSchema)
                    .then(() => {
                      handleSuccessAlertOpen();
                    })
                    .catch((error) => {
                      handleErrorAlertOpen();
                      setErrorMessage(
                        "Please Check username/password and try again"
                      );
                    });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography color="textSecondary" variant="h2">
                      Login
                    </Typography>
                  </Box>
                  {/* Message Upon unsuccessful login */}
                  <Collapse in={open}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleErrorAlertClose();
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      <AlertTitle>Error</AlertTitle>
                      Login unsuccessful ! <strong>{errorMessage}</strong>
                    </Alert>
                  </Collapse>

                  {/* Message Upon successful registration  */}
                  <Collapse in={successful}>
                    <Alert
                      severity="success"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleSuccessAlertClose();
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      <AlertTitle>Success</AlertTitle>
                      Logged in successfully ! <strong>{message}</strong>
                    </Alert>
                  </Collapse>
                  <Grid container spacing={3}></Grid>

                  <TextField
                    error={Boolean(touched.username && errors.username)}
                    fullWidth
                    helperText={touched.username && errors.username}
                    label="Username: Nemis Username"
                    margin="normal"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.username}
                    variant="outlined"
					InputProps={{
						style: { color: 'black' }, // Change text color to blue
					  }}
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password: Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
					InputProps={{
						style: { color: 'black' }, // Change text color to blue
					  }}
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Login
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                    alignItems="center"
                  >
                    Don&apos;t have an account?{" "}
                    <Link
      component="button"
      onClick={handleRegisterClick}
      variant="h6"
      color="textSecondary"
      style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
     <strong> Sign up </strong> 
    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );  
}

export default Login;

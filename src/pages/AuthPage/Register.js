import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from '../../REST-API/api';
// import { GlobalProvider } from '../../desc/GlobalContext';
import { GlobalContext  } from '../../desc/GlobalContext';
// import { GlobalProvider } from '../../desc/gender/GlobalProvider';

const Register = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('');
  const [successful, setsuccessful] = useState(false);
  const [selectedcountry_code, setSelectedcountry_code] = useState('');
  const { genderList,countryList, regionList, loading, error,fetchRegions} = useContext(GlobalContext);

  const maxLength = 300; // Maximum character limit
  const warningLimit = 0.769* maxLength; // 2

  useEffect(() => {
    if (selectedcountry_code) {
      fetchRegions(selectedcountry_code); // Fetch regions based on selected country
    }
  }, [selectedcountry_code]);

  const handleCountryChange = (event, formikHandleChange) => {
    const selectedcountry_code = event.target.value;
    setSelectedcountry_code(selectedcountry_code); // Update local state
    formikHandleChange(event); // Call Formik's handleChange to update Formik state
  };

  const handleRegionChange = (event, setFieldValue) => {
    const selectedRegionCode = event.target.value;
    const selectedRegion = regionList.find(region => region.region_code === selectedRegionCode);
    if (selectedRegion) {
      setFieldValue('region_code', selectedRegion.region_code);
      setFieldValue('region_name', selectedRegion.region_name);
    }
  };

  const handleSuccessAlertOpen = () => {
    setsuccessful(true);
  };

  const handleSuccessAlertClose = () => {
    setsuccessful(false);
    console.log(message);
    // On successful registration, you are navigated to login.
    navigate('/login', { replace: true });
  };

  // Opens Error Alert Message when login fails.
  const handleErrorAlertOpen = () => {
    setOpen(true);
  };

  // Handles Closing of Error Alert Message.2
  const handleErrorAlertClose = () => {
    setOpen(false);
    window.location.reload();
  };
 

  return (
     <>
       <Helmet>
         <title>Register | User Registration</title>
        </Helmet>
        <Box
         sx={{
           backgroundColor: 'background.default',
           display: 'flex',
           flexDirection: 'column',
           height: 'auto',
           justifyContent: 'right',
           marginTop:'100px',
          }}
        >
           <Container maxWidth="sm">

              <Formik
            initialValues={{
              email: '',
              phone_number: '',
              firstname: '',
              lastname: '',
              gender:'',
              username: '',
              password: '',
              confirmPassword: '',
              region_code:'',
              region_name: '',
              country_code:'',
              jobdesc:'',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                username: Yup.string().required('Username is required'),
                phone_number: Yup.string().required('Phone number is required'),
                gender: Yup.string().required('gender is required'),
                country_code: Yup.string().required('country is required'),
                region_code: Yup.string().required('region is required'),
                firstname: Yup.string().min(2, 'Name must be more than 2 characters.').max(255).required('First name is required'),
                jobdesc: Yup.string().min(2, 'Describe what you do for a living.').max(255).required('Job Description is required'),
                lastname: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
                password: Yup.string().min(5, 'Password should be more than 5 characters.').max(255).required('password is required'),
                confirmPassword: Yup.string().min(5, 'Password should be more than 5 characters.').max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked'),

              })
            }
            onSubmit={async (values) => {
              console.log('validationSchema ' + JSON.stringify(values, null, 2));
              // Register Method
              await api.post('http://localhost:8005/api/v1/users/register', values)
                .then((response) => {
                  handleSuccessAlertOpen();
                  setmessage(response.data);
                  console.log(`Successfull! : ${response.data}`);
                }
              ).catch((error) => {
                  handleErrorAlertOpen();
                  setmessage(error.toString());
                  console.error(`Failed! : ${error.toString()}`);
                }
                );
            }
          }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textSecondary"
                    variant="h3"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textCustom"
                    gutterBottom
                    variant="body3"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                {/* Message Upon unsuccessful  */}
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    action={(
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
                    )}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>Failed</AlertTitle>
                    Registration unsuccessfull !
                    {' '}
                    {/* <strong>{message}</strong> */}
                  </Alert>
                </Collapse>

                {/* Message Upon successful registration  */}
                <Collapse in={successful}>
                  <Alert
                    severity="success"
                    action={(
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
                    )}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>Success</AlertTitle>
                    Registration successfull !
                    {' '}
                    {/* <strong>{message}</strong> */}
                  </Alert>
                </Collapse>
                


               

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.firstname && errors.firstname)}
                      fullWidth
                      helperText={touched.firstname && errors.firstname}
                      label="First name"
                      color='secondary'
                      margin="normal"
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.lastname && errors.lastname)}
                      fullWidth
                      helperText={touched.lastname && errors.lastname}
                      label="Last name"
                      margin="normal"
                      color='secondary'
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={6}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      color='secondary'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm ={6}>
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Username"
                      margin="normal"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      color='secondary'
                      value={values.username}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                        color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      fullWidth
                      helperText={touched.phone_number && errors.phone_number}
                      label="Phone number"
                      margin="normal"
                      color='secondary'
                      name="phone_number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="phone_number"
                      value={values.phone_number}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                      />
                  </Grid>


 <Grid item xs={12} sm={6}>
  <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(touched.gender && errors.gender)}>
    <InputLabel color='secondary'>Gender</InputLabel>
    <Select
      label="Gender"
      name="gender"
      value={values.gender}
      onChange={handleChange}
      onBlur={handleBlur}
      color='secondary'
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: 'primary.main',  // Set background color to secondary
            '& .MuiMenuItem-root': {
              color: 'white',  // Set text color for menu items
            },
          },
        },
      }}
      sx={{
        '& .MuiInputBase-input': {
          color: 'black'  // Set input text color to black
        }
      }}
    >
        <MenuItem value="">
          <em>Select Gender</em>
        </MenuItem>
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : error ? (
          <MenuItem disabled>Error loading data</MenuItem>
        ) : genderList && genderList.length > 0 ? (
          genderList.map((genderOption) => (
            <MenuItem key={genderOption.gender_code} value={genderOption.gender_code}>
              {genderOption.gender_name.trim()}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No gender data available</MenuItem>
        )}
      </Select>
    {touched.gender && errors.gender && (
      <FormHelperText>{errors.gender}</FormHelperText>
    )}
   </FormControl>
  </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(touched.country_code && errors.country_code)}>
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  name="country_code"
                  value={values.country_code}
                  onChange={(event) => handleCountryChange(event, handleChange)}
                  onBlur={handleBlur}
                  color='secondary'
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: 'primary.main',  // Set background color to secondary
                        '& .MuiMenuItem-root': {
                          color: 'white',  // Set text color for menu items
                        },
                      },
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black'  // Set input text color to black
                    }
                  }}
                >

                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>
                  {loading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : error ? (
                    <MenuItem disabled>Error loading countries</MenuItem>
                  ) : (
                    countryList.map((country) => (
                      <MenuItem key={country.country_code} value={country.country_code}>
                        {country.country_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {touched.country_code && errors.country_code && <FormHelperText>{errors.country_code}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Region Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" variant="outlined" error={Boolean(touched.region_code && errors.region_code)}>
                <InputLabel>Region</InputLabel>
                <Select
                  label="Region"
                  name="region_code"
                  value={values.region_code}
                  onChange={(event) => handleRegionChange(event, setFieldValue)}
                  onBlur={handleBlur}

               color='secondary'
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: 'primary.main',  // Set background color to secondary
            '& .MuiMenuItem-root': {
              color: 'white',  // Set text color for menu items
            },
          },
        },
      }}
      sx={{
        '& .MuiInputBase-input': {
          color: 'black'  // Set input text color to black
        }
      }}
    >
                  <MenuItem value="">
                    <em>Select Region</em>
                  </MenuItem>
                  {loading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : error ? (
                    <MenuItem disabled>Error loading regions</MenuItem>
                  ) : (
                    regionList.map((region) => (
                      <MenuItem key={region.region_code} value={region.region_code}>
                        {region.region_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {touched.region_code && errors.region_code && <FormHelperText>{errors.region_code}</FormHelperText>}
              </FormControl>
            </Grid>

<Grid item xs={12} sm={12}>
      <TextField
        error={Boolean(touched.jobdesc && (errors.jobdesc || values.jobdesc.length >= maxLength))}
        fullWidth
        helperText={
          touched.jobdesc && (errors.jobdesc || values.jobdesc.length >= maxLength)
            ? errors.jobdesc || `Character limit reached (${maxLength} characters max)`
            : ''
        }
        label="Job Description"
        color='secondary'
        margin="normal"
        name="jobdesc"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.jobdesc}
        variant="outlined"
        multiline
        rows={2}         // Minimum number of rows
        maxRows={4}     // Maximum number of rows before scrolling starts
        inputProps={{
          maxLength: maxLength  // Limit the number of characters allowed
        }}
        sx={{
          '& .MuiInputBase-input': {
            color: 'black'  // Set input text color to black
          }
        }}
      />
      <FormHelperText
        sx={{
          color: values.jobdesc.length >= maxLength
            ? 'error.main'  // Highlight in red when the limit is reached
            : values.jobdesc.length >= warningLimit
            ? 'warning.main'  // Highlight in warning color when close to limit
            : 'text.secondary',  // Normal color
        }}
      >
        {`${values.jobdesc.length}/${maxLength} characters`}
      </FormHelperText>
    </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                       color='secondary'
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      fullWidth
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      label="confirm Password"
                       color='secondary'
                      margin="normal"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirmPassword}
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'black'  // Set input text color to black
                        }
                      }}
                    />
                  </Grid>

                 
                </Grid>

                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    color='secondary'
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textCustom"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="secondary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                
                <Box sx={{ py: 2 }}>
                  <Button
                    color="secondary"
                    disabled={isSubmitting}
                    // onClick={handleSubmit}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textCustom"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    color='secondary'
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
         </Box>
    </>
  );
};

export default Register;
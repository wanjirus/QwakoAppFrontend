import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from 'src/REST-API/api';
import { getCurrentUser } from 'src/REST-API/auth/AuthProvider';

const AddUserForm = () => {
  const api = useApi();
  // const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState('');
  const [successful, setsuccessful] = useState(false);

  const handleSuccessAlertOpen = () => {
    setsuccessful(true);
  };

  const handleSuccessAlertClose = () => {
    setsuccessful(false);
    // On successful addition of an new user, you are navigated to the users list.
    // navigate('/app/users', { replace: true });
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

  // Handle Navigation Back to the User List onClick
  const handleCancel = () => {
    // navigate('/app/users', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>AddUserForm | SunApp Application</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              phone_number: '',
              firstname: '',
              lastname: '',
              username: '',
              password: 'default',
              staff_position: '',
              staff_number: '',

            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                phone_number: Yup.string().required('Phone number is required'),
                firstname: Yup.string().min(2, 'Name must be more than 2 characters.').max(255).required('First name is required'),
                lastname: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
                password: Yup.string().min(5, 'Password should be more than 5 characters.').max(255).required('password is required'),
                username: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
                staff_position: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
                staff_number: Yup.string().min(2, 'Name must be more than 2 characters long.').max(255).required('Last name is required'),
              })
            }
            onSubmit={async (validationSchema) => {
              // AddUserForm Method
              const user = getCurrentUser();
              Promise.all([
                await api.post('/users/register', validationSchema),
                await api.post(`staffs/${user.id}`, validationSchema)
              ])
                .then((response) => {
                  handleSuccessAlertOpen();
                  setmessage('successful');
                  console.log(`Successfull! : ${response.data}`);
                })
                .catch((error) => {
                  handleErrorAlertOpen();
                  setmessage(error.toString());
                  console.error(`Failed! : ${error.toString()}`);
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
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add a New User
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use an email to add a add new account
                  </Typography>
                </Box>
                {/* Message Upon unsuccessful registration */}
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
                    Adding User unsuccessfull !
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
                    <strong>{message}</strong>
                  </Alert>
                </Collapse>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.firstname && errors.firstname)}
                      fullWidth
                      helperText={touched.firstname && errors.firstname}
                      label="First name"
                      margin="normal"
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstname}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.lastname && errors.lastname)}
                      fullWidth
                      helperText={touched.lastname && errors.lastname}
                      label="Last name"
                      margin="normal"
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastname}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="User Name"
                      margin="normal"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.username}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      fullWidth
                      helperText={touched.phone_number && errors.phone_number}
                      label="Phone number"
                      margin="normal"
                      name="phone_number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="phone_number"
                      value={values.phone_number}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.staff_position && errors.staff_position)}
                      fullWidth
                      helperText={touched.staff_position && errors.staff_position}
                      label="Staff Position"
                      margin="normal"
                      name="staff_position"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.staff_position}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.staff_number && errors.staff_number)}
                      fullWidth
                      helperText={touched.staff_number && errors.staff_number}
                      label="Staff Number"
                      margin="normal"
                      name="staff_number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.staff_number}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ py: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Add User now
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="cancel"
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default AddUserForm;

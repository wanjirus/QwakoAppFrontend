import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Grid,
  Slide,
  CircularProgress,
  Fade,
  Backdrop,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomSnackBar from "./CustomSnackBar";
import axios from "axios";

const steps = [
   "Property Details",
   "Contact Information",
   "Additional Details",
   "Location Details",
   "Confirm Property Details"];

const AddProperty = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState([false, false, false, false, false]);
  const [direction, setDirection] = useState("left");
  const [validationSuccess, setValidationSuccess] = useState([false, false, false, false, false]); // Track validation success for each step
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const [createResponse,setCreateResponse] = useState([]);
const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setSnackbarOpen(false);
};

const showSnackbar = (message, severity = 'info') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};
  

  const validateStep = (index) => {
    // Perform validation logic here
    const isValid = true; // Replace with actual validation logic
  
    if (isValid) {
      setValidationSuccess((prev) => {
        const newSuccess = [...prev];
        newSuccess[index] = true; // Mark this step as successful
        return newSuccess;
      });
    } else {
      setStepErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = true; // Mark this step as having an error
        return newErrors;
      });
    }
  };
  
  const initialValues = {
    
      description: "",
      name: "",
      price: 0,
      statusCode: "",
      userId: 2,
      dimensionsCode: "",
      titleDeedNo: "",
      mapNo: "",
      water: "",
      infrastructure: "",
      typeCode: "",
      categoryCode: "",
      latitude: "",
      longitude: "",
      statusDescription: "",
      regionCode: "",
      countyCode: "",
      subCountyCode: "",
      wardCode: "",
      zoneCode: "",
      country: "",
      nearestSchool: "",
      nearestHospital: "",
      nearestPoliceStation: "",
      mobileNo1: "",
      mobileNo2: "",
      tel: "",
      email: "",
      address: "",
      image1: "",
      image2: "",
      image3: ""
    
    
  };

  const validationSchema = [
    Yup.object().shape({
      name: Yup.string().required("Property Name is required"),
      description: Yup.string()
        .max(255, "Description must not exceed 255 characters")
        .required("Description is required"),
      price: Yup.number().required("Price is required"), // Changed to number for price
      image1: Yup.string().required("Image 1 is required"),
      image2: Yup.string().required("Image 2 is required"),
      image3: Yup.string().required("Image 3 is required"),
    }),
    Yup.object().shape({
      mobileNo1: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit mobile number")
        .required("Mobile No 1 is required"),
      mobileNo2: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit mobile number")
        .required("Mobile No 2 is required"),
      tel: Yup.string()
        .matches(/^\d{9}$/, "Must be a valid 9-digit telephone number")
        .required("Telephone number is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
    Yup.object().shape({
      typeCode: Yup.string().required("Type Code is required"),
      categoryCode: Yup.string().required("Category Code is required"),
      statusCode: Yup.string().required("Status Code is required"),
      statusDescription: Yup.string().required("Status Description is required"),
      dimensionsCode: Yup.string().required("Dimensions Code is required"),
      titleDeedNo: Yup.string().required("Title Deed No is required"),
      mapNo: Yup.string().required("Map No is required"),
      water: Yup.string().required("Water availability is required"),
      infrastructure: Yup.string().required("Infrastructure details are required"),
    }),
    Yup.object().shape({
      latitude: Yup.string().required("Latitude is required"),
      longitude: Yup.string().required("Longitude is required"),
      country: Yup.string().required("Country is required"),
      regionCode: Yup.string().required("Region Code is required"),
      countyCode: Yup.string().required("County Code is required"),
      subCountyCode: Yup.string().required("Sub County Code is required"),
      wardCode: Yup.string().required("Ward Code is required"),
      zoneCode: Yup.string().required("Zone Code is required"),
      address: Yup.string().required("Address is required"),
      nearestSchool: Yup.string().required("Nearest School is required"),
      nearestHospital: Yup.string().required("Nearest Hospital is required"),
      nearestPoliceStation: Yup.string().required("Nearest Police Station is required"),
    }),
  ];
 
  const handleFormSubmit = async (
    values,
    validationSchema,
    setStepErrors,
    setValidationSuccess,
    showSnackbar,
    setSpinnerLoading
  ) => {
    setSpinnerLoading(true); // Show the spinner
  
    // Perform global validation for all steps
    const isFormValid = await Promise.all(
      validationSchema.map((schema) => schema.isValid(values))
    ).then((results) => results.every((result) => result));
  
    const finalStepErrors = validationSchema.map(
      (schema) => !schema.isValidSync(values)
    );
    const finalValidationSuccess = validationSchema.map(
      (schema) => schema.isValidSync(values)
    );
    setStepErrors(finalStepErrors);
    setValidationSuccess(finalValidationSuccess);
  
    // If validation fails, show error and stop here
    if (!isFormValid) {
      showSnackbar("Please fill all required fields before submitting.", "error");
      setSpinnerLoading(false); // Hide spinner on failure
      return;
    }
  
    // If the form is valid, proceed with API submission
    try {
      console.log('trying'+ JSON.stringify(values, null, 2));
      await axios.post("http://localhost:8005/api/v1/properties/create", values)
      .then((response) => {
       setCreateResponse(response.data);
       console.log(response.data[0]);
       showSnackbar("Property successfully created!", "success");
        // Perform logout or redirect
        // Example: Redirect or clear data
      }).catch((error) => {
        console.error("Failed to post data:", error);
        showSnackbar("Error while creating property.", "error");
      }).catch((err) => {
        console.error("Network error:", err);
        showSnackbar("Network error! Unable to create property.", "error");
      })
    } catch (error) {
      console.error("Failed to create property error:", error);
      alert("Unable to create property");
    } finally {
      setSpinnerLoading(false);
    } 
  };
  const handleNext = async (values, validateForm) => {
    const errors = await validateForm();
  
    // Call validateStep for the current active step
    validateStep(activeStep);
  
    // Check if there are any errors from the form validation
    if (Object.keys(errors).length === 0) {
      setStepErrors((prev) =>
        prev.map((err, idx) => (idx === activeStep ? false : err))
      );
      setDirection("left");
      setActiveStep((prev) => prev + 1);
    } else {
      setStepErrors((prev) =>
        prev.map((err, idx) => (idx === activeStep ? true : err))
      );
    }
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}> {/* Add top margin */}
   <Typography variant="h3" align="center" gutterBottom sx={{ mb: 5, fontSize: "2.5rem" }}>
       Add Property {/* Updated property typography */}
      </Typography>
    
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
  {steps.map((label, index) => (
    <Step key={label}>
      <StepLabel
        error={stepErrors[index]} // Show the error state for this step
        onClick={() => {
          // Allow navigation to this step, regardless of error state
          setActiveStep(index);
        }}
        sx={{
          "& .MuiStepLabel-label": {
            color: stepErrors[index]
              ? "red" // Red color for error
              : validationSuccess[index]
              ? "green" // Green color for successful validation
              : "secondary.main", // Default color
            cursor: "pointer", // Pointer cursor to indicate it's clickable
          },
        }}
      >
        {label}
      </StepLabel>
    </Step>
  ))}
</Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[activeStep]}
       
        // onSubmit={async (values) => {
        //   console.log("Final Submission: ", values);

        //   try {
        //     await api.post("http://localhost:8005/api/v1/properties/create", values)
        //     .then((response) => {
        //      setCreateResponse(response.data);
        //      console.log(response.data);
        //       console.log("Data successfully posted:", values);
        //       // Perform logout or redirect
        //       alert("Property successfully created!");
        //       // Example: Redirect or clear data
        //     }).catch((error)=>{
        //       console.error("Failed to post data:", error);
        //       alert("Error while creating property!");
        //     }).catch ((error) => {
        //       console.error("Network error:", error);
        //       alert("Network error! Unable to create property.");
        //     })
           
              
        
        //   } catch (error) {
        //     console.error("Network error:", error);
        //     alert("Network error! Unable to create property.");
        //   }
        // }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldTouched,
          validateForm,
        }) => (
          <Form>
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box>
                {activeStep === 0 && (
                  <Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Property Name */}
                    <Grid item xs={12} > {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Property Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main", fontSize: "1.2rem" },
                          "& .MuiInputBase-input": { color: "black", padding: "10px", fontSize: "1rem" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                          },
                        }}
                      />
                    </Grid>
                    {/* Property Description */}
                    <Grid item xs={12}> {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main" },
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                          },
                        }}
                      />
                    </Grid>
                    {/* Price */}
                    <Grid item xs={12} md={6}> {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main" },
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                          },
                        }}
                      />
                    </Grid>
                    {/* Image 1 */}
                    <Grid item xs={12} md={6}> {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Image 1"
                        name="image1"
                        value={values.image1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.image1 && errors.image1)}
                        helperText={touched.image1 && errors.image1}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main" },
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "secondary.main" },
                          },
                        }}
                      />
                    </Grid>
                    {/* Image 2 */}
                    <Grid item xs={12} md={6}> {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Image 2"
                        name="image2"
                        value={values.image2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.image2 && errors.image2)}
                        helperText={touched.image2 && errors.image2}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main" },
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                          },
                        }}
                      />
                    </Grid>
                    {/* Image 3 */}
                    <Grid item xs={12} md={6}> {/* Change this line */}
                      <TextField
                        fullWidth
                        label="Image 3"
                        name="image3"
                        value={values.image3}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.image3 && errors.image3)}
                        helperText={touched.image3 && errors.image3}
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": { color: "primary.main" },
                          "& .MuiInputBase-input": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "black" },
                            "&:hover fieldset": { borderColor: "primary.main" },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                )}

                {activeStep === 1 && (
                  <Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
  {/* Mobile No 1 */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Mobile No 1"
      name="mobileNo1"
      value={values.mobileNo1}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.mobileNo1 && errors.mobileNo1)}
      helperText={touched.mobileNo1 && errors.mobileNo1}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Mobile No 2 */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Mobile No 2"
      name="mobileNo2"
      value={values.mobileNo2}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.mobileNo2 && errors.mobileNo2)}
      helperText={touched.mobileNo2 && errors.mobileNo2}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Telephone */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Telephone"
      name="tel"
      value={values.tel}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.tel && errors.tel)}
      helperText={touched.tel && errors.tel}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Email */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Email"
      name="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.email && errors.email)}
      helperText={touched.email && errors.email}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>
</Grid>

                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                <Grid container spacing={2} sx={{ mb: 2 }}>
  {/* Type Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Type Code"
      name="typeCode"
      value={values.typeCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.typeCode && errors.typeCode)}
      helperText={touched.typeCode && errors.typeCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Category Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Category Code"
      name="categoryCode"
      value={values.categoryCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.categoryCode && errors.categoryCode)}
      helperText={touched.categoryCode && errors.categoryCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Status Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Status Code"
      name="statusCode"
      value={values.statusCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.statusCode && errors.statusCode)}
      helperText={touched.statusCode && errors.statusCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Status Description */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Status Description"
      name="statusDescription"
      value={values.statusDescription}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.statusDescription && errors.statusDescription)}
      helperText={touched.statusDescription && errors.statusDescription}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Dimensions Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Dimensions Code"
      name="dimensionsCode"
      value={values.dimensionsCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.dimensionsCode && errors.dimensionsCode)}
      helperText={touched.dimensionsCode && errors.dimensionsCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Title Deed No */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Title Deed No"
      name="titleDeedNo"
      value={values.titleDeedNo}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.titleDeedNo && errors.titleDeedNo)}
      helperText={touched.titleDeedNo && errors.titleDeedNo}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Map No */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Map No"
      name="mapNo"
      value={values.mapNo}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.mapNo && errors.mapNo)}
      helperText={touched.mapNo && errors.mapNo}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Water */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Water Availability"
      name="water"
      value={values.water}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.water && errors.water)}
      helperText={touched.water && errors.water}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Infrastructure */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Infrastructure Details"
      name="infrastructure"
      value={values.infrastructure}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.infrastructure && errors.infrastructure)}
      helperText={touched.infrastructure && errors.infrastructure}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>
</Grid>


                  </Box>
                )}
                {activeStep === 3 && (
                  <Box>
                 <Grid container spacing={2} sx={{ mb: 2 }}>
  {/* Latitude */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Latitude"
      name="latitude"
      value={values.latitude}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.latitude && errors.latitude)}
      helperText={touched.latitude && errors.latitude}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Longitude */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Longitude"
      name="longitude"
      value={values.longitude}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.longitude && errors.longitude)}
      helperText={touched.longitude && errors.longitude}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Country */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Country"
      name="country"
      value={values.country}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.country && errors.country)}
      helperText={touched.country && errors.country}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Region Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Region Code"
      name="regionCode"
      value={values.regionCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.regionCode && errors.regionCode)}
      helperText={touched.regionCode && errors.regionCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* County Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="County Code"
      name="countyCode"
      value={values.countyCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.countyCode && errors.countyCode)}
      helperText={touched.countyCode && errors.countyCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Sub County Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Sub County Code"
      name="subCountyCode"
      value={values.subCountyCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.subCountyCode && errors.subCountyCode)}
      helperText={touched.subCountyCode && errors.subCountyCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Ward Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Ward Code"
      name="wardCode"
      value={values.wardCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.wardCode && errors.wardCode)}
      helperText={touched.wardCode && errors.wardCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Zone Code */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Zone Code"
      name="zoneCode"
      value={values.zoneCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.zoneCode && errors.zoneCode)}
      helperText={touched.zoneCode && errors.zoneCode}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Address */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Address"
      name="address"
      value={values.address}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.address && errors.address)}
      helperText={touched.address && errors.address}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Nearest School */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Nearest School"
      name="nearestSchool"
      value={values.nearestSchool}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.nearestSchool && errors.nearestSchool)}
      helperText={touched.nearestSchool && errors.nearestSchool}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Nearest Hospital */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Nearest Hospital"
      name="nearestHospital"
      value={values.nearestHospital}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.nearestHospital && errors.nearestHospital)}
      helperText={touched.nearestHospital && errors.nearestHospital}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>

  {/* Nearest Police Station */}
  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Nearest Police Station"
      name="nearestPoliceStation"
      value={values.nearestPoliceStation}
      onChange={handleChange}
      onBlur={handleBlur}
      error={Boolean(touched.nearestPoliceStation && errors.nearestPoliceStation)}
      helperText={touched.nearestPoliceStation && errors.nearestPoliceStation}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": { color: "primary.main" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  </Grid>
</Grid>


                  </Box>
                )}

                {activeStep === 4 && (
                  <Box>
                  <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Property Name:</strong> {values.name}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Description:</strong> {values.description}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Price:</strong> {values.price}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Type Code:</strong> {values.typeCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Category Code:</strong> {values.categoryCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Status Code:</strong> {values.statusCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Status Description:</strong> {values.statusDescription}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Dimensions Code:</strong> {values.dimensionsCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Title Deed No:</strong> {values.titleDeedNo}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Map No:</strong> {values.mapNo}
                      </Typography>
                    </Grid>
                
                    {/* Right Column */}
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Image 1:</strong> {values.image1}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Image 2:</strong> {values.image2}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Image 3:</strong> {values.image3}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mobile No 1:</strong> {values.mobileNo1}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Mobile No 2:</strong> {values.mobileNo2}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Telephone:</strong> {values.tel}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong> {values.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Latitude:</strong> {values.latitude}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Longitude:</strong> {values.longitude}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Country:</strong> {values.country}
                      </Typography>
                    </Grid>
                
                    {/* Additional Details */}
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Region Code:</strong> {values.regionCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>County Code:</strong> {values.countyCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Sub County Code:</strong> {values.subCountyCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Ward Code:</strong> {values.wardCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Zone Code:</strong> {values.zoneCode}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {values.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Nearest School:</strong> {values.nearestSchool}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Nearest Hospital:</strong> {values.nearestHospital}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Nearest Police Station:</strong> {values.nearestPoliceStation}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Infrastructure:</strong> {values.infrastructure}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                )}
              </Box>
            </Slide>

           

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
  {/* Back Button */}
  {activeStep > 0 && (
    <Button
      variant="outlined"
      onClick={() => setActiveStep((prevStep) => prevStep - 1)}
      sx={{ color: "secondary.main" }}
    >
      Back
    </Button>
  )}

  {/* Next Button for Steps Before the Last Step */}
  {activeStep < steps.length - 1 && (
    <Button
      variant="contained"
      onClick={async () => {
        const isValid = await validationSchema[activeStep].isValid(values);
        const newStepErrors = [...stepErrors];
        const newValidationSuccess = [...validationSuccess];
        newStepErrors[activeStep] = !isValid;
        newValidationSuccess[activeStep] = isValid;
        setStepErrors(newStepErrors);
        setValidationSuccess(newValidationSuccess);

        if (isValid) {
          setActiveStep((prevStep) => prevStep + 1);
        } else {
          showSnackbar("Please correct the errors before proceeding.", "error");
        }
      }}
      sx={{ color: "white" }}
    >
      Next
    </Button>
  )}

  {/* Submit Button for the Final Step */}
  {activeStep === steps.length - 1 && (
    <Button
      variant="contained"
      color="secondary"
      type="button" // Changed to "button" to avoid form auto-submission
      sx={{ color: "white" }}
      onClick={() =>
        handleFormSubmit(
          values,
          validationSchema,
          setStepErrors,
          setValidationSuccess,
          showSnackbar,
          setSpinnerLoading
        )
      }
    >
      Submit
    </Button>
  )}

  {/* Floating Spinner with Animation and Dimming */}
  <Fade in={spinnerLoading}>
    <Backdrop
      open={spinnerLoading}
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimming effect
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "opacity 0.3s ease-in-out", // Smooth fade-in/out
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </Fade>

  {/* Snackbar Component */}
  <CustomSnackBar
    open={snackbarOpen}
    handleClose={handleSnackbarClose}
    message={snackbarMessage}
    severity={snackbarSeverity}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  />
</Box>;





          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddProperty;

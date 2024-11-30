// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { Button, Grid, IconButton } from "@material-ui/core";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Compressor from "compressorjs";
// import { getCurrentUser } from '../REST-API/auth/AuthProvider';

// export default function App() {
//   const webRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mirrored, setMirrored] = useState(false);
//   const [geolocationEnabled, setGeolocationEnabled] = useState(false);
//   const [compressedImageUrl, setCompressedImageUrl] = useState(null);

//   const getCoordinates = (position) => {
//     console.log("Position:", position);
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude);
//   };

//   const getGeolocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           getCoordinates(position);
//           setGeolocationEnabled(true);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           alert("Geolocation error. Please check the console for details.");
//           setGeolocationEnabled(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported in your browser.");
//       setGeolocationEnabled(false);
//     }
//   };

//   const convertToBuffer = (url) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", url, true);
//       xhr.responseType = "blob";
  
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             resolve(reader.result);
//           };
//           reader.onerror = reject;
//           reader.readAsArrayBuffer(xhr.response);
//         } else {
//           reject(new Error("Failed to load image"));
//         }
//       };
  
//       xhr.onerror = reject;
//       xhr.send();
//     });
//   };
//   const compressImage = async (myblob, fileName) => {
//     try {
//       const compressedBlob = await new Promise((resolve, reject) => {
//         new Compressor(myblob, {
//           quality: 0.6, // Adjust the desired image quality (0.0 - 1.0)
//           maxWidth: 600, // Adjust the maximum width of the compressed image
//           maxHeight: 600, // Adjust the maximum height of the compressed image
//           mimeType: "image/jpeg", // Specify the output image format
//           name: fileName, // Specify the output image format
//           success(result) {
//             resolve(result);
//           },
//           error(error) {
//             reject(error);
//           },
//         });
//       });

//       console.log("Image BLOB Compressed: ",compressedBlob);
//       localStorage.setItem('imageblob',compressedBlob);
//       //setCompressedImageUrl(URL.createObjectURL(compressedBlob));
//       //console.log("Image URL",compressedImageUrl);
//       //setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//       //setIsLoading(false);
//     }
//   };

//   //compressImage(mfile);
//   const postImageToDatabase = async (imageBlob, fileName) => {
//     // const formData = new FormData();
//     // formData.append("image", imageBlob, fileName);
  
//     // try {
//     //   const response = await fetch("http://localhost:8080/api/v1/plantingSession/upload?imageUpload", {
//     //     method: "POST",
//     //     body: formData,
//     //   });
  
//     //   if (response.ok) {
//     //     console.log("Image posted to database");
  
//     //     // Fetch the image from the database
//     //     const fetchResponse = await fetch(`http://localhost:8080/api/v1/plantingSession/images/${fileName}`);
//     //     if (fetchResponse.ok) {
//     //       const imageData = await fetchResponse.blob();
//     //       setImage(URL.createObjectURL(imageData));
//     //     } else {
//     //       console.error("Failed to fetch image from the database");
//     //     }
//     //   } else {
//     //     console.error("Failed to post image to database");
//     //   }
//     // } catch (error) {
//     //   console.error("Failed to post image to database:", error);
//     // }
//   };

// //   const formatDate = (date) => {
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const hours = String(date.getHours()).padStart(2, '0');
// //     const minutes = String(date.getMinutes()).padStart(2, '0');
// //     const seconds = String(date.getSeconds()).padStart(2, '0');

// //     return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
// // };

//   const captureImage = async () => {
//     if (cameraOpen) {
//       const imageSrc = webRef.current.getScreenshot();
//       console.log("Orig Image",imageSrc);
//       const user = getCurrentUser();
//       const username = user.username;

//       if (geolocationEnabled) {
//         const blob = await fetch(imageSrc).then((res) => res.blob());
//         console.log("Image BLOB Passed Over: ",blob);
//         const buffer = await convertToBuffer(imageSrc);
//         const updatedImageBlob2 = new Blob([buffer], { type: "image/jpeg" });
//         const timestamp = new Date().toISOString().replace(/:/g, '-'); // Replace colons with dashes to make it a valid file name
//         const fileName = `${username}_${timestamp}.jpeg`;
        
//         compressImage(blob,fileName);

//         //const updatedImageBlob = compressedImageUrl;
//         const updatedImageBlob = localStorage.getItem('imageblob');
//         console.log("Image BLOB Passed Over: ",updatedImageBlob);
//         const currentDate = Date.now;
//         const dateAndTime = currentDate;
        
//         const imageType = imageSrc.type || 'image/jpeg';
//         await postImageToDatabase(updatedImageBlob, fileName);
  
//         console.log("Empty Image: ",image);
//         setImage(imageSrc);
//         setCameraOpen(false);

//         // Log image details including latitude, longitude, date, time, and image type
//         console.log("Image details:");
//         console.log("Latitude:", latitude);
//         console.log("Longitude:", longitude);
//         console.log("Date and Time:", dateAndTime);
//         console.log("Image Type:", imageType);
//         localStorage.setItem('imageblob',updatedImageBlob);
//         //localForage.setItem( "imageblob",updatedImageBlob );
//         const imageprop = {
//           image: imageSrc,
//           imageblob: updatedImageBlob,
//           imagedate: dateAndTime,
//           filename: fileName,
//           latitude: latitude,
//           longitude: longitude,
//           imagetype: imageType
//         }

//         console.log("Our Mapped Image", imageprop);

//         localStorage.setItem('imageprop',JSON.stringify(imageprop));

//       } else {
//         alert("Please enable location access to capture the image and coordinates.");
//       }
//     }
//   };
 

//   const openCamera = () => {
//     setImage(null);
//     setCameraOpen(true);
//   };

  
//   const webcamStyle = {
//     width: "100%",
//     height: "auto",
//   };

//   const capturedImageStyle = {
//     width: "300px", 
//     height: "auto",
//   };

//   return (
//     <div className="App" width='100%'>
//       {cameraOpen ? (
//         <Webcam
//           audio={false}
//           ref={webRef}
//           screenshotFormat="image/jpeg"
//           //style={webcamStyle}
//           height={125}
//           width={300}
//           mirrored={mirrored}
//           screenshotQuality={0.8}
//           forceScreenshotSourceSize="false"
//         />
//       ) : (
//         <img
//           src={image}
//           alt="Turn on Location and Retake photo"
//           style={capturedImageStyle}
//         />
//       )}
//       <Grid style={{display: 'flex', flexDirection:'row', width: '100% important!'}}>
//       <IconButton onClick={() => (cameraOpen ? captureImage() : openCamera())}>
//         Click
//       </IconButton>
//       <Button onClick={getGeolocation}> <LocationOnIcon/>Turn on location</Button>
      
//       </Grid>
//       {!geolocationEnabled && <p>Please enable location access on your device to capture the image.</p>}
     
//     </div>
//   );
// }


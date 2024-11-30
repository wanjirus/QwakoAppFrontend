// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();
// const port = 3001; // Choose a port number for your proxy server

// // Add CORS headers to the responses from the proxy server
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// // Create a proxy middleware for forwarding requests to the API server
// const apiProxy = createProxyMiddleware({
//   target: 'http://nemis.education.go.ke', // Replace with the actual API server URL
//   changeOrigin: true,
// });

// // Forward requests with '/api' prefix to the API server
// app.use('/api', apiProxy);

// // Start the server
// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Choose a port for your proxy server

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Your API route
app.get('http://nemis.education.go.ke/generic2/api/Users/alogin', (req, res) => {
  // Make a request to 'http://nemis.education.go.ke/generic2/api/Users/alogin' here
  // Forward the response to the frontend
  // Ensure you set the appropriate headers for CORS in the response here
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const cors = require('cors');
  app.use(cors())

  app.use(
    '/generic2/api/Users/MyRoles',
    createProxyMiddleware({
      target: 'http://nemis.education.go.ke',
      changeOrigin: true,
    })
  );

  app.use(
    '/generic2/api/Cascade/MyCounties',
    createProxyMiddleware({
      target: 'http://nemis.education.go.ke',
      changeOrigin: true,
    })
  );

  app.use(
    '/generic2/api/Cascade/MySubCounties',
    createProxyMiddleware({
      target: 'http://nemis.education.go.ke',
      changeOrigin: true,
    })
  );


  app.use(
    '/generic2/api/Users/alogin', // Define the path you want to proxy
    createProxyMiddleware({
      target: 'http://nemis.education.go.ke/generic2/api/Users/alogin', // Set the target URL of your backend server
      changeOrigin: true, // Change the origin of the host header to the target URL
    })
  );

};

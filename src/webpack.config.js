const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      // Add polyfills for the missing modules
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      fs: false, // Node.js `fs` module can't be polyfilled, so disable it
    },
  },
  historyApiFallback: {
    disableDotRule: true,
  },
  devServer: {
    allowedHosts: "all", // Allow all hosts in the dev server
  },
  // Other webpack configuration options...
};
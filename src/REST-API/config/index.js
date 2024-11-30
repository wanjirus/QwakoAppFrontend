let urlhom = window.location.origin;   //Gets http://localhost (without port part)
const config = {
    api: {
      baseUrl: 
        // process.env.REACT_APP_API_BASE_URL
        // ? process.env.REACT_APP_API_BASE_URL
        // : 
      //urlhom+'/treeapi/api'
        urlhom+'/treeapi/api'

    }
  };
  
  export default config;

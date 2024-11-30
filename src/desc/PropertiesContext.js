import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Global Context
export const PropertiesContext = createContext();

// GlobalProvider Component
export const PropertiesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPropsList, setAllPropsList] = useState([]);
  const [userPropsList, setUserPropsList] = useState([]);
  const [eachProperty, setEachProperty] = useState([]);
  const [propByUAI, SetPropByUAI] = useState([]);
  const [byTypeList, setByTypeList] = useState([]);
  const [byCategoryList, setByCategoryList] = useState([]);
  const [byTypeAndCategoryList, setByTypeandCategoryList] = useState([]);

  const fetchAllProperties = async () => {
    try{
        const response = await axios.get('http://localhost:8005/api/v1/properties/');
        setAllPropsList(response.data);
        setError(null);
    } catch(err){
        setError('failed to ferch all Properties Data')
    } finally{
        setLoading(false);
    }
    };
    const fetchUserProperties = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/properties/${userId}`);
          setUserPropsList(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('failed to ferch properties Data');
        } finally {
          setLoading(false);
        }
      };
      const fetchEachProperty = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/properties/property/get/${id}`);
          setEachProperty(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('Failed to fetch gender data');
        } finally {
          setLoading(false);
        }
      };
      const fetchPropByUAI = async (uaiNo) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/properties/property/uai/${uaiNo}`);
          SetPropByUAI(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('Failed to fetch gender data');
        } finally {
          setLoading(false);
        }
      };
      const fetchPropertiesByType = async (type) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/users/properties/property/get/type/${type}`);
          setByTypeList(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('Failed to fetch gender data');
        } finally {
          setLoading(false);
        }
      };
      const fetchPropertiesByCategory = async (category) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/users/properties/property/get/category/${category}`);
          setByCategoryList(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('Failed to fetch gender data');
        } finally {
          setLoading(false);
        }
      };
      const fetchPropertiesByTypeAndCategory = async (type,category) => {
        try {
          const response = await axios.get(`http://localhost:8005/api/v1/users/properties/property/get/typecategory/${type}/${category}`);
          setByTypeandCategoryList(response.data); // Update state with fetched data
          setError(null); // Clear any previous errors if data is successfully fetched
        } catch (err) {
          setError('Failed to fetch gender data');
        } finally {
          setLoading(false);
        }
      };

  // Fetch all initial data (except regions) when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAllProperties(),fetchEachProperty(),fetchPropByUAI(),fetchPropertiesByCategory(),fetchPropertiesByType(),fetchPropertiesByTypeAndCategory(), fetchUserProperties()]);
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <PropertiesContext.Provider value={{  
      loading, 
      error,
       // Make sure fetchRegions is included in the context value
      allPropsList,
      userPropsList,
      eachProperty,
      propByUAI,
      byTypeList, 
      byCategoryList,
     byTypeAndCategoryList
    
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};

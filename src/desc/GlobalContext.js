import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Global Context
export const GlobalContext = createContext();

// GlobalProvider Component
export const GlobalProvider = ({ children }) => {
  const [genderList, setGenderList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gender data from the API
  const fetchGenders = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/v1/users/desc/gender');
      setGenderList(response.data); // Update state with fetched data
      setError(null); // Clear any previous errors if data is successfully fetched
    } catch (err) {
      setError('Failed to fetch gender data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/v1/users/desc/country');
      setCountryList(response.data);
      setError(null); // Clear any previous errors if data is successfully fetched
    } catch (err) {
      setError('Failed to fetch country data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async (countryCode) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8005/api/v1/users/desc/region/${countryCode}`);
      setRegionList(response.data); // Update state with regions specific to the selected country
      setError(null); // Clear any previous errors if data is successfully fetched
    } catch (err) {
      setError('Failed to fetch region data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all initial data (except regions) when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchGenders(), fetchCountries()]);
      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <GlobalContext.Provider value={{ 
      genderList, 
      countryList, 
      regionList, 
      loading, 
      error, 
      fetchRegions // Make sure fetchRegions is included in the context value
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

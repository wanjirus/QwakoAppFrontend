import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Gender Context
export const GenderContext = createContext();

// GenderProvider Component
export const GenderProvider = ({ children }) => {
  const [genderList, setGenderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gender data from the API
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get('http://localhost:8005/api/v1/users/desc/gender');
        setGenderList(response.data); // Update state with fetched data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gender data');
        setLoading(false);
      }
    };

    fetchGenders();
  }, []); // Empty dependency array to run once on component mount

  return (
    <GenderContext.Provider value={{ genderList, loading, error }}>
      {children}
    </GenderContext.Provider>
  );
};

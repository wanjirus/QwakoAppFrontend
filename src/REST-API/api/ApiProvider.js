import React from 'react';
import axios from 'axios';

import ApiContext from '../../REST-API/context/ApiContext';
import { keysToCamel, keysToSnake } from '../../REST-API/utils/stringUtils';

// const user = localStorage.getItem('user');
const user = sessionStorage.getItem('user');

// eslint-disable-next-line react/prop-types
const ApiProvider = ({ config, children }) => {
  const currentUser = JSON.parse(user);
  const token = currentUser ? currentUser.jwt : '';
  const options = {
    // eslint-disable-next-line react/prop-types
    baseURL: config.baseUrl,
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    transformRequest: [
      (data) => keysToSnake(data),
      ...axios.defaults.transformRequest
    ]
  };

  const apiClient = axios.create(options);

  apiClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        response.data = keysToCamel(response.data);
      }

      return response;
    },
    (error) => Promise.reject(error)
  );

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;

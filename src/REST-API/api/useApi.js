import { useContext } from 'react';
import { useNavigate } from 'react-router';

import ApiContext from '../../REST-API/context/ApiContext';

const useApi = () => {
  const navigate = useNavigate();

  const apiClient = useContext(ApiContext);
  if (apiClient === undefined) {
    throw new Error('useApi must be used within an ApiContext');
  }

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        navigate('/', { replace: true });
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default useApi;
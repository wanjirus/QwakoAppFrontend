import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import AuthContext from '../src/REST-API/context/AuthContext';


const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  const { user } = useContext(AuthContext); // Access the user from your AuthContext

  if (user) {
    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/home" />;
  }
};

export default ProtectedRoute;

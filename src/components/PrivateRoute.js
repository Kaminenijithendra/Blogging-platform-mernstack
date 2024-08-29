import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" replace state={{ message: 'Please log in or register to access this page.' }} />
  );
};

export default PrivateRoute;

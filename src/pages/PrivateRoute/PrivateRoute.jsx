import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    console.log('the otken', token)

    // If there's no token, navigate to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Return the children (child component) if the token exists
    return children;
};

export default PrivateRoute;

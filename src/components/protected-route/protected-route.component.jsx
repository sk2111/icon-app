//libs
import React from 'react';
import { Redirect } from 'react-router-dom';
// constants
import { BASE_PATH, PROTECTED_ROUTE_PATH } from '../../utilities/route.paths';

const ProtectedRoute = WrappedComponent => ({ currentUser, ...otherProps }) => {
    return (currentUser?.uid ? <WrappedComponent {...otherProps} /> : <Redirect to={BASE_PATH + PROTECTED_ROUTE_PATH} />);
};

export default ProtectedRoute;
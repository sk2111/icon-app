//libs
import React from 'react';
import { Redirect } from 'react-router-dom';
// constants
import { GO_TO_SIGNIN } from '../../utilities/route.paths';

const ProtectedRoute = WrappedComponent => ({ currentUser, ...otherProps }) => {
    return (currentUser?.uid ? <WrappedComponent {...otherProps} /> : <Redirect to={GO_TO_SIGNIN} />);
};

export default ProtectedRoute;
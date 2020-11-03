//libs
import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = WrappedComponent => (props) => {
    const { currentUser, ...otherProps } = props;
    return (
        currentUser?.uid ?
            <WrappedComponent {...otherProps} />
            :
            <Redirect to="/signin"></Redirect>
    );
};

export default ProtectedRoute;
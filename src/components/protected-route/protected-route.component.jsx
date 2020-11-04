//libs
import React from 'react';
const ProtectedRoute = WrappedComponent => (props) => {
    const { currentUser, ...otherProps } = props;
    const { history } = props;

    const authHandler = () => {
        history.push('/signin');
        return null;
    };

    return (currentUser?.uid ? <WrappedComponent {...otherProps} /> : authHandler());
};

export default ProtectedRoute;
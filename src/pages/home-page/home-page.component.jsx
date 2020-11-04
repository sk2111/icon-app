import React from 'react';
import ProtectedRoute from '../../components/protected-route/protected-route.component';

const HomePage = () => {
    return (
        <h1>Hai I am protected route</h1>
    );
};

export default ProtectedRoute(HomePage);
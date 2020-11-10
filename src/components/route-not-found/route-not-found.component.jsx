import React from 'react';
import { Redirect } from 'react-router-dom';
//constants
import { HOME_PATH } from '../../utilities/route.paths';

const RouteNotFound = () => {
    return (
        <Redirect to={HOME_PATH} />
    );
};

export default RouteNotFound;
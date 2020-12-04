import React from 'react';
import { Redirect } from 'react-router-dom';
//constants
import { SIGN_IN_ROUTE_PATH } from '../../utilities/route.paths';

const RouteNotFound = () => {
    return (<Redirect to={SIGN_IN_ROUTE_PATH} />);
};

export default RouteNotFound;
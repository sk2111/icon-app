import React from 'react';
import { Redirect } from 'react-router-dom';
//constants
import { LANDING_PATH } from '../../utilities/route.paths';

const RouteNotFound = () => {
    return (<Redirect to={LANDING_PATH} />);
};

export default RouteNotFound;
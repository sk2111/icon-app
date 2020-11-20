import React from 'react';
import { Redirect } from 'react-router-dom';
//constants
import { GO_TO_SIGNIN } from '../../utilities/route.paths';

const RouteNotFound = () => {
    return (<Redirect to={GO_TO_SIGNIN} />);
};

export default RouteNotFound;
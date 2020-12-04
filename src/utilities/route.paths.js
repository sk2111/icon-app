export const AUTH_ROUTE_PATH = '/auth';
export const HOME_ROUTE_PATH = '/home';
export const SIGN_IN_ROUTE_PATH = AUTH_ROUTE_PATH + '/signin';
export const SIGN_OUT_ROUTE_PATH = AUTH_ROUTE_PATH + '/signout';
export const SIGN_UP_ROUTE_PATH = AUTH_ROUTE_PATH + '/signup';
export const FORGOT_PASSWORD_ROUTE_PATH = AUTH_ROUTE_PATH + '/forgotpassword';
export const UPDATE_PASSWORD_ROUTE_PATH = AUTH_ROUTE_PATH + '/updatepassword';
// navigation paths
export const COMMON_ROUTE_PATH = HOME_ROUTE_PATH + '/common';
export const PROJECTS_ROUTE_PATH = HOME_ROUTE_PATH + '/projects';
export const FAVORITES_ROUTE_PATH = HOME_ROUTE_PATH + '/favorites';
export const EDIT_ROUTE_PATH = HOME_ROUTE_PATH + '/edit';
export const MESSAGES_ROUTE_PATH = HOME_ROUTE_PATH + '/messages';

// Default Landing path after sign in success
export const LANDING_ROUTE_PATH = COMMON_ROUTE_PATH;
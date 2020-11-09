import { signInSignUpActionTypes } from './sign-in-sign-up.type';

// clear auth error
export const clearAuthError = () => ({
    type: signInSignUpActionTypes.CLEAR_AUTH_ERROR
});

// User login actions
export const userLoginStart = (payload) => ({
    type: signInSignUpActionTypes.USER_LOGIN_START,
    payload
});
export const userLoginSucess = (payload) => ({
    type: signInSignUpActionTypes.USER_LOGIN_SUCCESS,
    payload
});
export const userLoginFailure = (payload) => ({
    type: signInSignUpActionTypes.USER_LOGIN_FAILURE,
    payload
});

// Signup actions
export const userSignUpStart = (userSignUpInfo) => ({
    type: signInSignUpActionTypes.SIGN_UP_START,
    payload: userSignUpInfo

});
export const userSignUpSuccess = (payload) => ({
    type: signInSignUpActionTypes.SIGN_UP_SUCCESS,
    payload
});
export const userSignUpFailure = (payload) => ({
    type: signInSignUpActionTypes.SIGN_UP_FAILURE,
    payload
});

// Reset Link actions
export const sendResetLinkStart = (payload) => ({
    type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_START,
    payload
});
export const sendResetLinkSuccess = (payload) => ({
    type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS,
    payload
});
export const sendResetLinkFailure = (payload) => ({
    type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE,
    payload
});
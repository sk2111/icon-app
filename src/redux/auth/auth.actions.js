import { authActionTypes } from './auth.type';

// clear auth error
export const clearAuthError = () => ({
    type: authActionTypes.CLEAR_AUTH_ERROR
});

// User login actions
export const userLoginStart = (payload) => ({
    type: authActionTypes.USER_LOGIN_START,
    payload
});
export const userLoginSucess = (payload) => ({
    type: authActionTypes.USER_LOGIN_SUCCESS,
    payload
});
export const userLoginFailure = (payload) => ({
    type: authActionTypes.USER_LOGIN_FAILURE,
    payload
});

// Signup actions
export const userSignUpStart = (userSignUpInfo) => ({
    type: authActionTypes.SIGN_UP_START,
    payload: userSignUpInfo

});
export const userSignUpSuccess = (payload) => ({
    type: authActionTypes.SIGN_UP_SUCCESS,
    payload
});
export const userSignUpFailure = (payload) => ({
    type: authActionTypes.SIGN_UP_FAILURE,
    payload
});

// Reset Link actions
export const sendResetLinkStart = (payload) => ({
    type: authActionTypes.SEND_PASSWORD_RESET_LINK_START,
    payload
});
export const sendResetLinkSuccess = (payload) => ({
    type: authActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS,
    payload
});
export const sendResetLinkFailure = (payload) => ({
    type: authActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE,
    payload
});

// update password actions
export const updateNewPasswordStart = (payload) => ({
    type: authActionTypes.UPDATE_NEW_PASSWORD_START,
    payload
});
export const updateNewPasswordSuccess = () => ({
    type: authActionTypes.UPDATE_NEW_PASSWORD_SUCCESS,
});
export const updateNewPasswordFailure = (payload) => ({
    type: authActionTypes.UPDATE_NEW_PASSWORD_FAILURE,
    payload
});
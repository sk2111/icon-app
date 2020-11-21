import { userActionTypes } from './user.type';

export const userAuthSuccess = (payload) => {
    return {
        type: userActionTypes.USER_AUTH_SUCCESS,
        payload
    }
};

// persistance check actions
export const checkUserPersistance = () => {
    return {
        type: userActionTypes.CHECK_USER_PERSISTANCE
    }
};

export const userPersistanceCheckCompleted = () => {
    return {
        type: userActionTypes.CHECK_USER_PERSISTANCE_COMPLETED
    }
};

//signout actions
export const userSignOutStart = () => {
    return {
        type: userActionTypes.USER_SIGN_OUT_START
    }
};

export const userSignOutSuccess = (payload) => {
    return {
        type: userActionTypes.USER_SIGN_OUT_SUCCESS,
        payload
    }
};

export const userSignOutFailure = (payload) => {
    return {
        type: userActionTypes.USER_SIGN_OUT_FAILURE,
        payload
    }
};

// send reset link to update or change password 
export const updateOrResetPasswordStart = (payload) => {
    return {
        type: userActionTypes.UPDATE_OR_RESET_PASSWORD_START,
        payload
    }
};

export const updateOrResetPasswordSuccess = (payload) => {
    return {
        type: userActionTypes.UPDATE_OR_RESET_PASSWORD_SUCCESS,
        payload
    }
};

export const updateOrResetPasswordFailure = (payload) => {
    return {
        type: userActionTypes.UPDATE_OR_RESET_PASSWORD_FAILURE,
        payload
    }
};
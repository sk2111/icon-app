import { userActionTypes } from './user.type';

export const userAuthSuccess = (payload) => {
    return {
        type: userActionTypes.USER_AUTH_SUCCESS,
        payload
    }
};

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
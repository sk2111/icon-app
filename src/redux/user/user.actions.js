import { userActionTypes } from './user.type';

// get current user info
export const getCurrentUserInfoStart = (payload) => {
    return {
        type: userActionTypes.GET_CURRENT_USER_INFO_START,
        payload
    }
};
export const getCurrentUserInfoSuccess = () => {
    return {
        type: userActionTypes.GET_CURRENT_USER_INFO_SUCCESS
    }
};
export const getCurrentUserInfoFailure = (payload) => {
    return {
        type: userActionTypes.GET_CURRENT_USER_INFO_FAILURE,
        payload
    }
};

// persistance check actions
export const checkUserPersistanceStart = () => {
    return {
        type: userActionTypes.CHECK_USER_PERSISTANCE_START
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

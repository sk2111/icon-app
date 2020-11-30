import { userActionTypes } from './user.type';

export const userAuthSuccess = (payload) => {
    return {
        type: userActionTypes.USER_AUTH_SUCCESS,
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

// user role access check actions
export const getUserAccessRoleStart = () => {
    return {
        type: userActionTypes.GET_USER_ACCESS_ROLE_START
    }
};

export const getUserAccessRoleSucess = (payload) => {
    return {
        type: userActionTypes.GET_USER_ACCESS_ROLE_SUCCESS,
        payload
    }
};

export const getUserAccessRoleFailure = (payload) => {
    return {
        type: userActionTypes.GET_USER_ACCESS_ROLE_FAILURE,
        payload
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

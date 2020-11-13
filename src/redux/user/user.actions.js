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
import { userActionTypes } from './user.type';

export const signInSuccess = (payload) => {
    return {
        type: userActionTypes.SIGN_IN_SUCCESS,
        payload
    }
};

export const checkUserPersistance = () => {
    return {
        type: userActionTypes.CHECK_USER_PERSISTANCE
    }
};
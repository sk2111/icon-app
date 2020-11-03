import { userActionTypes } from './user.type';

export const signInSuccess = (payload) => {
    return {
        type: userActionTypes.SIGN_IN_SUCCESS,
        payload
    }
};
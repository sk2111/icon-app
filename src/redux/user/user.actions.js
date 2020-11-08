import { userActionTypes } from './user.type';

export const checkUserPersistance = () => {
    return {
        type: userActionTypes.CHECK_USER_PERSISTANCE
    }
};
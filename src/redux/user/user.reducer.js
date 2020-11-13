import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    currentUser: null,
    userPersistCheckDone: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.USER_AUTH_SUCCESS:
            return { ...state, currentUser: action.payload };
        case userActionTypes.CHECK_USER_PERSISTANCE_COMPLETED:
            return { ...state, userPersistCheckDone: true };
        default:
            return state;
    }
}

export default userReducer;
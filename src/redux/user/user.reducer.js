import { userActionTypes } from './user.type';

const CLEARVALUE = null;

const INITIAL_STATE = {
    currentUser: CLEARVALUE,
    userPersistCheckDone: false,
    errorMessage: CLEARVALUE
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.USER_AUTH_SUCCESS:
            return { ...state, errorMessage: CLEARVALUE, currentUser: action.payload };
        case userActionTypes.CHECK_USER_PERSISTANCE_COMPLETED:
            return { ...state, errorMessage: CLEARVALUE, userPersistCheckDone: true };
        case userActionTypes.USER_SIGN_OUT_SUCCESS:
            return { ...state, errorMessage: CLEARVALUE, currentUser: null };
        case userActionTypes.USER_SIGN_OUT_FAILURE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

export default userReducer;
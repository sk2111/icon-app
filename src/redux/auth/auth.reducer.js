import { authActionTypes } from './auth.type';

const CLEARVALUE = '';
const INITIALSTATE = {
    waitingForData: false,
    userMessage: CLEARVALUE,
    error: CLEARVALUE,
};

const authReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {

        case authActionTypes.CLEAR_AUTH_ERROR:
            return { ...state, error: CLEARVALUE };

        case authActionTypes.USER_LOGIN_START:
        case authActionTypes.SIGN_UP_START:
        case authActionTypes.SEND_PASSWORD_RESET_LINK_START:
        case authActionTypes.UPDATE_NEW_PASSWORD_START:
            return { ...state, waitingForData: true, error: CLEARVALUE, userMessage: CLEARVALUE };

        case authActionTypes.USER_LOGIN_SUCCESS:
        case authActionTypes.SIGN_UP_SUCCESS:
        case authActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS:
        case authActionTypes.UPDATE_NEW_PASSWORD_SUCCESS:
            return { ...state, waitingForData: false, error: CLEARVALUE, userMessage: action.payload };

        case authActionTypes.USER_LOGIN_FAILURE:
        case authActionTypes.SIGN_UP_FAILURE:
        case authActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE:
        case authActionTypes.UPDATE_NEW_PASSWORD_FAILURE:
            return { ...state, waitingForData: false, error: action.payload, userMessage: CLEARVALUE };

        default:
            return state;
    }
}

export default authReducer;

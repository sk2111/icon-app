import { signInSignUpActionTypes } from './sign-in-sign-up.type';

const CLEARVALUE = '';
const INITIALSTATE = {
    waitingForData: false,
    showUserMessage: CLEARVALUE,
    error: CLEARVALUE,
};

const signInSignUpReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {

        case signInSignUpActionTypes.CLEAR_AUTH_ERROR:
            return { ...state, error: CLEARVALUE };

        case signInSignUpActionTypes.USER_LOGIN_START:
        case signInSignUpActionTypes.SIGN_UP_START:
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_START:
            return { ...state, waitingForData: true, error: CLEARVALUE, showUserMessage: CLEARVALUE };

        case signInSignUpActionTypes.USER_LOGIN_SUCCESS:
        case signInSignUpActionTypes.SIGN_UP_SUCCESS:
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS:
            return { ...state, waitingForData: false, error: CLEARVALUE, showUserMessage: action.payload.message };

        case signInSignUpActionTypes.USER_LOGIN_FAILURE:
        case signInSignUpActionTypes.SIGN_UP_FAILURE:
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE:
            return { ...state, waitingForData: false, error: action.payload, showUserMessage: CLEARVALUE };

        default:
            return state;
    }
}

export default signInSignUpReducer;

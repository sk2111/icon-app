import { signInSignUpActionTypes } from './sign-in-sign-up.type';

const INITIALSTATE = {
    signInViewHidden: false,
    signUpViewHidden: true,
    forgotPasswordViewHidden: true,
    waitingForData: false,
    showUserMessage: '',
    signUpError: '',
    signInError: '',
    forgotPasswordError: ''
};
const CLEARVALUE = '';

const signInSignUpReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case signInSignUpActionTypes.SIGN_IN_VIEW_SELECTED:
            return { ...state, signInViewHidden: false, signUpViewHidden: true };
        case signInSignUpActionTypes.FORGOT_PASSWORD_VIEW_SELECTED:
            return { ...state, forgotPasswordViewHidden: false };
        case signInSignUpActionTypes.CLEAR_FORGOT_PASSWORD_ERROR:
            return { ...state, forgotPasswordError: false };
        case signInSignUpActionTypes.USER_LOGIN_VIEW_SELECTED:
            return { ...state, forgotPasswordViewHidden: true };
        case signInSignUpActionTypes.USER_LOGIN_START:
            return { ...state, waitingForData: true, showUserMessage: CLEARVALUE };
        case signInSignUpActionTypes.USER_LOGIN_SUCCESS:
            return { ...state, waitingForData: false, signInError: CLEARVALUE };
        case signInSignUpActionTypes.USER_LOGIN_FAILURE:
            return { ...state, waitingForData: false, signInError: action.payload.message };
        case signInSignUpActionTypes.CLEAR_SIGN_IN_ERROR:
            return { ...state, signInError: CLEARVALUE };
        case signInSignUpActionTypes.SIGN_UP_VIEW_SELECTED:
            return { ...state, signInViewHidden: true, signUpViewHidden: false };
        case signInSignUpActionTypes.SIGN_UP_START:
            return { ...state, waitingForData: true };
        case signInSignUpActionTypes.SIGN_UP_SUCCESS:
            return { ...state, waitingForData: false, signUpError: CLEARVALUE, showUserMessage: action.payload.message };
        case signInSignUpActionTypes.SIGN_UP_FAILURE:
            return { ...state, waitingForData: false, showUserMessage: CLEARVALUE, signUpError: action.payload.message };
        case signInSignUpActionTypes.CLEAR_SIGN_UP_ERROR:
            return { ...state, signUpError: CLEARVALUE };
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_START:
            return { ...state, waitingForData: true };
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS:
            return { ...state, waitingForData: false, forgotPasswordError: CLEARVALUE, showUserMessage: action.payload.message };
        case signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE:
            return { ...state, waitingForData: false, forgotPasswordError: action.payload.message };
        default:
            return state;
    }
}

export default signInSignUpReducer;

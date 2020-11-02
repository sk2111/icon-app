import { signInSignUpActionTypes } from './sign-in-sign-up.type';


const INITIALSTATE = {
    signInViewHidden: false,
    signUpViewHidden: true,
    forgotPasswordViewHidden: true,
    waitingForData:false
};


const signInSignUpReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case signInSignUpActionTypes.SIGN_IN_VIEW_SELECTED:
            return { ...state, signInViewHidden: false, signUpViewHidden: true };
        case signInSignUpActionTypes.SIGN_UP_VIEW_SELECTED:
            return { ...state, signInViewHidden: true, signUpViewHidden: false };
        case signInSignUpActionTypes.USER_LOGIN_VIEW_SELECTED:
            return { ...state, forgotPasswordViewHidden: true }
        case signInSignUpActionTypes.FORGOT_PASSWORD_VIEW_SELECTED:
            return { ...state, forgotPasswordViewHidden: false }
        case signInSignUpActionTypes.SET_LOADING_STATUS_FOR_SIGNIN_SIGNUP:
            return {...state,waitingForData:action.payload.fetching}
        default:
            return state;
    }
}

export default signInSignUpReducer;

import { signInSignUpActionTypes } from './sign-in-sign-up.type';


const INITIALSTATE = {
    signInViewHidden: false,
    signUpViewHidden: true
};


const signInSignUpReducer = (state = INITIALSTATE, action) => {
    switch (action.type) {
        case signInSignUpActionTypes.SIGN_IN_VIEW_SELECTED:
            return { ...state, signInViewHidden: false, signUpViewHidden: true };
        case signInSignUpActionTypes.SIGN_UP_VIEW_SELECTED:
            return { ...state, signInViewHidden: true, signUpViewHidden: false };
        default:
            return state;
    }
}

export default signInSignUpReducer;

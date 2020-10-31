import { signInSignUpActionTypes } from './sign-in-sign-up.type';

export const changeViewToSignIn = () => {
    return {
        type: signInSignUpActionTypes.SIGN_IN_VIEW_SELECTED
    }
}
export const changeViewToSignUp = () => {
    return {
        type: signInSignUpActionTypes.SIGN_UP_VIEW_SELECTED
    }
}
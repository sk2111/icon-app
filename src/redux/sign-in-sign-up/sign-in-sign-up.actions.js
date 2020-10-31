import signInSignUpActionTypes from './sign-in-sign-up.type';

export const changeViewToSignIn = () => {
    return {
        type: signInSignUpActionTypes.signInViewSelected
    }
}
export const ChangeViewToSignUp = () => {
    return {
        type: signInSignUpActionTypes.signUpViewSelected
    }
}
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

export const changeViewToUserLogin = () => {
    return {
        type: signInSignUpActionTypes.USER_LOGIN_VIEW_SELECTED
    }
}

export const changeViewToForgotPassword = () => {
    return {
        type: signInSignUpActionTypes.FORGOT_PASSWORD_VIEW_SELECTED
    }
}

export const userSignUpStart = (userSignUpInfo) => {
    return {
        type: signInSignUpActionTypes.SIGN_UP_START,
        payload: userSignUpInfo
    }
}

export const setLoadingStatusForSignInSignUp = (payload) => {
    return {
        type: signInSignUpActionTypes.SET_LOADING_STATUS_FOR_SIGNIN_SIGNUP,
        payload
    }
}

export const userLoginStart = (payload) => {
    return {
        type: signInSignUpActionTypes.USER_LOGIN_START,
        payload
    }
}
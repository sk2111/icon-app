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
export const userSignUpSuccess = (payload) => {
    return {
        type: signInSignUpActionTypes.SIGN_UP_SUCCESS,
        payload
    }
}
export const userSignUpFailure = (payload) => {
    return {
        type: signInSignUpActionTypes.SIGN_UP_FAILURE,
        payload
    }
}
export const clearSignUpError = () => {
    return {
        type: signInSignUpActionTypes.CLEAR_SIGN_UP_ERROR
    }
}

export const userLoginStart = (payload) => {
    return {
        type: signInSignUpActionTypes.USER_LOGIN_START,
        payload
    }
}

export const sendResetLink = (payload) => {
    return {
        type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK,
        payload
    }
}
export const setLoadingStatusForSignInSignUp = (payload) => {
    return {
        type: signInSignUpActionTypes.SET_LOADING_STATUS_FOR_SIGNIN_SIGNUP,
        payload
    }
}
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
export const clearForgotPasswordError = () => {
    return {
        type: signInSignUpActionTypes.CLEAR_FORGOT_PASSWORD_ERROR
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
export const userLoginSucess = (payload) => {
    return {
        type: signInSignUpActionTypes.USER_LOGIN_SUCCESS,
        payload
    }
}
export const userLoginFailure = (payload) => {
    return {
        type: signInSignUpActionTypes.USER_LOGIN_FAILURE,
        payload
    }
}
export const clearSignInError = () => {
    return {
        type: signInSignUpActionTypes.CLEAR_SIGN_IN_ERROR
    }
}
export const sendResetLinkStart = (payload) => {
    return {
        type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_START,
        payload
    }
}
export const sendResetLinkSuccess = (payload) => {
    return {
        type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_SUCCESS,
        payload
    }
}
export const sendResetLinkFailure = (payload) => {
    return {
        type: signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_FAILURE,
        payload
    }
}
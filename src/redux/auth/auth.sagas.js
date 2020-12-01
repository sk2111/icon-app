//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
import history from '../../utilities/history';
//firebase
import { auth, firebaseIns, createUserProfileInFirestore, readUserProfileFromFireStore } from '../../firebase/firebase.utils';
//actions types
import { authActionTypes } from './auth.type';
import {
    userSignUpSuccess, userSignUpFailure, userLoginFailure, userLoginSucess,
    sendResetLinkSuccess, sendResetLinkFailure, updateNewPasswordSuccess, updateNewPasswordFailure
} from './auth.actions';
//Route constants
import { AUTH_PATH, SIGN_IN_PAGE_PATH } from '../../utilities/route.paths';
import { isValidMail } from '../../utilities/validator.utils';
//constants
import {
    SIGN_UP_SUCCESS_MESSAGE, SIGN_UP_INVALID_ERROR_MAIL_MESSAGE, RESET_LINK_SUCCESS_MESSAGE,
    USER_LOGIN_PROFILE_ERROR_MESSAGE, USER_LOGIN_VERIFY_ERROR_MESSAGE,
    CURRENT_PASSWORD_NOT_MATCH_MESSAGE, UPDATE_PASSWORD_SUCCESS_MESSAGE
} from '../../utilities/auth.messages';


// Sign up user saga
export function* signUpUser({ payload: { email, password, firstname, lastname } }) {
    try {
        if (!isValidMail(email)) {
            throw new Error(SIGN_UP_INVALID_ERROR_MAIL_MESSAGE);
        }
        const { additionalUserInfo, user } = yield auth.createUserWithEmailAndPassword(email, password);
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield call(createUserProfileInFirestore, { uid, email, firstname, lastname });
            yield user.sendEmailVerification();
            yield put(userSignUpSuccess(SIGN_UP_SUCCESS_MESSAGE));
            history.push(AUTH_PATH + SIGN_IN_PAGE_PATH);
        }
    }
    catch (e) {
        console.log(e);
        yield put(userSignUpFailure(`${e.message}`));
    }
};
export function* onUserSignUpStart() {
    yield takeLatest(authActionTypes.SIGN_UP_START, signUpUser);
};

// Login user
export function* loginInUser({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        if (user.emailVerified) {
            const userData = yield call(readUserProfileFromFireStore, user.uid);
            if (userData) {
                yield put(userLoginSucess(userData));
                return;
            }
            yield put(userLoginFailure(USER_LOGIN_PROFILE_ERROR_MESSAGE));
            return;
        }
        yield put(userLoginFailure(USER_LOGIN_VERIFY_ERROR_MESSAGE));
    }
    catch (e) {
        console.log(e);
        yield put(userLoginFailure(`${e.message}`));
    }
};

export function* onUserLoginStart() {
    yield takeLatest(authActionTypes.USER_LOGIN_START, loginInUser);
};

// send reset Link
export function* sendResetLink({ payload: { email } }) {
    try {
        yield auth.sendPasswordResetEmail(email);
        yield put(sendResetLinkSuccess(RESET_LINK_SUCCESS_MESSAGE));
        history.push(AUTH_PATH + SIGN_IN_PAGE_PATH);
    }
    catch (e) {
        console.log(e);
        yield put(sendResetLinkFailure(`${e.message}`));
    }
};
export function* onSendRestLinkStart() {
    yield takeLatest(authActionTypes.SEND_PASSWORD_RESET_LINK_START, sendResetLink);
};

//update current user password saga
export function* updateUserPassword({ payload: { currentPassword, newPassword } }) {
    try {
        const currentUser = firebaseIns.auth().currentUser;
        const credential = firebaseIns.auth.EmailAuthProvider.credential(
            currentUser.email,
            currentPassword
        );
        yield currentUser.reauthenticateWithCredential(credential);
        yield currentUser.updatePassword(newPassword);
        yield put(updateNewPasswordSuccess(UPDATE_PASSWORD_SUCCESS_MESSAGE));
    }
    catch (e) {
        console.log("update password failed", e);
        const errorMessage = e?.code === 'auth/wrong-password' ? CURRENT_PASSWORD_NOT_MATCH_MESSAGE : e?.message;
        yield put(updateNewPasswordFailure(errorMessage));
    }
};
export function* onUpdateUserPasswordStart() {
    yield takeLatest(authActionTypes.UPDATE_NEW_PASSWORD_START, updateUserPassword);
};

// Group all sagas
export function* authSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onUserLoginStart),
        call(onSendRestLinkStart),
        call(onUpdateUserPasswordStart)
    ])
}
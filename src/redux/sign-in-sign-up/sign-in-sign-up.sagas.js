//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
//firebase
import { auth, createUserProfileInFirestore, readUserProfileFromFireStore } from '../../firebase/firebase.utils';
//actions types
import { signInSignUpActionTypes } from './sign-in-sign-up.type';
import { changeViewToSignIn, changeViewToUserLogin, setLoadingStatusForSignInSignUp, userSignUpSuccess, userSignUpFailure } from './sign-in-sign-up.actions';
import { showSuccessToastMessage, showFailureToastMessage } from '../toast-message/toast-message.actions';
import { signInSuccess } from '../user/user.actions';

// Sign up user saga
export function* signUpUser({ payload: { email, password, firstname, lastname } }) {
    try {
        const authData = yield auth.createUserWithEmailAndPassword(email, password);
        const { additionalUserInfo, user } = authData;
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield call(createUserProfileInFirestore, { uid, email, firstname, lastname });
            yield user.sendEmailVerification();
            yield put(showSuccessToastMessage({ message: 'Sign up completed . Verify your email address and Sign In', timeInSeconds: '6' }));
            yield put(changeViewToSignIn());
        }
    }
    catch (e) {
        console.log(e);
        yield put(userSignUpFailure({ message: `${e.message}` }));
    }
    yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
};
export function* onUserSignUpStart() {
    yield takeLatest(signInSignUpActionTypes.SIGN_UP_START, signUpUser);
};

// Login user
export function* loginInUser({ payload: { email, password } }) {
    try {
        const authData = yield auth.signInWithEmailAndPassword(email, password);
        const { user } = authData;
        if (user.emailVerified) {
            const returnData = yield call(readUserProfileFromFireStore, user.uid);
            yield put(signInSuccess(returnData));
            yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
            return;
        }
        yield put(showFailureToastMessage({ message: `Signin failed.Please verify your Email before login`, timeInSeconds: '6' }));
    }
    catch (e) {
        console.log(e);
        yield put(showFailureToastMessage({ message: `${e.message}`, timeInSeconds: '6' }));
    }
    yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
};
export function* onUserLoginStart() {
    yield takeLatest(signInSignUpActionTypes.USER_LOGIN_START, loginInUser);
};

// send reset Link
export function* sendResetLink({ payload: { email } }) {
    try {
        yield auth.sendPasswordResetEmail(email)
        yield put(showSuccessToastMessage({ message: `Reset Password link sent to your soliton mail`, timeInSeconds: '6' }));
        yield put(changeViewToUserLogin());
    }
    catch (e) {
        console.log(e);
        yield put(showFailureToastMessage({ message: `${e.message}`, timeInSeconds: '6' }));
    }
    yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
};
export function* sendRestLinkStart() {
    yield takeLatest(signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK, sendResetLink);
};

// Group all sagas
export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onUserLoginStart),
        call(sendRestLinkStart)
    ])
}
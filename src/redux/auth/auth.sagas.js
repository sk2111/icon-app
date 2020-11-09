//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
import history from '../../utilities/history';
//firebase
import { auth, createUserProfileInFirestore, readUserProfileFromFireStore } from '../../firebase/firebase.utils';
//actions types
import { authActionTypes } from './auth.type';
import { userSignUpSuccess, userSignUpFailure, userLoginFailure, userLoginSucess, sendResetLinkSuccess, sendResetLinkFailure } from './auth.actions';
//Route constants
import { BASE_PATH, SIGN_IN_PAGE_PATH } from '../../utilities/route.paths';

// Sign up user saga
export function* signUpUser({ payload: { email, password, firstname, lastname } }) {
    try {
        const { additionalUserInfo, user } = yield auth.createUserWithEmailAndPassword(email, password);
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield call(createUserProfileInFirestore, { uid, email, firstname, lastname });
            yield user.sendEmailVerification();
            yield put(userSignUpSuccess('Signup success.Please verify your mail to signIn'));
            history.push(BASE_PATH + SIGN_IN_PAGE_PATH);
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
            const returnData = yield call(readUserProfileFromFireStore, user.uid);
            if (returnData) {
                // TODO : Check how this line behaves
                yield put(userLoginSucess(returnData));
                return;
            }
            yield put(userLoginFailure('User Profile not found'));
            return;
        }
        yield put(userLoginFailure('Please verify your Soliton mail ID before login'));
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
        yield put(sendResetLinkSuccess('Password reset link successfully sent to your mail'));
        history.push(BASE_PATH + SIGN_IN_PAGE_PATH);
    }
    catch (e) {
        console.log(e);
        yield put(sendResetLinkFailure(`${e.message}`));
    }
};
export function* onSendRestLinkStart() {
    yield takeLatest(authActionTypes.SEND_PASSWORD_RESET_LINK_START, sendResetLink);
};

// Group all sagas
export function* authSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onUserLoginStart),
        call(onSendRestLinkStart)
    ])
}
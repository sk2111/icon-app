//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
//firebase
import { auth, createUserProfileInFirestore, readUserProfileFromFireStore } from '../../firebase/firebase.utils';
//actions types
import { signInSignUpActionTypes } from './sign-in-sign-up.type';
import {
    changeViewToSignIn, changeViewToUserLogin, userSignUpSuccess, userSignUpFailure,
    userLoginFailure, userLoginSucess, sendResetLinkSuccess, sendResetLinkFailure
} from './sign-in-sign-up.actions';

// Sign up user saga
export function* signUpUser({ payload: { email, password, firstname, lastname } }) {
    try {
        const authData = yield auth.createUserWithEmailAndPassword(email, password);
        const { additionalUserInfo, user } = authData;
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield call(createUserProfileInFirestore, { uid, email, firstname, lastname });
            yield user.sendEmailVerification();
            yield put(userSignUpSuccess({ message: 'Signup success.Please verify your mail to signIn' }));
            yield put(changeViewToSignIn());
        }
    }
    catch (e) {
        console.log(e);
        yield put(userSignUpFailure({ message: `${e.message}` }));
    }
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
            if (returnData) {
                yield put(userLoginSucess(returnData));
                return;
            }
            yield put(userLoginFailure({ message: `User Profile not found` }));
            return;
        }
        yield put(userLoginFailure({ message: `Please verify your Soliton mail ID before login` }));
    }
    catch (e) {
        console.log(e);
        yield put(userLoginFailure({ message: `${e.message}` }));
    }
};

export function* onUserLoginStart() {
    yield takeLatest(signInSignUpActionTypes.USER_LOGIN_START, loginInUser);
};

// send reset Link
export function* sendResetLink({ payload: { email } }) {
    try {
        yield auth.sendPasswordResetEmail(email)
        yield put(sendResetLinkSuccess({ message: 'Password reset link successfully sent to your mail' }))
        yield put(changeViewToUserLogin());
    }
    catch (e) {
        console.log(e);
        yield put(sendResetLinkFailure({ message: `${e.message}` }));
    }
};
export function* sendRestLinkStart() {
    yield takeLatest(signInSignUpActionTypes.SEND_PASSWORD_RESET_LINK_START, sendResetLink);
};

// Group all sagas
export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onUserLoginStart),
        call(sendRestLinkStart)
    ])
}
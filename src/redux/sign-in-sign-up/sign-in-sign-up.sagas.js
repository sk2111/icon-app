//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
//firebase
import { auth, createUserProfileInFirestore } from '../../firebase/firebase.utils';
//actions types
import { signInSignUpActionTypes } from './sign-in-sign-up.type';
import { changeViewToSignIn, setLoadingStatusForSignInSignUp } from './sign-in-sign-up.actions';
import { showSuccessToastMessage, showFailureToastMessage } from '../toast-message/toast-message.actions';


export function* signUpUser({ payload: { email, password, name } }) {
    try {
        const authData = yield auth.createUserWithEmailAndPassword(email, password);
        const { additionalUserInfo, user } = authData;
        const { uid } = user;
        if (additionalUserInfo.isNewUser) {
            yield user.sendEmailVerification();
            yield put(showSuccessToastMessage({ message: 'Sign up completed . Verify your email address and Sign In', timeInSeconds: '6' }));
            yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
            yield put(changeViewToSignIn());
            yield call(createUserProfileInFirestore, { uid, email, name });
        }
    }
    catch (e) {
        console.log(e);
        yield put(showFailureToastMessage({ message: `Sign up failed ${e.message}`, timeInSeconds: '6' }));
        yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
    }
}


export function* onUserSignUpStart() {
    yield takeLatest(signInSignUpActionTypes.SIGN_UP_START, signUpUser);
}

export function* loginInUser({ payload: { email, password } }) {
    try {
        const authData = yield auth.signInWithEmailAndPassword(email, password);
        const { user } = authData;
        if (user.emailVerified) {
            //TODO:Read doc from firestore and store in root user reducer uid and data
            console.log("SignIn success");
            return;
        }
        yield put(showFailureToastMessage({ message: `Signin failed.Please verify your Email before login`, timeInSeconds: '6' }));
        yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
    }
    catch (e) {
        console.log(e);
        yield put(showFailureToastMessage({ message: `Signin failed ${e.message}`, timeInSeconds: '6' }));
        yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
    }
}

export function* onUserLoginStart() {
    yield takeLatest(signInSignUpActionTypes.USER_LOGIN_START, loginInUser);
}
export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart),
        call(onUserLoginStart)
    ])
}
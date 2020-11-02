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
    yield takeLatest(signInSignUpActionTypes.SIGN_UP_START, signUpUser)
}

export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart)
    ])
}
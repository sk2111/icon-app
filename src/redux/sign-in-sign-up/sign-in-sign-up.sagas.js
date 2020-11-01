//libs
import { takeLatest, put, all, call } from 'redux-saga/effects';
//actions types
import { signInSignUpActionTypes } from './sign-in-sign-up.type';



export function* signUpUser(payloadData) {
    yield console.log(payloadData);
}


export function* onUserSignUpStart() {
    yield takeLatest(signInSignUpActionTypes.SIGN_UP_START, signUpUser)
}

export function* signInSignUpSagas() {
    yield all([
        call(onUserSignUpStart)
    ])
}
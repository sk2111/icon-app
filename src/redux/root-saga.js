import { all, call } from 'redux-saga/effects';
import { signInSignUpSagas } from './sign-in-sign-up/sign-in-sign-up.sagas';


export default function* rootSaga() {
    yield all([
        call(signInSignUpSagas),
    ]);
}

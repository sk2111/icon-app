import { all, call } from 'redux-saga/effects';
import { authSagas } from './authSagas/authSagas.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(authSagas),
        call(userSagas),
    ]);
}

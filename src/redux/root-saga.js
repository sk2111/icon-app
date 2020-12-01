import { all, call } from 'redux-saga/effects';
import { authSagas } from './auth/auth.sagas';
import { userSagas } from './user/user.sagas';
import { generalIconsSaga } from './general-icons/general-icons.sagas';

export default function* rootSaga() {
    yield all([
        call(authSagas),
        call(userSagas),
        call(generalIconsSaga),
    ]);
}

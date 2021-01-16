import { all, call } from 'redux-saga/effects';
import { authSagas } from './auth/auth.sagas';
import { userSagas } from './user/user.sagas';
import { commonIconsSaga } from './common-icons/common-icons.sagas';
import { projectIconsSaga } from './project-icons/project-icons.sagas';
import { favoriteIconsSagas } from './favorite-icons/favorite-icons.sagas';
import { uploadIconsSaga } from './upload-icons/upload-icons.sagas';
import { editIconSagas } from './edit-icon/edit-icon.sagas';

export default function* rootSaga() {
    yield all([
        call(authSagas),
        call(userSagas),
        call(commonIconsSaga),
        call(uploadIconsSaga),
        call(projectIconsSaga),
        call(favoriteIconsSagas),
        call(editIconSagas),
    ]);
}

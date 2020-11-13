import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore } from '../../firebase/firebase.utils';

//actions
import { userAuthSuccess, userPersistanceCheckCompleted } from './user.actions';

//persistance check sagas
function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const returnData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(userAuthSuccess(returnData));
    }
    yield delay(1000);
    yield put(userPersistanceCheckCompleted());
};

function* onCheckUserPersistanceStart() {
    yield takeLatest(userActionTypes.CHECK_USER_PERSISTANCE, checkUserAuthPersist);
};

export function* userSagas() {
    yield all([
        call(onCheckUserPersistanceStart)
    ])
};
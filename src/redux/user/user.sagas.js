import { takeLatest, all, call, put } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore } from '../../firebase/firebase.utils';

//actions
import {userAuthSuccess} from './user.actions';

function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const returnData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(userAuthSuccess(returnData));
        return;
    }
};

function* onCheckUserPersistanceStart() {
    yield takeLatest(userActionTypes.CHECK_USER_PERSISTANCE, checkUserAuthPersist);
};

export function* userSagas() {
    yield all([
        call(onCheckUserPersistanceStart)
    ])
};
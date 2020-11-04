import { takeLatest, all, call, put } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { signInSuccess } from './user.actions';
import { getCurrentUser, readUserProfileFromFireStore } from '../../firebase/firebase.utils';

function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const returnData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(signInSuccess(returnData));
        // TODO : WE need to wait to render SIGN IN page until we complete persistance check 
        //to give more good UI feel rather than showing SIGN IN and going to home 
        // yield put(setLoadingStatusForSignInSignUp({ fetching: false }));
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
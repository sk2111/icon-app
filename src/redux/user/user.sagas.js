import { takeLatest, all, call, put } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore } from '../../firebase/firebase.utils';

//actions
import {userLoginSucess} from '../auth/auth.actions';

function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const returnData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(userLoginSucess(returnData));
        // TODO : WE need to wait to render SIGN IN page until we complete persistance check 
        //We can move this code to authorizaation saga as it makes more sense
        //to give more good UI feel rather than showing SIGN IN and going to home 
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
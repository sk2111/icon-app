import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore, auth } from '../../firebase/firebase.utils';

//actions
import { userAuthSuccess, userPersistanceCheckCompleted, userSignOutFailure, userSignOutSuccess } from './user.actions';
//constants
import { SIGN_OUT_SUCCESS_MESSAGE, SIGN_OUT_FAILURE_MESSAGE } from '../../utilities/auth.messages';

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

// user sign out sagas
function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(userSignOutSuccess(SIGN_OUT_SUCCESS_MESSAGE));
    }
    catch (e) {
        console.log("User signout failed", e);
        yield put(userSignOutFailure(SIGN_OUT_FAILURE_MESSAGE));
    }
};

function* onUserSignOutStart() {
    yield takeLatest(userActionTypes.USER_SIGN_OUT_START, signOutUser);
};

export function* userSagas() {
    yield all([
        call(onCheckUserPersistanceStart),
        call(onUserSignOutStart)
    ]);
};
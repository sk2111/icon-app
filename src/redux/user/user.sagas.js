import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore, getUserAccessRoleFromFireStore, auth } from '../../firebase/firebase.utils';
//history
import history from '../../utilities/history';
//route constants 
import { AUTH_PATH, SIGN_OUT_PAGE_PATH } from '../../utilities/route.paths';
//actions
import {
    userPersistanceCheckCompleted, userSignOutFailure, getCurrentUserInfoStart, getCurrentUserInfoSuccess,
    getCurrentUserInfoFailure
} from './user.actions';
//constants
import { SIGN_OUT_FAILURE_MESSAGE } from '../../utilities/auth.messages';
import { LOADING_PERSISTANT_CHECK_TIME } from '../../utilities/app.constants';
//helper functions
import { frameCurrentUserObject } from '../../utilities/helper.functions';


// current user auth object stroring in redux store 
function* storeAndFetchCurrentUserDetails({ payload: { ...currentUserData } }) {
    try {
        // read is admin details from firestore and store in redux
        const currentUserDataToStore = yield call(frameCurrentUserObject, currentUserData);
        const userRoleType = yield call(getUserAccessRoleFromFireStore, currentUserData.uid);
        currentUserDataToStore.isAdmin = !!userRoleType?.isAdmin;
        yield put(getCurrentUserInfoSuccess(currentUserDataToStore));
    }
    catch (e) {
        yield put(getCurrentUserInfoFailure(e?.message));
    }
}

function* onStoreAndFetchCurrentUserDetails() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_START, storeAndFetchCurrentUserDetails);
}

//persistance check sagas
function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const currentUserData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(getCurrentUserInfoStart(currentUserData));
    }
    yield delay(LOADING_PERSISTANT_CHECK_TIME);
    yield put(userPersistanceCheckCompleted());
};

function* onUserPersistanceStart() {
    yield takeLatest(userActionTypes.CHECK_USER_PERSISTANCE_START, checkUserAuthPersist);
};

// user sign out sagas
function* signOutUser() {
    try {
        history.replace(AUTH_PATH + SIGN_OUT_PAGE_PATH);
        yield auth.signOut();
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
        call(onUserPersistanceStart),
        call(onStoreAndFetchCurrentUserDetails),
        call(onUserSignOutStart)
    ]);
};


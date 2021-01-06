import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { getCurrentUser, readUserProfileFromFireStore, getUserAccessRoleFromFireStore, auth } from '../../firebase/firebase.utils';
//history
import history from '../../utilities/history';
//route constants 
import { SIGN_OUT_ROUTE_PATH } from '../../utilities/route.paths';
//action types
import { userActionTypes } from './user.type';
import { authActionTypes } from '../auth/auth.type';
//actions
import {
    userPersistanceCheckCompleted, userSignOutFailure, getCurrentUserInfoStart, getCurrentUserInfoSuccess,
    getCurrentUserInfoFailure
} from './user.actions';
//constants
import { SIGN_OUT_FAILURE_MESSAGE } from '../../utilities/auth.messages';
import { LOADING_PERSISTANT_CHECK_TIME, USER_PROFILE } from '../../utilities/app.constants';
//helper functions
import { frameCurrentUserObject, frameFavoriteIconsMap } from '../../utilities/helper.functions';


const { USER_FAVORITES, USER_ADMIN, USER_FAVORITES_FETCH_STATUS } = USER_PROFILE;
// current user auth object stroring in redux store 
function* storeAndFetchCurrentUserDetails({ payload: { ...currentUserData } }) {
    try {
        // read is admin details from firestore and store in redux
        const currentUserDataToStore = yield call(frameCurrentUserObject, currentUserData);
        const userRoleType = yield call(getUserAccessRoleFromFireStore, currentUserData.uid);
        currentUserDataToStore[USER_ADMIN] = userRoleType ? userRoleType[USER_ADMIN] : false;
        currentUserDataToStore[USER_FAVORITES] = yield call(frameFavoriteIconsMap, currentUserDataToStore[USER_FAVORITES]);
        currentUserDataToStore[USER_FAVORITES_FETCH_STATUS] = !!Object.keys(currentUserDataToStore[USER_FAVORITES]).length;
        yield put(getCurrentUserInfoSuccess(currentUserDataToStore));
    }
    catch (e) {
        yield put(getCurrentUserInfoFailure(e?.message));
    }
}

function* onStoreAndFetchCurrentUserDetails() {
    yield takeLatest([
        userActionTypes.GET_CURRENT_USER_INFO_START,
        authActionTypes.USER_LOGIN_SUCCESS
    ], storeAndFetchCurrentUserDetails);
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
        history.replace(SIGN_OUT_ROUTE_PATH);
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


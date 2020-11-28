import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore, getUserAccessRoleFromFireStore, auth } from '../../firebase/firebase.utils';
//history
import history from '../../utilities/history';
//route constants 
import { AUTH_PATH, SIGN_OUT_PAGE_PATH } from '../../utilities/route.paths';
//actions
import {
    updateOrResetPasswordSuccess, updateOrResetPasswordFailure, userAuthSuccess,
    userPersistanceCheckCompleted, userSignOutFailure, userSignOutSuccess, getUserAccessRoleSucess,
    getUserAccessRoleFailure
} from './user.actions';
import { showSuccessToastMessage, showFailureToastMessage } from '../toast-message/toast-message.actions';
//constants
import {
    SIGN_OUT_SUCCESS_MESSAGE, SIGN_OUT_FAILURE_MESSAGE,
    UPDATE_OR_RESET_PASSWORD_SUCCESS_MESSAGE, UPDATE_OR_RESET_PASSWORD_FAILURE_MESSAGE
} from '../../utilities/auth.messages';
import { LOADING_PERSISTANT_CHECK_TIME } from '../../utilities/app.constants';
//helper functions
import { frameCurrentUserObject } from '../../utilities/helper.functions';



//persistance check sagas
function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const currentUserData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(userAuthSuccess(frameCurrentUserObject(currentUserData)));
    }
    yield delay(LOADING_PERSISTANT_CHECK_TIME);
    yield put(userPersistanceCheckCompleted());
};

function* onUserPersistanceStart() {
    yield takeLatest(userActionTypes.CHECK_USER_PERSISTANCE_START, checkUserAuthPersist);
};

// get user access role sagas
function* getUserAccessRole(data) {
    try {
        const userRoleData = yield getUserAccessRoleFromFireStore(data);
        if (userRoleData?.isAdmin) {
            yield put(getUserAccessRoleSucess(!!userRoleData?.isAdmin));
        }
    }
    catch (e) {
        console.log("Reading profile admin profile failed", e);
        yield put(getUserAccessRoleFailure(e?.message));
    }
};

function* onGetUserAccessRoleStart() {
    yield takeLatest(userActionTypes.USER_AUTH_SUCCESS, getUserAccessRole);
};

//update or reset password sagas
function* updateOrResetPassword({ payload: { email } }) {
    try {
        yield auth.sendPasswordResetEmail(email);
        yield put(updateOrResetPasswordSuccess(UPDATE_OR_RESET_PASSWORD_SUCCESS_MESSAGE));
        yield put(showSuccessToastMessage({ message: UPDATE_OR_RESET_PASSWORD_SUCCESS_MESSAGE, timeInSeconds: 6 }));
    }
    catch (e) {
        console.log(e);
        yield put(updateOrResetPasswordFailure(UPDATE_OR_RESET_PASSWORD_FAILURE_MESSAGE));
        yield put(showFailureToastMessage({ message: UPDATE_OR_RESET_PASSWORD_FAILURE_MESSAGE, timeInSeconds: 6 }));
    }
};

function* onUpdateOrResetPasswordStart() {
    yield takeLatest(userActionTypes.UPDATE_OR_RESET_PASSWORD_START, updateOrResetPassword);
};

// user sign out sagas
function* signOutUser() {
    try {
        history.replace(AUTH_PATH + SIGN_OUT_PAGE_PATH);
        yield auth.signOut();
        // yield put(userSignOutSuccess(SIGN_OUT_SUCCESS_MESSAGE));
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
        call(onGetUserAccessRoleStart),
        call(onUpdateOrResetPasswordStart),
        call(onUserSignOutStart)
    ]);
};


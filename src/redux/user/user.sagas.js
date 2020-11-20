import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { userActionTypes } from './user.type';
import { getCurrentUser, readUserProfileFromFireStore, auth } from '../../firebase/firebase.utils';

//actions
import {
    updateOrResetPasswordSuccess, updateOrResetPasswordFailure, userAuthSuccess,
    userPersistanceCheckCompleted, userSignOutFailure, userSignOutSuccess
} from './user.actions';

//constants
import {
    SIGN_OUT_SUCCESS_MESSAGE, SIGN_OUT_FAILURE_MESSAGE,
    UPDATE_OR_RESET_PASSWORD_SUCCESS_MESSAGE, UPDATE_OR_RESET_PASSWORD_FAILURE_MESSAGE
} from '../../utilities/auth.messages';

import { LOADING_PERSISTANT_CHECK_TIME } from '../../utilities/app.constants';

//persistance check sagas
function* checkUserAuthPersist() {
    const userData = yield call(getCurrentUser);
    if (userData?.emailVerified) {
        const returnData = yield call(readUserProfileFromFireStore, userData.uid);
        yield put(userAuthSuccess(returnData));
    }
    yield delay(LOADING_PERSISTANT_CHECK_TIME);
    yield put(userPersistanceCheckCompleted());
};

function* onCheckUserPersistanceStart() {
    yield takeLatest(userActionTypes.CHECK_USER_PERSISTANCE, checkUserAuthPersist);
};

//update or reset password sagas
function* updateOrResetPassword({ payload: { email } }) {
    try {
        yield auth.sendPasswordResetEmail(email);
        yield put(updateOrResetPasswordSuccess(UPDATE_OR_RESET_PASSWORD_SUCCESS_MESSAGE));
    }
    catch (e) {
        console.log(e);
        yield put(updateOrResetPasswordFailure(UPDATE_OR_RESET_PASSWORD_FAILURE_MESSAGE));
    }
};

function* onUpdateOrResetPasswordStart() {
    yield takeLatest(userActionTypes.UPDATE_OR_RESET_PASSWORD_START, updateOrResetPassword);
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
        call(onUpdateOrResetPasswordStart),
        call(onUserSignOutStart)
    ]);
};


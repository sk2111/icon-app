//libs
import { takeLatest, put, call, all, delay } from 'redux-saga/effects';
//firesbase
import { getUiDisplayDataFromFireStore } from '../../firebase/firebase.utils';
import { ALL_ICONS_USER_OPTIONS_DATA_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
//actions
import {
    fetchCommonIconsUserOptionsStart
} from './common-icons.actions';


//Get common icons search keyowrd and category saga
function* getSearchKeywordAndCategoryList() {
    const userOptions = yield call(getUiDisplayDataFromFireStore, ALL_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        console.log(" Hai i am user options", userOptions);
    }

};
function* onGetSearchKeywordAndCategoryList() {
    yield takeLatest(commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START, getSearchKeywordAndCategoryList);
};

// on user auth completion success trigger fetch actions for common icons
export function* triggerInitialDataFetchActions() {
    yield put(fetchCommonIconsUserOptionsStart());
};
export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, triggerInitialDataFetchActions);
};
//Group all sagas
export function* commonIconsSaga() {
    yield all([
        call(onGetSearchKeywordAndCategoryList),
        call(onCurrentUserInfoFetchSuccess)
    ]);
};
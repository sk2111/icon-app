//libs
import { takeLatest, put, call, all } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore } from '../../firebase/firebase.utils';
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
//actions
import {
    fetchCommonIconsUserOptionsStart,
    fetchCommonIconsUserOptionsSuccess,
    fetchCommonIconsUserOptionsFailure
} from './common-icons.actions';
//constants
import { FETCH_USER_OPTIONS_ERROR_MESSAGE } from './common-icons.messages';


//Get common icons search keyword and category options to select saga
function* fetchKeywordAndSelectOptions() {
    const userOptions = yield call(getDocDataFromFireStore, COMMON_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        const { searchKeywordsList, selectOptionsList } = userOptions;
        yield put(fetchCommonIconsUserOptionsSuccess({ searchKeywordsList, selectOptionsList }));
        return;
    }
    console.error("Failed to fetch user options - empty data received");
    yield put(fetchCommonIconsUserOptionsFailure({ message: FETCH_USER_OPTIONS_ERROR_MESSAGE }));

};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest(commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START, fetchKeywordAndSelectOptions);
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
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess)
    ]);
};
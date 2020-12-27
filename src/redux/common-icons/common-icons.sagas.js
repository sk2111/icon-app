//libs
import { takeLatest, put, call, all, select } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore } from '../../firebase/firebase.utils';
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchCommonIconsUserOptionsStart,
    fetchCommonIconsUserOptionsSuccess,
    fetchCommonIconsUserOptionsFailure,
    fetchCommonIconsFromDatabaseStart
} from './common-icons.actions';
//constants
import { SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE } from '../../utilities/app.constants';


//Get common icons search keyword and category options to select saga
function* fetchKeywordAndSelectOptions() {
    const userOptions = yield call(getDocDataFromFireStore, COMMON_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        const { searchKeywordsList, selectOptionsList } = userOptions;
        yield put(fetchCommonIconsUserOptionsSuccess({
            searchKeywordsList: searchKeywordsList.sort(),
            selectOptionsList: selectOptionsList.sort()
        }));
        return;
    }
    console.error("Failed to fetch user options - empty data received");
    yield put(fetchCommonIconsUserOptionsFailure({ message: SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE }));

};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest([
        commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START,
        uploadIconsActionTypes.ADD_NEW_CLASSIFICATION_SUCCESS
    ], fetchKeywordAndSelectOptions);
};

// get common icons from database 
function* fetchCommonIconsFromDatabase() {
    //get common search and seletc value from db
    yield
    // look inside pagination for the key

    // if no key exists 


    // if key exist
};

function* onFetchCommonIconsFromDatabase() {
    yield takeLatest(commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_START, fetchCommonIconsFromDatabase);
};

// on user auth completion success trigger fetch actions for common icons
export function* triggerInitialDataFetchActions() {
    yield put(fetchCommonIconsUserOptionsStart());
    yield put(fetchCommonIconsFromDatabaseStart());
};
export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, triggerInitialDataFetchActions);
};
//Group all sagas
export function* commonIconsSaga() {
    yield all([
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess),
        call(onFetchCommonIconsFromDatabase),
    ]);
};
//libs
import { takeLatest, put, call, all, select } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore, getDocListByPagination } from '../../firebase/firebase.utils';
import { COMMON_ICONS_USER_OPTIONS_DATA_PATH, COMMON_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchCommonIconsUserOptionsStart,
    fetchCommonIconsUserOptionsSuccess,
    fetchCommonIconsUserOptionsFailure,
    fetchCommonIconsFromDatabaseStart,
    fetchCommonIconsFromDatabaseFailure,
    fetchCommonIconsFromDatabaseSuccess,
    setCommonIconsPaginationMap
} from './common-icons.actions';
//selectors
import { selectCommonIcons } from './common-icons.selectors';
//constants
import { SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE, ICON_PROP, MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD } from '../../utilities/app.constants';
//helpers
import { framePaginateKey, frameIconObjFromDocObj } from '../../utilities/helper.functions';

//destructure ICON PROP
const { CREATED_AT } = ICON_PROP;

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
    try {
        const { paginationMap, searchValue, selectValue } = yield select(selectCommonIcons);
        const paginationKey = yield call(framePaginateKey, selectValue, searchValue);
        const existingPaginationMap = paginationMap[paginationKey];
        const { docList, isMoreDocsAvailable, newEndDocRef } = yield call(getDocListByPagination, {
            collectionPath: COMMON_ICONS_LIST_PATH,
            orderBy: [CREATED_AT, "desc"],
            listLimit: MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD,
            previousQueryEndDoc: existingPaginationMap ? existingPaginationMap.lastQueryEndRef : null
        });
        const iconsMap = yield call(frameIconObjFromDocObj, docList);
        yield put(fetchCommonIconsFromDatabaseSuccess(iconsMap));
        yield put(setCommonIconsPaginationMap({ key: paginationKey, isMoreIconsAvailable: isMoreDocsAvailable, lastQueryEndRef: newEndDocRef }));
    }
    catch (e) {
        console.log(e);
        yield put(fetchCommonIconsFromDatabaseFailure(e?.message));
    }

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
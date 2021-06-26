//libs
import { takeLatest, takeEvery, put, call, all, select, throttle } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore, getDocListByPagination, deleteDocById, updateDocPropInFirestore } from '../../firebase/firebase.utils';
import { USERS_COLLECTION_PATH, COMMON_ICONS_USER_OPTIONS_DATA_PATH, COMMON_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//action types
import { commonIconsActionsTypes } from './common-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchCommonIconsUserOptionsStart, fetchCommonIconsUserOptionsSuccess, fetchCommonIconsUserOptionsFailure,
    fetchCommonIconsFromDatabaseFailure, fetchCommonIconsFromDatabaseSuccess, setCommonIconsPaginationMap,
    deleteCommonIconFromDbSuccess, deleteCommonIconFromDbFailure, toggleCommonIconFavoriteModeSuccess,
    toggleCommonIconFavoriteModeFailure
} from './common-icons.actions';
import { updateCurrentUserFavoriteIcons } from '../user/user.actions';
//selectors
import { selectCommonIcons } from './common-icons.selectors';
import { selectUser } from '../user/user.selectors';
//constants
import {
    SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE, COMMON_ICON_DEFAULT_CATEGORY_VALUE, USER_PROFILE,
    MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD, FETCHING_ICONS_THROTTLE_TIME, COMMON_ICONS_HEADER_LABEL
} from '../../utilities/app.constants';
//helpers
import {
    getPaginateConfig, frameIconObjFromDocObj, framePaginationQueryParams,
    extractSimplifiedMapFromFavoritesMap, frameFavoriteIconsMap, checkIsAllIconsFetched
} from '../../utilities/helper.functions';

const { USER_FAVORITES, USER_FAVORITES_FETCH_STATUS } = USER_PROFILE;

// get common icons from database 
function* fetchCommonIconsFromDatabase() {
    try {
        const { paginationMap, searchValue, selectValue } = yield select(selectCommonIcons);
        const { currentUser: { [USER_FAVORITES]: favoriteIconsDocId } } = yield select(selectUser);
        const { paginateKey, existingPaginationMap, isMoreIconsAvailableToFetch } = yield call(getPaginateConfig, selectValue, searchValue, paginationMap);
        if ((!existingPaginationMap) || (existingPaginationMap && isMoreIconsAvailableToFetch)) {
            const { docList, isMoreDocsAvailable, newEndDocRef } = yield call(getDocListByPagination,
                framePaginationQueryParams(true, selectValue, searchValue, existingPaginationMap, COMMON_ICON_DEFAULT_CATEGORY_VALUE,
                    COMMON_ICONS_LIST_PATH, MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD));
            const { iconsMap } = yield call(frameIconObjFromDocObj, docList, favoriteIconsDocId);
            yield put(fetchCommonIconsFromDatabaseSuccess(iconsMap));
            yield put(setCommonIconsPaginationMap({
                key: paginateKey,
                isMoreIconsAvailableToFetch: isMoreDocsAvailable,
                lastQueryEndRef: newEndDocRef
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(fetchCommonIconsFromDatabaseFailure(e?.message));
    }

};

function* onFetchCommonIconsFromDatabase() {
    yield throttle(FETCHING_ICONS_THROTTLE_TIME, commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_START, fetchCommonIconsFromDatabase);
};

//favorite icons addition
function* addOrRemoveFavoritesFromUserMap({ payload: { id, value } }) {
    try {
        const { currentUser: { uid, [USER_FAVORITES]: favoriteFetchMap } } = yield select(selectUser);
        const pathToUpdate = USERS_COLLECTION_PATH + '/' + uid;
        const newFavoritesMapForUpload = yield call(extractSimplifiedMapFromFavoritesMap, favoriteFetchMap, { id, value }, COMMON_ICONS_HEADER_LABEL);
        yield call(updateDocPropInFirestore, pathToUpdate, { property: USER_FAVORITES, value: newFavoritesMapForUpload });
        yield put(toggleCommonIconFavoriteModeSuccess({ id, value }));
        const newFavoritesFetchMap = yield call(frameFavoriteIconsMap, newFavoritesMapForUpload, favoriteFetchMap);
        const isMoreFavIconsAvailableToFetch = yield call(checkIsAllIconsFetched, newFavoritesFetchMap);
        yield put(updateCurrentUserFavoriteIcons({ updatedFetchMap: { ...newFavoritesFetchMap }, isMoreFavIconsAvailableToFetch }));
    }
    catch (e) {
        console.log(e);
        yield put(toggleCommonIconFavoriteModeFailure({ id, value }));
    }
};

function* onFavoriteCommonIconSelection() {
    yield takeEvery(commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_START, addOrRemoveFavoritesFromUserMap);
}


// delete particular icon from db
function* deleteCommonIconFromDB({ payload: iconId }) {
    try {
        const { currentUser: { [USER_FAVORITES_FETCH_STATUS]: isMoreIconsAvailableToFetch, [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
        const { [iconId]: removeExistingIconFetchData, ...otherFavFetchMap } = fetchMap;
        yield call(deleteDocById, COMMON_ICONS_LIST_PATH, iconId);
        yield put(deleteCommonIconFromDbSuccess(iconId));
        if (removeExistingIconFetchData) {
            yield put(updateCurrentUserFavoriteIcons({
                updatedFetchMap: { ...otherFavFetchMap },
                isMoreFavIconsAvailableToFetch: isMoreIconsAvailableToFetch
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(deleteCommonIconFromDbFailure(e?.message));
    }
}

function* onDeleteCommonIconFromDB() {
    yield takeLatest(commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_START, deleteCommonIconFromDB);
}


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
    yield put(fetchCommonIconsUserOptionsFailure({ message: SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE }));
};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest(commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START, fetchKeywordAndSelectOptions);
};

// on user auth completion success trigger fetch actions for common icons
export function* fetchUserOptions() {
    yield put(fetchCommonIconsUserOptionsStart());
};

export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, fetchUserOptions);
};
// trigger observer for options fetch
export function* triggerUserOptionsFetchAction({ payload }) {
    if (payload === COMMON_ICONS_HEADER_LABEL) {
        yield put(fetchCommonIconsUserOptionsStart());
    }
};

export function* onTriggerUserOptionsFetch() {
    yield takeLatest(uploadIconsActionTypes.CLOSE_ADD_NEW_CLASSIFICATION_MODAL, triggerUserOptionsFetchAction);
};

//Group all sagas
export function* commonIconsSaga() {
    yield all([
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess),
        call(onFetchCommonIconsFromDatabase),
        call(onFavoriteCommonIconSelection),
        call(onDeleteCommonIconFromDB),
        call(onTriggerUserOptionsFetch),
    ]);
};
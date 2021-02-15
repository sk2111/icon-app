//libs
import { takeLatest, put, call, all, select, throttle } from 'redux-saga/effects';
//firesbase
import { getDocDataFromFireStore, getDocListByPagination, deleteDocById, updateDocPropInFirestore } from '../../firebase/firebase.utils';
import { USERS_COLLECTION_PATH, PROJECT_ICONS_USER_OPTIONS_DATA_PATH, PROJECT_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//action types
import { projectIconsActionTypes } from './project-icons.type';
import { userActionTypes } from '../user/user.type';
import { uploadIconsActionTypes } from '../upload-icons/upload-icons.type';
//actions
import {
    fetchProjectIconsUserOptionsStart, fetchProjectIconsUserOptionsSuccess, fetchProjectIconsUserOptionsFailure,
    fetchProjectIconsFromDatabaseFailure, fetchProjectIconsFromDatabaseSuccess, setProjectIconsPaginationMap,
    deleteProjectIconFromDbSuccess, deleteProjectIconFromDbFailure, toggleProjectIconFavoriteModeFailure,
    toggleProjectIconFavoriteModeSuccess
} from './project-icons.actions';
import { updateCurrentUserFavoriteIcons } from '../user/user.actions';
//selectors
import { selectProjectIcons } from './project-icons.selectors';
import { selectUser } from '../user/user.selectors';
//constants
import {
    SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE, PROJECT_ICON_DEFAULT_PROJECT_VALUE, USER_PROFILE,
    MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD, FETCHING_ICONS_THROTTLE_TIME, PROJECT_ICONS_HEADER_LABEL
} from '../../utilities/app.constants';
//helpers
import {
    getPaginateConfig, frameIconObjFromDocObj, framePaginationQueryParams,
    extractSimplifiedMapFromFavoritesMap, frameFavoriteIconsMap, checkIsAllIconsFetched
} from '../../utilities/helper.functions';

const { USER_FAVORITES, USER_FAVORITES_FETCH_STATUS } = USER_PROFILE;

// get project icons from database 
function* fetchProjectIconsFromDatabase() {
    try {
        const { paginationMap, projectIconsSearchValue, selectValue } = yield select(selectProjectIcons);
        const { currentUser: { [USER_FAVORITES]: favoriteIconsDocId } } = yield select(selectUser);
        const { paginateKey, existingPaginationMap, isMoreIconsAvailableToFetch } = yield call(getPaginateConfig, selectValue, projectIconsSearchValue, paginationMap);
        if ((!existingPaginationMap) || (existingPaginationMap && isMoreIconsAvailableToFetch)) {
            const { docList, isMoreDocsAvailable, newEndDocRef } = yield call(getDocListByPagination,
                framePaginationQueryParams(selectValue, projectIconsSearchValue, existingPaginationMap, PROJECT_ICON_DEFAULT_PROJECT_VALUE,
                    PROJECT_ICONS_LIST_PATH, MAXIMUM_NUMBER_OF_FILES_FOR_DOWNLOAD));
            const { iconsMap } = yield call(frameIconObjFromDocObj, docList, favoriteIconsDocId);
            yield put(fetchProjectIconsFromDatabaseSuccess(iconsMap));
            yield put(setProjectIconsPaginationMap({
                key: paginateKey,
                isMoreIconsAvailableToFetch: isMoreDocsAvailable,
                lastQueryEndRef: newEndDocRef
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(fetchProjectIconsFromDatabaseFailure(e?.message));
    }

};

function* onFetchProjectIconsFromDatabase() {
    yield throttle(FETCHING_ICONS_THROTTLE_TIME, projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_START, fetchProjectIconsFromDatabase);
};


//favorite icons addition
function* addOrRemoveFavoritesFromUserMap({ payload: { id, value } }) {
    try {
        const { currentUser: { uid, [USER_FAVORITES]: favoriteFetchMap } } = yield select(selectUser);
        const pathToUpdate = USERS_COLLECTION_PATH + '/' + uid;
        const newFavoritesMapForUpload = yield call(extractSimplifiedMapFromFavoritesMap, favoriteFetchMap, { id, value }, PROJECT_ICONS_HEADER_LABEL);
        yield call(updateDocPropInFirestore, pathToUpdate, { property: USER_FAVORITES, value: newFavoritesMapForUpload });
        yield put(toggleProjectIconFavoriteModeSuccess({ id, value }));
        const newFavoritesFetchMap = yield call(frameFavoriteIconsMap, newFavoritesMapForUpload, favoriteFetchMap);
        const isMoreFavIconsAvailableToFetch = yield call(checkIsAllIconsFetched, newFavoritesFetchMap);
        yield put(updateCurrentUserFavoriteIcons({ updatedFetchMap: { ...newFavoritesFetchMap }, isMoreFavIconsAvailableToFetch }));
    }
    catch (e) {
        console.log(e);
        yield put(toggleProjectIconFavoriteModeFailure({ id, value }));
    }
};

function* onFavoriteProjectIconSelection() {
    yield takeLatest(projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_START, addOrRemoveFavoritesFromUserMap);
}

// delete particular icon from db
function* deleteProjectIconFromDB({ payload: iconId }) {
    try {
        const { currentUser: { [USER_FAVORITES_FETCH_STATUS]: isMoreIconsAvailableToFetch, [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
        const { [iconId]: removeExistingIconFetchData, ...otherFavFetchMap } = fetchMap;
        yield call(deleteDocById, PROJECT_ICONS_LIST_PATH, iconId);
        yield put(deleteProjectIconFromDbSuccess(iconId));
        if (removeExistingIconFetchData) {
            yield put(updateCurrentUserFavoriteIcons({
                updatedFetchMap: { ...otherFavFetchMap },
                isMoreFavIconsAvailableToFetch: isMoreIconsAvailableToFetch
            }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(deleteProjectIconFromDbFailure(e?.message));
    }
}

function* onDeleteProjectIconFromDB() {
    yield takeLatest(projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_START, deleteProjectIconFromDB);
}

//Get project icons search keyword and category options
function* fetchKeywordAndSelectOptions() {
    const userOptions = yield call(getDocDataFromFireStore, PROJECT_ICONS_USER_OPTIONS_DATA_PATH);
    if (userOptions) {
        const { searchKeywordsList, selectOptionsList } = userOptions;
        yield put(fetchProjectIconsUserOptionsSuccess({
            searchKeywordsList: searchKeywordsList.sort(),
            selectOptionsList: selectOptionsList.sort()
        }));
        return;
    }
    yield put(fetchProjectIconsUserOptionsFailure({ message: SAGA_FETCH_USER_OPTIONS_ERROR_MESSAGE }));
};

function* onFetchKeywordAndSelectOptions() {
    yield takeLatest(projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_START, fetchKeywordAndSelectOptions);
};

// on user auth completion success trigger fetch actions for project icons
export function* fetchUserOptions() {
    yield put(fetchProjectIconsUserOptionsStart());
};

export function* onCurrentUserInfoFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, fetchUserOptions);
};
// trigger observer for options fetch
export function* triggerUserOptionsFetchAction({ payload }) {
    if (payload === PROJECT_ICONS_HEADER_LABEL) {
        yield put(fetchProjectIconsUserOptionsStart());
    }
};

export function* onTriggerUserOptionsFetch() {
    yield takeLatest(uploadIconsActionTypes.CLOSE_ADD_NEW_CLASSIFICATION_MODAL, triggerUserOptionsFetchAction);
};

//Group all sagas
export function* projectIconsSaga() {
    yield all([
        call(onFetchKeywordAndSelectOptions),
        call(onCurrentUserInfoFetchSuccess),
        call(onFetchProjectIconsFromDatabase),
        call(onFavoriteProjectIconSelection),
        call(onDeleteProjectIconFromDB),
        call(onTriggerUserOptionsFetch),
    ]);
};
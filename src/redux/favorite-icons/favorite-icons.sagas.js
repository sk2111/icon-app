import { takeLatest, all, call, put, select } from 'redux-saga/effects';
//firebase
import { readDocListFromFirestore } from '../../firebase/firebase.utils';
import { COMMON_ICONS_LIST_PATH, PROJECT_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//Action types
import { favoriteIconsActionTypes } from './favorite-icons.type';
import { commonIconsActionsTypes } from '../common-icons/common-icons.type';
import { projectIconsActionTypes } from '../project-icons/project-icons.type';
//actions
import { deleteCommonIconFromDbStart, toggleCommonIconFavoriteModeStart } from '../common-icons/common-icons.actions';
import { deleteProjectIconFromDbStart, toggleProjectIconFavoriteModeStart } from '../project-icons/project-icons.actions';
import {
    fetchCurrentUserFavoriteIconsSuccess, fetchCurrentUserFavoriteIconsFailure, deleteIconFromFavoriteTabSuccess,
    deleteIconFromFavoriteTabFailure, toggleIconFavoriteModeFailure, updateFavoriteIconsMap
} from './favorite-icons.actions';
//selectors
import { selectUser } from '../user/user.selectors';
import { selectFavoriteIcons } from './favorite-icons.selectors';
//constants
import { USER_PROFILE, FAVORITES_PROP, USER_FAVORITES_FETCH_LIMIT } from '../../utilities/app.constants';
//helpers
import {
    getLimitedFetchList, frameIconObjFromDocObj, checkIsAllIconsFetched,
    updateFavoritesIconsFetchMap, extractPropsBasedOnList, removePropsBasedOnList
} from '../../utilities/helper.functions';
import { updateCurrentUserFavoriteIcons } from '../user/user.actions';


const { USER_FAVORITES, USER_FAVORITES_FETCH_STATUS } = USER_PROFILE;
const { FAVORITES_IS_FETCHED, FAVORITES_PATH } = FAVORITES_PROP;

//Removing from favorites in db
function* removeIconFromUserFavorite({ payload: { id, value } }) {
    try {
        const { currentUser: { [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
        const iconPath = fetchMap[id][FAVORITES_PATH];
        if (iconPath.includes(COMMON_ICONS_LIST_PATH)) {
            yield put(toggleCommonIconFavoriteModeStart({ id, value }));
        }
        if (iconPath.includes(PROJECT_ICONS_LIST_PATH)) {
            yield put(toggleProjectIconFavoriteModeStart({ id, value }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(toggleIconFavoriteModeFailure(e?.message));
    }
};

function* onRemovingIconFromFavorite() {
    yield takeLatest(favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_START, removeIconFromUserFavorite);
};

//sync favorite icons tab with other values
function* syncFavoriteIconsWithFetchMap() {
    const { currentUser: { [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
    const { iconsMap } = yield select(selectFavoriteIcons);
    const newIconsMap = yield call(extractPropsBasedOnList, iconsMap, Object.keys(fetchMap));
    yield put(updateFavoriteIconsMap(newIconsMap));
};
function* onSyncFavoriteIcons() {
    yield takeLatest(favoriteIconsActionTypes.SYNC_FAVORITE_ICONS, syncFavoriteIconsWithFetchMap);
};

//fetch favorites icons from db
function* fetchUserFavoriteIcons() {
    try {
        let updatedFetchMap, isMoreFavIconsAvailableToFetch;
        const { currentUser: { [USER_FAVORITES_FETCH_STATUS]: isMoreIconsAvailableToFetch, [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
        const { fetchList, fetchIdList } = yield call(getLimitedFetchList,
            fetchMap, FAVORITES_IS_FETCHED, false, USER_FAVORITES_FETCH_LIMIT);
        if (fetchList.length && isMoreIconsAvailableToFetch) {
            const docList = yield call(readDocListFromFirestore, fetchList);
            const { iconsMap, notFoundList } = yield call(frameIconObjFromDocObj, docList, fetchMap);
            if (notFoundList.length) {
                updatedFetchMap = yield call(removePropsBasedOnList, fetchMap, notFoundList);
                isMoreFavIconsAvailableToFetch = yield call(checkIsAllIconsFetched, updatedFetchMap);
            }
            else {
                updatedFetchMap = yield call(updateFavoritesIconsFetchMap, fetchMap, fetchIdList);
                isMoreFavIconsAvailableToFetch = yield call(checkIsAllIconsFetched, updatedFetchMap);
            }
            yield put(fetchCurrentUserFavoriteIconsSuccess(iconsMap));
            yield put(updateCurrentUserFavoriteIcons({ updatedFetchMap, isMoreFavIconsAvailableToFetch }));
        }
        else {
            yield put(fetchCurrentUserFavoriteIconsSuccess([]));
            yield put(updateCurrentUserFavoriteIcons({ updatedFetchMap: fetchMap, isMoreFavIconsAvailableToFetch: false }));
        }
    }
    catch (e) {
        console.log(e);
        yield put(fetchCurrentUserFavoriteIconsFailure(e?.message));
    }
};
function* onFetchUserFavoriteIcons() {
    yield takeLatest(favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_START, fetchUserFavoriteIcons);
};

//delete icon from favorite tab after success in db
function* deleteIconFromFavoriteTab({ payload: iconId }) {
    const { iconsMap } = yield select(selectFavoriteIcons);
    if(iconsMap[iconId]){
        yield put(deleteIconFromFavoriteTabSuccess(iconId));
    }
};

function* onDeleteFromDbSuccess() {
    yield takeLatest(
        [commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_SUCCESS,
        projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_SUCCESS],
        deleteIconFromFavoriteTab
    );
};

//delete icon from db 
function* deleteIconFromClientAndDB({ payload: iconId }) {
    try {
        const { currentUser: { [USER_FAVORITES]: fetchMap } } = yield select(selectUser);
        const iconPath = fetchMap[iconId][FAVORITES_PATH];
        if (iconPath.includes(COMMON_ICONS_LIST_PATH)) {
            yield put(deleteCommonIconFromDbStart(iconId));
        }
        if (iconPath.includes(PROJECT_ICONS_LIST_PATH)) {
            yield put(deleteProjectIconFromDbStart(iconId));
        }
    }
    catch (e) {
        console.log(e);
        yield put(deleteIconFromFavoriteTabFailure(e?.message));
    }
};

function* onDeleteIconFromFavoriteTab() {
    yield takeLatest(favoriteIconsActionTypes.DELETE_ICON_FROM_FAVORITES_TAB_START, deleteIconFromClientAndDB);
};


// combine all sagas
export function* favoriteIconsSagas() {
    yield all([
        call(onDeleteFromDbSuccess),
        call(onDeleteIconFromFavoriteTab),
        call(onFetchUserFavoriteIcons),
        call(onSyncFavoriteIcons),
        call(onRemovingIconFromFavorite),
    ]);
}
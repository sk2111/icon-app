import { takeLatest, all, call, put, select } from 'redux-saga/effects';
//firebase
import { readDocListFromFirestore } from '../../firebase/firebase.utils';
import { COMMON_ICONS_LIST_PATH, PROJECT_ICONS_LIST_PATH } from '../../firebase/firebase.constants';
//Action types
import { userActionTypes } from '../user/user.type';
import { favoriteIconsActionTypes } from './favorite-icons.type';
import { commonIconsActionsTypes } from '../common-icons/common-icons.type';
import { projectIconsActionTypes } from '../project-icons/project-icons.type';
//actions
import { deleteCommonIconFromDbStart, toggleCommonIconFavoriteModeStart } from '../common-icons/common-icons.actions';
import { deleteProjectIconFromDbStart, toggleProjectIconFavoriteModeStart } from '../project-icons/project-icons.actions';
import {
    setCurrentUserFavoriteIconsFetchMap, fetchCurrentUserFavoriteIconsSuccess,
    fetchCurrentUserFavoriteIconsFailure, deleteIconFromFavoriteTabSuccess,
    deleteIconFromFavoriteTabFailure, toggleIconFavoriteModeSuccess,
    toggleIconFavoriteModeFailure
} from './favorite-icons.actions';
//selectors
import { selectFavoriteIcons } from './favorite-icons.selectors';
//constants
import { USER_PROFILE, FAVORITES_PROP, USER_FAVORITES_FETCH_LIMIT } from '../../utilities/app.constants';
//helpers
import { frameFavoriteIconsMap, getLimitedFetchList, frameIconObjFromDocObj } from '../../utilities/helper.functions';


const { USER_FAVORITES } = USER_PROFILE;
const { FAVORITES_IS_FETCHED, FAVORITES_PATH } = FAVORITES_PROP;

// Remvoving icon from client fav tab
function* removeIconFromFavoriteTab({ payload: { id } }) {
    yield put(toggleIconFavoriteModeSuccess(id));
};

function* onRemoveAsFavoriteFromDbSuccess() {
    yield takeLatest(
        [commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_SUCCESS,
        projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_SUCCESS],
        removeIconFromFavoriteTab
    );
};
//Removing from favorites in db
function* removeIconFromUserFavorite({ payload: { id, value } }) {
    try {

        const { fetchMap } = yield select(selectFavoriteIcons);
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

//delete icon from favorite tab after success in db
function* deleteIconFromFavoriteTab({ payload: iconId }) {
    yield put(deleteIconFromFavoriteTabSuccess(iconId));
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
        const { fetchMap } = yield select(selectFavoriteIcons);
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
    yield takeLatest(favoriteIconsActionTypes.DELETE_ICON_FROM_DB_AND_CLIENT_START, deleteIconFromClientAndDB);
};

//fetch favorites icons from db
function* fetchUserFavoriteIcons() {
    try {
        const { fetchMap, isMoreIconsAvailableToFetch } = yield select(selectFavoriteIcons);
        const { fetchList, fetchIdList, isMoreIconsAvailable } = yield call(getLimitedFetchList,
            fetchMap, FAVORITES_IS_FETCHED, false, USER_FAVORITES_FETCH_LIMIT);
        if (fetchList.length && isMoreIconsAvailableToFetch) {
            const docList = yield call(readDocListFromFirestore, fetchList);
            const iconsMap = yield call(frameIconObjFromDocObj, docList, fetchMap);
            yield put(fetchCurrentUserFavoriteIconsSuccess({ iconsMap, isMoreIconsAvailableToFetch: isMoreIconsAvailable, fetchIdList }));
        }
        else {
            yield put(fetchCurrentUserFavoriteIconsSuccess({ iconsMap: [], isMoreIconsAvailableToFetch: false, fetchIdList: [] }));
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

// listen for current user info success call and store favorite list in favourites store slice
function* storeFavoritesIcons({ payload }) {
    try {

        const { [USER_FAVORITES]: favoriteIcons = {} } = payload;
        const favoritesMap = yield call(frameFavoriteIconsMap, favoriteIcons);
        yield put(setCurrentUserFavoriteIconsFetchMap({ ...favoritesMap }));
    }
    catch (e) {
        console.log(e);
    }
}

function* onCurrentUserFetchSuccess() {
    yield takeLatest(userActionTypes.GET_CURRENT_USER_INFO_SUCCESS, storeFavoritesIcons);
}

// combine all sagas

export function* favoriteIconsSagas() {
    yield all([
        call(onCurrentUserFetchSuccess),
        call(onFetchUserFavoriteIcons),
        call(onDeleteIconFromFavoriteTab),
        call(onDeleteFromDbSuccess),
        call(onRemovingIconFromFavorite),
        call(onRemoveAsFavoriteFromDbSuccess),
    ]);
}
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
//firebase
import { readDocListFromFirestore } from '../../firebase/firebase.utils';
//Action types
import { userActionTypes } from '../user/user.type';
import { favoriteIconsActionTypes } from './favorite-icons.type';
//actions
import {
    setCurrentUserFavoriteIconsFetchMap, fetchCurrentUserFavoriteIconsSuccess,
    fetchCurrentUserFavoriteIconsFailure
} from './favorite-icons.actions';
//selectors
import { selectFavoriteIcons } from './favorite-icons.selectors';
//constants
import { USER_PROFILE, FAVORITES_PROP, USER_FAVORITES_FETCH_LIMIT } from '../../utilities/app.constants';
//helpers
import { frameFavoriteIconsMap, getLimitedFetchList, frameIconObjFromDocObj } from '../../utilities/helper.functions';


const { USER_FAVORITES } = USER_PROFILE;
const { FAVORITES_IS_FETCHED } = FAVORITES_PROP;




//fetch favorites icons from db
function* fetchUserFavoriteIcons() {
    try {
        const { fetchMap } = yield select(selectFavoriteIcons);
        const { fetchList, fetchIdList, isMoreIconsAvailableToFetch } = yield call(getLimitedFetchList,
            fetchMap, FAVORITES_IS_FETCHED, false, USER_FAVORITES_FETCH_LIMIT);
        if (fetchList.length && isMoreIconsAvailableToFetch) {
            const docList = yield call(readDocListFromFirestore, fetchList);
            const iconsMap = yield call(frameIconObjFromDocObj, docList, fetchMap);
            yield put(fetchCurrentUserFavoriteIconsSuccess({ iconsMap, isMoreIconsAvailableToFetch, fetchIdList }));
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
    ]);
}
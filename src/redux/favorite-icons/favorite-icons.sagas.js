import { takeLatest, all, call, put, select } from 'redux-saga/effects';
//Action types
import { userActionTypes } from '../user/user.type';
import { favoriteIconsActionTypes } from './favorite-icons.type';
//actions
import { setCurrentUserFavoriteIconsFetchMap } from './favorite-icons.actions';
//selectors
import { selectFavoriteIcons } from './favorite-icons.selectors';
//constants
import { USER_PROFILE } from '../../utilities/app.constants';
//helpers
import { frameFavoriteIconsMap } from '../../utilities/helper.functions';


const { USER_FAVORITES } = USER_PROFILE;




//fetch favorites icons from db
function* fetchUserFavoriteIcons() {
    const { fetchMap } = yield select(selectFavoriteIcons);
    console.log("sample testing for equality", fetchMap);
}
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
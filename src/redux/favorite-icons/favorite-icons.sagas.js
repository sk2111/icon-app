import { takeLatest, all, call, put } from 'redux-saga/effects';
//Action types
import { userActionTypes } from '../user/user.type';
//actions
import { setCurrentUserFavoriteIcons } from './favorite-icons.actions';
//constants
import { USER_PROFILE } from '../../utilities/app.constants';
//helpers
import { frameFavoriteIconsMap } from '../../utilities/helper.functions';


const { USER_FAVORITES } = USER_PROFILE;






// listen for current user info success call and store favorite list in favourites store slice
function* storeFavoritesIcons({ payload }) {
    try {

        const { [USER_FAVORITES]: favoriteIcons = {} } = payload;
        const favoritesMap = yield call(frameFavoriteIconsMap, favoriteIcons);
        yield put(setCurrentUserFavoriteIcons({ ...favoritesMap }));
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
    ]);
}
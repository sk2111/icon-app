import { takeLatest, all, call, put, select } from 'redux-saga/effects';
//firebase
import { readDocListFromFirestore } from '../../firebase/firebase.utils';
//Action types
import { userActionTypes } from '../user/user.type';
import { favoriteIconsActionTypes } from './favorite-icons.type';
//actions
import { setCurrentUserFavoriteIconsFetchMap } from './favorite-icons.actions';
//selectors
import { selectFavoriteIcons } from './favorite-icons.selectors';
//constants
import { USER_PROFILE, USER_FAVORITES_FETCH_LIMIT } from '../../utilities/app.constants';
//helpers
import { frameFavoriteIconsMap, getLimitedFetchList, frameIconObjFromDocObj } from '../../utilities/helper.functions';


const { USER_FAVORITES } = USER_PROFILE;




//fetch favorites icons from db
function* fetchUserFavoriteIcons() {
    try {
        const { fetchMap } = yield select(selectFavoriteIcons);
        const { fetchList, isMoreIconsAvaliableToFetch } = yield call(getLimitedFetchList,
            fetchMap, 'isFetched', false, USER_FAVORITES_FETCH_LIMIT);
        if (fetchList.length && isMoreIconsAvaliableToFetch) {
            const docList = yield call(readDocListFromFirestore, fetchList);
            // const iconsMap = yield call(frameIconObjFromDocObj, docList, Object.keys(favoriteIconsList));
            console.log("Final Icons Maps are", docList);
        }
    }
    catch (e) {
        console.log(e);
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
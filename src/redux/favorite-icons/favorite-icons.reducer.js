import { favoriteIconsActionTypes } from './favorite-icons.type';
//helpers
import { updateFavoritesIconsFetchMap } from '../../utilities/reducer.helperfunctions';


const INITIAL_STATE = {
    iconsMap: {},
    searchValue: '',
    isMoreIconsAvailableToFetch: true,
    fetchMap: {}
};

const favoriteIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_SUCCESS:
            const { iconsMap, isMoreIconsAvailableToFetch, fetchIdList } = action.payload;
            return {
                ...state,
                iconsMap: { ...state.iconsMap, ...iconsMap },
                fetchMap: { ...updateFavoritesIconsFetchMap(state.fetchMap, fetchIdList) },
                isMoreIconsAvailableToFetch,
            };
        case favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_FETCH_MAP:
            return { ...state, fetchMap: { ...action.payload } };
        default:
            return state;
    }
};


export default favoriteIconsReducer;
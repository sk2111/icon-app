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
        case favoriteIconsActionTypes.SET_FAVORITE_TAB_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        case favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_FETCH_MAP:
            return { ...state, fetchMap: { ...action.payload } };
        case favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_SUCCESS:
            const { iconsMap, isMoreIconsAvailableToFetch, fetchIdList } = action.payload;
            return {
                ...state,
                iconsMap: { ...state.iconsMap, ...iconsMap },
                fetchMap: { ...updateFavoritesIconsFetchMap(state.fetchMap, fetchIdList) },
                isMoreIconsAvailableToFetch,
            };
        case favoriteIconsActionTypes.DELETE_ICON_FROM_DB_AND_CLIENT_SUCCESS:
        case favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_SUCCESS:
            const { [action.payload]: deletedIcon, ...iconsMapAfterDelete } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterDelete } };
        default:
            return state;
    }
};


export default favoriteIconsReducer;
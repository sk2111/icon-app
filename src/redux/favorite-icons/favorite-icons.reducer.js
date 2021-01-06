import { favoriteIconsActionTypes } from './favorite-icons.type';

const INITIAL_STATE = {
    iconsMap: {},
    searchValue: '',
};

const favoriteIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case favoriteIconsActionTypes.SET_FAVORITE_TAB_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        case favoriteIconsActionTypes.UPDATE_FAVORITE_ICONS_MAP_AFTER_SYNC:
            return { ...state, iconsMap: { ...action.payload } };
        case favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_SUCCESS:
            return { ...state, iconsMap: { ...state.iconsMap, ...action.payload } };
        case favoriteIconsActionTypes.DELETE_ICON_FROM_DB_AND_CLIENT_SUCCESS:
            const { [action.payload]: deletedIcon, ...iconsMapAfterDelete } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterDelete } };
        case favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_START:
            const { id } = action.payload;
            const { [id]: favRemove, ...iconsMapAfterFavRemoved } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterFavRemoved } };
        default:
            return state;
    }
};


export default favoriteIconsReducer;
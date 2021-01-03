import { favoriteIconsActionTypes } from './favorite-icons.type';


//set favorite tab search value 
export const setFavoriteTabSearchValue = (payload) => {
    return {
        type: favoriteIconsActionTypes.SET_FAVORITE_TAB_SEARCH_VALUE,
        payload
    }
};

//set user favoruirites map after current user fetch 

export const setCurrentUserFavoriteIconsFetchMap = (payload) => {
    return {
        type: favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_FETCH_MAP,
        payload
    }
};

// fetch user favorite from db
export const fetchCurrentUserFavoriteIconsStart = () => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_START
    }
};
export const fetchCurrentUserFavoriteIconsSuccess = (payload) => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_SUCCESS,
        payload
    }
};
export const fetchCurrentUserFavoriteIconsFailure = () => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_FAILURE
    }
};

import { favoriteIconsActionTypes } from './favorite-icons.type';


//set favorite tab search value 
export const setFavoriteTabSearchValue = (payload) => {
    return {
        type: favoriteIconsActionTypes.SET_FAVORITE_TAB_SEARCH_VALUE,
        payload
    }
};
// sync favorite icons tab with other tab favorites
export const syncFavoriteTabIconsWithFetchMap = () => {
    return {
        type: favoriteIconsActionTypes.SYNC_FAVORITE_ICONS
    }
};
//update iconsMap for favorites
export const updateFavoriteIconsMap = (payload) => {
    return{
        type:favoriteIconsActionTypes.UPDATE_FAVORITE_ICONS_MAP_AFTER_SYNC,
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

//delete icon only allowed for admin
export const deleteIconFromFavoriteTabStart = (payload) => {
    return {
        type: favoriteIconsActionTypes.DELETE_ICON_FROM_FAVORITES_TAB_START,
        payload
    }
};
export const deleteIconFromFavoriteTabSuccess = (payload) => {
    return {
        type: favoriteIconsActionTypes.DELETE_ICON_FROM_FAVORITES_TAB_SUCCESS,
        payload
    }
};
export const deleteIconFromFavoriteTabFailure = (payload) => {
    return {
        type: favoriteIconsActionTypes.DELETE_ICON_FROM_FAVORITES_TAB_FAILURE,
        payload
    }
};

// toggle favorite mode 

export const toggleIconFavoriteModeStart = (payload) => {
    return {
        type: favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_START,
        payload
    }
};
export const toggleIconFavoriteModeSuccess = (payload) => {
    return {
        type: favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_SUCCESS,
        payload
    }
};
export const toggleIconFavoriteModeFailure = (payload) => {
    return {
        type: favoriteIconsActionTypes.TOGGLE_FAVORITE_ICON_FAVORITE_MODE_FAILURE,
        payload
    }
};
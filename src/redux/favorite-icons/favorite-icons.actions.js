import { favoriteIconsActionTypes } from './favorite-icons.type';




//set user favoruirites map after current user fetch 

export const setCurrentUserFavoriteIcons = (payload) => {
    return {
        type: favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_ICONS,
        payload
    }
};

// fetch user favorite from db
export const fetchCurrentUserFavoriteIconsStart = () => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_START
    }
};
export const fetchCurrentUserFavoriteIconsSuccess = () => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_SUCCESS
    }
};
export const fetchCurrentUserFavoriteIconsFailure = () => {
    return {
        type: favoriteIconsActionTypes.FETCH_CURRENT_USER_FAVORITE_ICONS_FAILURE
    }
};
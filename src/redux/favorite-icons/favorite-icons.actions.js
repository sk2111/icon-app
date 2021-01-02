import { favoriteIconsActionTypes } from './favorite-icons.type';




//set user favoruirites map after current user fetch 

export const setCurrentUserFavoriteIcons = (payload) => {
    return {
        type: favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_ICONS,
        payload
    }
}
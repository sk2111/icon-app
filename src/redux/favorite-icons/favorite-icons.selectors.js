// reselect 
import { createSelector } from 'reselect';

export const selectFavoriteIcons = (state) => state.favoriteIcons;


export const selectFavoriteIconsMap = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.iconsMap);

export const selectIsMoreIconsAvailableToFetch = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.isMoreIconsAvailableToFetch);

export const selectFavoriteFetchMap = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.fetchMap);
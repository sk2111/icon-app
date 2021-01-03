// reselect 
import { createSelector } from 'reselect';
//constants
import { ICON_PROP } from '../../utilities/app.constants';
//helpers
import { getSpaceCombinationValue, getAlphaOnly } from '../../utilities/helper.functions';

//destructure ICON PROP
const { ICON_TAGS } = ICON_PROP;


export const selectFavoriteIcons = (state) => state.favoriteIcons;

export const selectFavoriteIconsMap = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.iconsMap);

export const selectFavoriteIconsSearchValue = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.searchValue);

export const selectIsMoreIconsAvailableToFetch = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.isMoreIconsAvailableToFetch);

export const selectFavoriteFetchMap = createSelector([selectFavoriteIcons],
    (favoriteIcons) => favoriteIcons.fetchMap);

export const selectFavoriteIconsListToDisplay = createSelector(
    [selectFavoriteIconsSearchValue, selectFavoriteIconsMap],
    (searchValue, iconsMap) => {
        const searchTagValue = getSpaceCombinationValue(getAlphaOnly(searchValue, '', true, true));
        const iconsArray = Object.values(iconsMap);
        return iconsArray.filter((icon) => {
            const iconTagAsStr = icon[ICON_TAGS].join(' ');
            const searchMatchResult = searchTagValue.length ?
                searchTagValue.some((subStr) => iconTagAsStr.includes(subStr)) : true;
            return searchMatchResult;
        });
    }
);
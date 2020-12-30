import { createSelector } from 'reselect';
//constants
import { COMMON_ICON_DEFAULT_CATEGORY_VALUE, ICON_PROP } from '../../utilities/app.constants';
//helpers
import { getSpaceCombinationValue, getAlphaOnly, getPaginateConfig } from '../../utilities/helper.functions';

//destructure ICON PROP
const { ICON_CLASSIFICATION, ICON_TAGS } = ICON_PROP;

export const selectCommonIcons = state => state.commonIcons;

export const selectCommonIconsPagination = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.paginationMap);

export const selectCommonIconsSearchKeywords = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.searchKeywordsList);

export const selectCommonIconsSelectOptions = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.selectOptionsList);

export const selectCommonIconsClassification = createSelector([selectCommonIconsSelectOptions],
    (commonIconsSelectOptions) => commonIconsSelectOptions.filter(option => option !== COMMON_ICON_DEFAULT_CATEGORY_VALUE));

export const selectCommonIconsSearchValue = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.searchValue);

export const selectCommonIconsSelectValue = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.selectValue);

const selectCommonIconsMap = createSelector([selectCommonIcons],
    (commonIcons) => commonIcons.iconsMap);

export const selectIsMoreIconsAvailableToFetch = createSelector([selectCommonIconsSelectValue, selectCommonIconsSearchValue, selectCommonIconsPagination],
    (selectValue, searchValue, paginationMap) => {
        const { existingPaginationMap, isMoreIconsAvailableToFetch } = getPaginateConfig(selectValue, searchValue, paginationMap);
        return existingPaginationMap ? isMoreIconsAvailableToFetch : true;
    }
);

export const selectCommonIconsListToDisplay = createSelector(
    [selectCommonIconsSearchValue, selectCommonIconsSelectValue, selectCommonIconsMap],
    (searchValue, classificationValue, iconsMap) => {
        const searchTagValue = getSpaceCombinationValue(getAlphaOnly(searchValue, '', true, true));
        const iconsArray = Object.values(iconsMap);
        return iconsArray.filter((icon) => {
            const iconTagAsStr = icon[ICON_TAGS].join(' ');
            const keyWordMatchResult = searchTagValue.length ?
                searchTagValue.some((subStr) => iconTagAsStr.includes(subStr)) : true;
            const classficationMatchResult = icon[ICON_CLASSIFICATION].includes(classificationValue);
            return (classificationValue === COMMON_ICON_DEFAULT_CATEGORY_VALUE) ?
                keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
    }
);
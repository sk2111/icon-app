import { createSelector } from 'reselect';
//constants
import { COMMON_ICON_DEFAULT_CATEGORY_VALUE, ICON_PROP } from '../../utilities/app.constants';
//helpers
import { getSpaceCombinationValue, getAlphaOnly, framePaginateKey } from '../../utilities/helper.functions';

//destructure ICON PROP
const { ICON_CLASSIFICATION, ICON_TAGS } = ICON_PROP;

export const selectCommonIcons = state => state.commonIcons;

export const selectCommonIconsPagination = createSelector([selectCommonIcons], (commonIcons) => commonIcons.paginationMap);

export const selectCommonIconsSearchKeywords = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchKeywordsList);

export const selectCommonIconsSelectOptions = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectOptionsList);

export const selectCommonIconsClassification = createSelector([selectCommonIconsSelectOptions],
    (commonIconsSelectOptions) => commonIconsSelectOptions.filter(option => option !== COMMON_ICON_DEFAULT_CATEGORY_VALUE));

export const selectCommonIconsSearchValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchValue);

export const selectCommonIconsSelectValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectValue);

export const selectIsMoreIconsAvailableToFetch = createSelector(
    [selectCommonIconsSelectValue, selectCommonIconsSearchValue, selectCommonIconsPagination],
    (selectValue, searchValue, paginationMap) => {
        const paginationKey = framePaginateKey(selectValue, searchValue);
        const existingPaginationMap = paginationMap[paginationKey];
        if (existingPaginationMap) {
            return existingPaginationMap.isMoreIconsAvailableToFetch;
        }
        return true;
    }
);

const selectCommonIconsMap = createSelector([selectCommonIcons], (commonIcons) => commonIcons.iconsMap);


export const selectCommonIconsListToDisplay = createSelector(
    [selectCommonIconsSearchValue, selectCommonIconsSelectValue, selectCommonIconsMap],
    (searchValue, classificationValue, iconsMap) => {
        const searchTagValue = getSpaceCombinationValue(getAlphaOnly(searchValue, '', true, true));
        console.log(" Hai I am reselect group runner", searchTagValue, classificationValue);
        const iconsArray = Object.values(iconsMap);
        const filteredArray = iconsArray.filter((icon) => {
            const iconTagAsStr = icon[ICON_TAGS].join(' ');
            const keyWordMatchResult = searchTagValue.length ?
                searchTagValue.some((subStrCombination) => iconTagAsStr.includes(subStrCombination)) : true;
            const classficationMatchResult = icon[ICON_CLASSIFICATION].includes(classificationValue);
            return (classificationValue === COMMON_ICON_DEFAULT_CATEGORY_VALUE) ?
                keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
        return filteredArray;
    }
);
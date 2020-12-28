import { createSelector } from 'reselect';
//constants
import { COMMON_ICON_DEFAULT_CATEGORY_VALUE, ICON_PROP } from '../../utilities/app.constants';
//helpers
import { trimStr, framePaginateKey } from '../../utilities/helper.functions';

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

const selectTrimmedSearchValue = createSelector([selectCommonIconsSearchValue], (searchValue) => trimStr(searchValue));

export const selectCommonIconsListToDisplay = createSelector(
    [selectTrimmedSearchValue, selectCommonIconsSelectValue, selectCommonIconsMap],
    (searchTagValue, classificationValue, iconsMap) => {
        console.log(" Hai I am reselect group runner", searchTagValue, classificationValue);
        const iconsArray = Object.values(iconsMap);
        const defaultValue = trimStr(COMMON_ICON_DEFAULT_CATEGORY_VALUE);
        const filteredArray = iconsArray.filter((icon) => {
            const keyWordMatchResult = icon[ICON_TAGS].join(' ').includes(searchTagValue);
            const classficationMatchResult = icon[ICON_CLASSIFICATION].includes(classificationValue);
            return (classificationValue === defaultValue) ? keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
        return filteredArray;
    }
);
import { createSelector } from 'reselect';

const selectCommonIcons = state => state.commonIcons;

export const selectCommonIconsSearchKeywords = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchKeywordsList);

export const selectCommonIconsSelectOptions = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectOptionsList);

export const selectCommonIconsSearchValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchValue);

export const selectCommonIconsSelectValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectValue);
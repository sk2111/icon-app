import { createSelector } from 'reselect';
//constants
import { DEFAULT_CATEGORY_VALUE } from './common-icons.constants';

const selectCommonIcons = state => state.commonIcons;

export const selectCommonIconsSearchKeywords = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchKeywordsList);

export const selectCommonIconsSelectOptions = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectOptionsList);

export const selectCommonIconsSearchValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchValue);

export const selectCommonIconsSelectValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectValue);

export const selectCommonIconsMap = createSelector([selectCommonIcons], (commonIcons) => commonIcons.iconsMap);

export const selectCommonIconsToDisplay = createSelector(
    [selectCommonIconsSearchValue, selectCommonIconsSelectValue, selectCommonIconsMap],
    (searchValue, selectValue, iconsMap) => {
        console.log(" Hai I am reselect and I am running", searchValue, selectValue, iconsMap);
        const iconsArray = Object.values(iconsMap);
        const searchTagValue = String(searchValue).toLowerCase();
        const classificationValue = String(selectValue).toLowerCase();
        const defaultValue = String(DEFAULT_CATEGORY_VALUE).toLowerCase();
        //first filter by classfication if value is other than all     
        const classificationFiltered = (classificationValue === defaultValue) ? [...iconsArray] :
            iconsArray.filter((icon) => icon.classification === classificationValue);
        //filter by search keyword if value is other than empty
        const searchTagFiltered = (searchTagValue === '') ? [...classificationFiltered] :
            classificationFiltered.filter((icon) => icon.tags.join(' ').includes(searchTagValue));

        return searchTagFiltered;
    }
);
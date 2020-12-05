import { createSelector } from 'reselect';
//constants
import { DEFAULT_CATEGORY_VALUE } from './common-icons.constants';
//helpers
import { trimStr } from '../../utilities/helper.functions';


const selectCommonIcons = state => state.commonIcons;

export const selectCommonIconsSearchKeywords = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchKeywordsList);

export const selectCommonIconsSelectOptions = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectOptionsList);

export const selectCommonIconsSearchValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.searchValue);

export const selectCommonIconsSelectValue = createSelector([selectCommonIcons], (commonIcons) => commonIcons.selectValue);

const selectCommonIconsMap = createSelector([selectCommonIcons], (commonIcons) => commonIcons.iconsMap);

const selectTrimmedSearchValue = createSelector([selectCommonIconsSearchValue], (searchValue) => trimStr(searchValue));

const selectTrimmedSelectValue = createSelector([selectCommonIconsSelectValue], (selectValue) => trimStr(selectValue));

export const selectCommonIconsToDisplay = createSelector(
    [selectTrimmedSearchValue, selectTrimmedSelectValue, selectCommonIconsMap],
    (searchTagValue, classificationValue, iconsMap) => {
        console.log(" Hai I am reselect group runner", searchTagValue, classificationValue);
        const iconsArray = Object.values(iconsMap);
        const defaultValue = trimStr(DEFAULT_CATEGORY_VALUE);
        const filteredArray = iconsArray.filter((icon) => {
            const keyWordMatchResult = icon.tags.join(' ').includes(searchTagValue);
            const classficationMatchResult = icon.classification === classificationValue;
            return (classificationValue === defaultValue) ? keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
        return filteredArray;
    }
);
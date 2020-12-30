import { createSelector } from 'reselect';
//constants
import { PROJECT_ICON_DEFAULT_PROJECT_VALUE, ICON_PROP } from '../../utilities/app.constants';
//helpers
import { getSpaceCombinationValue, getAlphaOnly, getPaginateConfig } from '../../utilities/helper.functions';

//destructure ICON PROP
const { ICON_CLASSIFICATION, ICON_TAGS } = ICON_PROP;

export const selectProjectIcons = state => state.projectIcons;

export const selectProjectIconsPagination = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.paginationMap);

export const selectProjectIconsSearchKeywords = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.searchKeywordsList);

export const selectProjectIconsSelectOptions = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.selectOptionsList);

export const selectProjectIconsClassification = createSelector([selectProjectIconsSelectOptions],
    (projectIconsSelectOptions) => projectIconsSelectOptions.filter(option => option !== PROJECT_ICON_DEFAULT_PROJECT_VALUE));

export const selectProjectIconsSearchValue = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.searchValue);

export const selectProjectIconsSelectValue = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.selectValue);

const selectProjectIconsMap = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.iconsMap);

export const selectIsMoreIconsAvailableToFetch = createSelector([selectProjectIconsSelectValue, selectProjectIconsSearchValue, selectProjectIconsPagination],
    (selectValue, searchValue, paginationMap) => {
        const { existingPaginationMap, isMoreIconsAvailableToFetch } = getPaginateConfig(selectValue, searchValue, paginationMap);
        return existingPaginationMap ? isMoreIconsAvailableToFetch : true;
    }
);

export const selectProjectIconsListToDisplay = createSelector(
    [selectProjectIconsSearchValue, selectProjectIconsSelectValue, selectProjectIconsMap],
    (searchValue, classificationValue, iconsMap) => {
        const searchTagValue = getSpaceCombinationValue(getAlphaOnly(searchValue, '', true, true));
        const iconsArray = Object.values(iconsMap);
        return iconsArray.filter((icon) => {
            const iconTagAsStr = icon[ICON_TAGS].join(' ');
            const keyWordMatchResult = searchTagValue.length ?
                searchTagValue.some((subStr) => iconTagAsStr.includes(subStr)) : true;
            const classficationMatchResult = icon[ICON_CLASSIFICATION].includes(classificationValue);
            return (classificationValue === PROJECT_ICON_DEFAULT_PROJECT_VALUE) ?
                keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
    }
);
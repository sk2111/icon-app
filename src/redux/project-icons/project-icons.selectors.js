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


export const selectAllProjectsList = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.projectsList);

export const selectProjectIconsClassification = createSelector([selectAllProjectsList],
    (projectIconsSelectOptions) => projectIconsSelectOptions.filter(option => option !== PROJECT_ICON_DEFAULT_PROJECT_VALUE));

export const selectProjectSearchValue = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.projectSearchValue);

export const selectProjectIconsSearchValue = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.projectIconsSearchValue);

export const selectUserSelectedProject = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.userSelectedProject);

const selectProjectIconsMap = createSelector([selectProjectIcons],
    (projectIcons) => projectIcons.iconsMap);

export const selectIsMoreIconsAvailableToFetch = createSelector([selectUserSelectedProject, selectProjectIconsPagination],
    (userSelectedProject, paginationMap) => {
        const { existingPaginationMap, isMoreIconsAvailableToFetch } = getPaginateConfig(userSelectedProject, '', paginationMap);
        return existingPaginationMap ? isMoreIconsAvailableToFetch : true;
    }
);

export const selectFilteredProjectsList = createSelector(
    [selectAllProjectsList, selectProjectSearchValue],
    (projectList, searchValue) => {
        return projectList.filter((name) => {
            return String(name).toLowerCase().includes(searchValue.toLowerCase());
        });
    }
);

export const selectProjectIconsListToDisplay = createSelector(
    [selectProjectIconsSearchValue, selectUserSelectedProject, selectProjectIconsMap],
    (projectIconsSearchValue, classificationValue, iconsMap) => {
        const searchTagValue = getSpaceCombinationValue(getAlphaOnly(projectIconsSearchValue, '', true, true));
        const iconsArray = Object.values(iconsMap);
        return iconsArray.filter((icon) => {
            const iconTagAsStr = icon[ICON_TAGS].join(' ');
            const keyWordMatchResult = searchTagValue.length ?
                searchTagValue.some((subStr) => iconTagAsStr.includes(subStr)) : true;
            const classficationMatchResult = icon[ICON_CLASSIFICATION] === classificationValue;
            return (classificationValue === PROJECT_ICON_DEFAULT_PROJECT_VALUE) ?
                keyWordMatchResult : (classficationMatchResult && keyWordMatchResult);
        });
    }
);
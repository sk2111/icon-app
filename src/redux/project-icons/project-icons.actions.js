import { projectIconsActionTypes } from './project-icons.type';

//fetching initial data like search keywords and category list
export const fetchProjectIconsUserOptionsStart = () => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_START
    }
};
export const fetchProjectIconsUserOptionsSuccess = (payload) => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_SUCCESS,
        payload
    }
};
export const fetchProjectIconsUserOptionsFailure = (payload) => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_FAILURE,
        payload
    }
};

// set search and select value action

export const setProjectIconsTabSearchValue = (payload) => {
    return {
        type: projectIconsActionTypes.SET_PROJECT_ICONS_TAB_SEARCH_VALUE,
        payload
    }
};

export const setProjectIconsTabSelectValue = (payload) => {
    return {
        type: projectIconsActionTypes.SET_PROJECT_ICONS_TAB_SELECT_VALUE,
        payload
    }
};

// fetch icons from db
export const fetchProjectIconsFromDatabaseStart = () => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_START
    }
};
export const fetchProjectIconsFromDatabaseSuccess = (payload) => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_SUCCESS,
        payload
    }
};
export const fetchProjectIconsFromDatabaseFailure = (payload) => {
    return {
        type: projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_FAILURE,
        payload
    }
};

// setProject icons pagination map action
export const setProjectIconsPaginationMap = (payload) => {
    return {
        type: projectIconsActionTypes.SET_PROJECT_ICONS_PAGINATION,
        payload
    }
}
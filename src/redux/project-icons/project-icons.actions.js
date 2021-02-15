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
//set project search value 
export const setProjectIconsTabProjectsSearchValue = (payload) => {
    return {
        type: projectIconsActionTypes.SET_PROJECT_ICONS_TAB_PROJECTS_SEARCH_VALUE,
        payload
    }
};

// set search and select project icons value action

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
};

// delete icon from redux store and DB
export const deleteProjectIconFromDbStart = (payload) => {
    return {
        type: projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_START,
        payload
    }
};

export const deleteProjectIconFromDbSuccess = (payload) => {
    return {
        type: projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_SUCCESS,
        payload
    }
};

export const deleteProjectIconFromDbFailure = (payload) => {
    return {
        type: projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_FAILURE,
        payload
    }
};

// Favourites addition
export const toggleProjectIconFavoriteModeStart = (payload) => {
    return {
        type: projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_START,
        payload
    }
};
export const toggleProjectIconFavoriteModeSuccess = (payload) => {
    return {
        type: projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_SUCCESS,
        payload
    }
};
export const toggleProjectIconFavoriteModeFailure = (payload) => {
    return {
        type: projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_FAILURE,
        payload
    }
};
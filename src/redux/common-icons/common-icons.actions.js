import { commonIconsActionsTypes } from './common-icons.type';

//fetching initial data like search keywords and category list
export const fetchCommonIconsUserOptionsStart = () => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_START
    }
};
export const fetchCommonIconsUserOptionsSuccess = (payload) => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_SUCCESS,
        payload
    }
};
export const fetchCommonIconsUserOptionsFailure = (payload) => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_FAILURE,
        payload
    }
};

// set search and select value action

export const setCommonIconsTabSearchValue = (payload) => {
    return {
        type: commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SEARCH_VALUE,
        payload
    }
};

export const setCommonIconsTabSelectValue = (payload) => {
    return {
        type: commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SELECT_VALUE,
        payload
    }
};

// fetch icons from db

export const fetchCommonIconsFromDatabaseStart = () => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_START
    }
};
export const fetchCommonIconsFromDatabaseSuccess = (payload) => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_SUCCESS,
        payload
    }
};
export const fetchCommonIconsFromDatabaseFailure = (payload) => {
    return {
        type: commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_FAILURE,
        payload
    }
};

// setCommon icons pagination map action
export const setCommonIconsPaginationMap = (payload) => {
    return {
        type: commonIconsActionsTypes.SET_COMMON_ICONS_PAGINATION,
        payload
    }
};

// delete icon from redux store and DB
export const deleteCommonIconFromDbStart = (payload) => {
    return {
        type: commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_START,
        payload
    }
};
export const deleteCommonIconFromDbSuccess = (payload) => {
    return {
        type: commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_SUCCESS,
        payload
    }
};
export const deleteCommonIconFromDbFailure = (payload) => {
    return {
        type: commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_FAILURE,
        payload
    }
};

// Favourites addition
export const toggleCommonIconFavoriteModeStart = (payload) => {
    return {
        type: commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_START,
        payload
    }
};
export const toggleCommonIconFavoriteModeSuccess = (payload) => {
    return {
        type: commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_SUCCESS,
        payload
    }
};
export const toggleCommonIconFavoriteModeFailure = (payload) => {
    return {
        type: commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_FAILURE,
        payload
    }
};
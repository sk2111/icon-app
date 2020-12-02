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
        type: commonIconsActionsTypes.SET_COMMON_ICON_TAB_SEARCH_VALUE,
        payload
    }
};

export const setCommonIconsTabSelectValue = (payload) => {
    return {
        type: commonIconsActionsTypes.SET_COMMON_ICON_TAB_SELECT_VALUE,
        payload
    }
};

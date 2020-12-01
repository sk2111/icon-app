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

import { editIconActionTypes } from './edit-icon.type';


// select icon for edit
export const editSelectedIcon = (payload) => {
    return {
        type: editIconActionTypes.EDIT_USER_SELECTED_ICON,
        payload
    }
};
// change selected download type
export const changeDownloadFormat = (payload) => {
    return {
        type: editIconActionTypes.CHANGE_ICON_DOWNLOAD_FORMAT,
        payload
    }
};
//change standard default download size
export const changeStandardDownloadSize = (payload) => {
    return {
        type: editIconActionTypes.CHANGE_STANDARD_DOWNLOAD_SIZE,
        payload
    }
};
//change custom height and width
export const changeCustomDownloadSize = (payload) => {
    return {
        type: editIconActionTypes.CHANGE_CUSTOM_DOWNLOAD_SIZE,
        payload
    };
};
//change picker color
export const changeUserSelectedColor = (payload) => {
    return {
        type: editIconActionTypes.CHANGE_USER_SELECTED_COLOR,
        payload
    }
};
//icon download actions
export const triggerIconDownload = () => {
    return {
        type: editIconActionTypes.TRIGGER_ICON_DOWNLOAD
    }
};
export const iconDownloadStart = (payload) => {
    return {
        type: editIconActionTypes.ICON_DOWNLOAD_START,
        payload
    }
};
export const iconDownloadSuccess = () => {
    return {
        type: editIconActionTypes.ICON_DOWNLOAD_SUCCESS
    }
};
export const iconDownloadFailure = (payload) => {
    return {
        type: editIconActionTypes.ICON_DOWNLOAD_FAILURE,
        payload
    }
};
//preview Icon actions
export const iconPreviewStart = (payload) => {
    return {
        type: editIconActionTypes.ICON_PREVIEW_START,
        payload
    }
};
export const iconPreviewSuccess = () => {
    return {
        type: editIconActionTypes.ICON_PREVIEW_SUCCESS
    }
};
export const iconPreviewFailure = (payload) => {
    return {
        type: editIconActionTypes.ICON_PREVIEW_FAILURE,
        payload
    }
};
//close edit icon modal
export const closeEditModal = () => {
    return {
        type: editIconActionTypes.CLOSE_EDIT_ICON_MODAL
    }
};


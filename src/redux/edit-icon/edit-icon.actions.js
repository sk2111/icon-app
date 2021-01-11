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

//close edit icon modal
export const closeEditModal = () => {
    return {
        type: editIconActionTypes.CLOSE_EDIT_ICON_MODAL
    }
};


import { uploadIconsActionTypes } from './upload-icons.type';

//Modal open close actions
export const openUploadModal = (payload) => {
    return {
        type: uploadIconsActionTypes.OPEN_UPLOAD_MODAL_VIEW,
        payload
    }
};
export const closeUploadModal = (payload) => {
    return {
        type: uploadIconsActionTypes.CLOSE_UPLOAD_MODAL_VIEW,
        payload
    }
};


//upload and delete actions
export const uploadFilesToCommonIcons = (payload) => {
    return {
        type: uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS,
        payload
    }
};

export const deleteCommonIcon = (payload) => {
    return {
        type: uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON,
        payload
    }
};


import { uploadIconsActionTypes } from './upload-icons.type';

//Modal open close actions
export const openUploadModal = (payload) => {
    return {
        type: uploadIconsActionTypes.OPEN_UPLOAD_MODAL,
        payload
    }
};
export const closeUploadModal = (payload) => {
    return {
        type: uploadIconsActionTypes.CLOSE_UPLOAD_MODAL,
        payload
    }
};

// Modal view changing actions
export const changeModalView = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_UPLOAD_MODAL_VIEW,
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
//calssification change actions
export const changeRootClassfication = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_CLASSIFICATION_FOR_ALL_UPLOADED_ICONS,
        payload
    }
};
//Edit Icon properties
export const editUploadIconName = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_UPLOAD_ICON_NAME,
        payload
    }
};

export const editUploadIconClassification = (payload) => {
    return {
        type: uploadIconsActionTypes.CHNAGE_UPLOAD_ICON_CLASSIFICATION,
        payload
    }
};
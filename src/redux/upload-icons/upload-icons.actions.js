import { uploadIconsActionTypes } from './upload-icons.type';

//Modal open close actions
export const openUploadModal = (payload) => {
    return {
        type: uploadIconsActionTypes.OPEN_UPLOAD_MODAL,
        payload
    }
};
export const showHideCloseConfirmationModal = (payload) => {
    return {
        type: uploadIconsActionTypes.SHOW_CLOSE_CONFIRMATION_MODAL,
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
export const uploadFilesToStore = (payload) => {
    return {
        type: uploadIconsActionTypes.SET_UPLOADED_ICONS,
        payload
    }
};

export const deleteUploadedIcon = (payload) => {
    return {
        type: uploadIconsActionTypes.DELETE_UPLOADED_ICON,
        payload
    }
};
//classification change actions
export const changeRootClassfication = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_CLASSIFICATION_FOR_ALL_UPLOADED_ICONS,
        payload
    }
};
//Tags change
export const updateRootTags = (payload) => {
    return {
        type: uploadIconsActionTypes.UPDATE_COMMON_ROOT_TAGS,
        payload
    }
}

//Edit Icon properties
export const editUploadIconName = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_UPLOAD_ICON_NAME,
        payload
    }
};

export const editUploadIconClassification = (payload) => {
    return {
        type: uploadIconsActionTypes.CHANGE_UPLOAD_ICON_CLASSIFICATION,
        payload
    }
};

export const updateIconTags = (payload) => {
    return {
        type: uploadIconsActionTypes.UPDATE_ICON_TAGS,
        payload
    }
};
// Add new classfication in db
export const addNewClassfication = (payload) => {
    return {
        type: uploadIconsActionTypes.ADD_NEW_CLASSIFICATION_START,
        payload
    }
};

export const addNewClassficationSuccess = (payload) => {
    return {
        type: uploadIconsActionTypes.ADD_NEW_CLASSIFICATION_SUCCESS,
        payload
    }
};

export const addNewClassficationFailed = (payload) => {
    return {
        type: uploadIconsActionTypes.ADD_NEW_CLASSIFICATION_FAILURE,
        payload
    }
};

export const closeAddNewClassificationModal = (payload) => {
    return {
        type: uploadIconsActionTypes.CLOSE_ADD_NEW_CLASSIFICATION_MODAL,
        payload
    }
};
//upload to db actions
export const uploadIconsStart = () => {
    return {
        type: uploadIconsActionTypes.UPLOAD_ICONS_START
    }
};

export const uploadIconsSuccess = (payload) => {
    return {
        type: uploadIconsActionTypes.UPLOAD_ICONS_SUCCESS,
        payload
    }
};

export const uploadIconsFailure = (payload) => {
    return {
        type: uploadIconsActionTypes.UPLOAD_ICONS_FAILURE,
        payload
    }
};

export const readyToUploadIcons = (payload) => {
    return {
        type: uploadIconsActionTypes.UPLOADING_ICONS_TO_DB,
        payload
    }
};
// card modal for upload success and fail
export const closeUploadStatusModal = () => {
    return {
        type: uploadIconsActionTypes.CLOSE_UPLOAD_STATUS_MODAL
    }
}

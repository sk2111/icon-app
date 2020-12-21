import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertiesImmutably, editObjectPropertiesImmutably, editAllIconsObjectPropertiesImmutably } from '../../utilities/reducer.helperfunctions';
//constants
import { MODAL_IN_UPLOAD_VIEW, MODAL_IN_CONFIGURE_VIEW, UPLOAD_ICONS_DEFAULT_CLASSIFICATION } from '../../utilities/app.constants';

const INITIAL_STATE = {
    uploadedIcons: {},
    isUploadModalOpen: null, // null beacause first time animation close flicker condition
    showCloseConfirmationModal: false,
    uploadIconDBPath: null,
    uploadModalCurrentView: MODAL_IN_UPLOAD_VIEW,
    rootClassification: UPLOAD_ICONS_DEFAULT_CLASSIFICATION,
    commonRootTags: []
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedIcons: { ...state.uploadedIcons, ...action.payload } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_MODAL_VIEW:
            return { ...state, uploadModalCurrentView: action.payload };
        case uploadIconsActionTypes.CHANGE_CLASSIFICATION_FOR_ALL_UPLOADED_ICONS:
            return { ...state, rootClassification: action.payload.newValue, uploadedIcons: { ...editAllIconsObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.UPDATE_COMMON_ROOT_TAGS:
            return { ...state, commonRootTags: [...action.payload] };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, uploadedIcons: { ...removeObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.OPEN_UPLOAD_MODAL:
            return { ...state, isUploadModalOpen: true, uploadIconDBPath: action.payload };
        case uploadIconsActionTypes.SHOW_CLOSE_CONFIRMAION:
            return { ...state, showCloseConfirmationModal: true };
        case uploadIconsActionTypes.CLOSE_UPLOAD_MODAL:
            return { ...state, isUploadModalOpen: false, uploadIconDBPath: null };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_NAME:
            return { ...state, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_CLASSIFICATION:
            return { ...state, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.UPDATE_ICON_TAGS:
            return { ...state, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        default:
            return state;
    };
};


export default uploadIconsReducer;
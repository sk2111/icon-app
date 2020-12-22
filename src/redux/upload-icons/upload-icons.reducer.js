import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertiesImmutably, editObjectPropertiesImmutably, editAllIconsObjectPropertiesImmutably } from '../../utilities/reducer.helperfunctions';
//constants
import { MODAL_IN_UPLOAD_VIEW, MODAL_IN_CONFIGURE_VIEW, UPLOAD_ICONS_DEFAULT_CLASSIFICATION } from '../../utilities/app.constants';

const INITIAL_STATE = {
    uploadedIcons: {},
    isUploadModalOpen: null, // null beacause first time animation close flicker condition
    isUserEditedUploadedIcons: false,
    showCloseConfirmationModal: false,
    uploadIconDBPath: null,
    uploadModalCurrentView: MODAL_IN_UPLOAD_VIEW,
    rootClassification: UPLOAD_ICONS_DEFAULT_CLASSIFICATION,
    commonRootTags: [],
    isUploadingModalOpen: false,
    isUploading: false,
    uploadErrorMessage: ''
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedIcons: { ...state.uploadedIcons, ...action.payload } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_MODAL_VIEW:
            return { ...state, uploadModalCurrentView: action.payload };
        case uploadIconsActionTypes.CHANGE_CLASSIFICATION_FOR_ALL_UPLOADED_ICONS:
            return { ...state, rootClassification: action.payload.newValue, isUserEditedUploadedIcons: true, uploadedIcons: { ...editAllIconsObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.UPDATE_COMMON_ROOT_TAGS:
            return { ...state, isUserEditedUploadedIcons: true, commonRootTags: [...action.payload] };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, isUserEditedUploadedIcons: true, uploadedIcons: { ...removeObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.OPEN_UPLOAD_MODAL:
            return { ...state, isUploadModalOpen: true, uploadIconDBPath: action.payload };
        case uploadIconsActionTypes.CLOSE_UPLOAD_MODAL:
            return { ...INITIAL_STATE };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_NAME:
            return { ...state, isUserEditedUploadedIcons: true, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_CLASSIFICATION:
            return { ...state, isUserEditedUploadedIcons: true, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.UPDATE_ICON_TAGS:
            return { ...state, isUserEditedUploadedIcons: true, uploadedIcons: { ...editObjectPropertiesImmutably(state.uploadedIcons, action.payload) } };
        case uploadIconsActionTypes.UPLOAD_ICONS_START:
            return { ...state, isUploadingModalOpen: true, isUploading: true };
        case uploadIconsActionTypes.UPLOAD_ICONS_SUCCESS:
            return { ...INITIAL_STATE, isUploading: false, uploadIconDBPath: state.uploadIconDBPath, isUploadModalOpen: true };
        case uploadIconsActionTypes.UPLOAD_ICONS_FAILURE:
            return { ...state, isUploading: false, uploadErrorMessage: action.payload };
        case uploadIconsActionTypes.SHOW_CLOSE_CONFIRMATION_MODAL:
            return { ...state, showCloseConfirmationModal: action.payload?.show };
        default:
            return state;
    };
};


export default uploadIconsReducer;
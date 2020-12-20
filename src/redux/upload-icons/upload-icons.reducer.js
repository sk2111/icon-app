import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertiesImmutably, editObjectPropertiesImmutably, editAllIconsObjectPropertiesImmutably } from '../../utilities/reducer.helperfunctions';
//constants
import { MODAL_IN_UPLOAD_VIEW, MODAL_IN_CONFIGURE_VIEW, UPLOAD_ICONS_DEFAULT_CLASSIFICATION } from '../../utilities/app.constants';

const INITIAL_STATE = {
    uploadedCommonIcons: {},
    isUploadModalOpen: null, // null beacause first time animation close flicker condition
    uploadModalTabViewType: null,
    uploadModalCurrentView: MODAL_IN_UPLOAD_VIEW,
    rootClassification: UPLOAD_ICONS_DEFAULT_CLASSIFICATION
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedCommonIcons: { ...state.uploadedCommonIcons, ...action.payload } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_MODAL_VIEW:
            return { ...state, uploadModalCurrentView: action.payload };
        case uploadIconsActionTypes.CHANGE_CLASSIFICATION_FOR_ALL_UPLOADED_ICONS:
            return { ...state, rootClassification: action.payload.newValue, uploadedCommonIcons: { ...editAllIconsObjectPropertiesImmutably(state.uploadedCommonIcons, action.payload) } };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, uploadedCommonIcons: { ...removeObjectPropertiesImmutably(state.uploadedCommonIcons, action.payload) } };
        case uploadIconsActionTypes.OPEN_UPLOAD_MODAL:
            return { ...state, isUploadModalOpen: true, uploadModalTabViewType: action.payload };
        case uploadIconsActionTypes.CLOSE_UPLOAD_MODAL:
            return { ...state, isUploadModalOpen: false, uploadModalTabViewType: null };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_NAME:
            return { ...state, uploadedCommonIcons: { ...editObjectPropertiesImmutably(state.uploadedCommonIcons, action.payload) } };
        case uploadIconsActionTypes.CHANGE_UPLOAD_ICON_CLASSIFICATION:
            return { ...state, uploadedCommonIcons: { ...editObjectPropertiesImmutably(state.uploadedCommonIcons, action.payload) } };
        default:
            return state;
    };
};


export default uploadIconsReducer;
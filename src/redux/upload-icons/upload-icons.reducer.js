import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertyImmutably } from '../../utilities/reducer.helperfunctions';
//constants
import { MODAL_IN_UPLOAD_VIEW } from '../../utilities/app.constants';

const INITIAL_STATE = {
    uploadedCommonIcons: {},
    isUploadModalOpen: null, // null beacause first time animation close flicker condition
    uploadModalTabViewType: null,
    uploadModalCurrentView: MODAL_IN_UPLOAD_VIEW
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedCommonIcons: { ...state.uploadedCommonIcons, ...action.payload } };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, uploadedCommonIcons: { ...removeObjectPropertyImmutably(state.uploadedCommonIcons, action.payload) } };
        case uploadIconsActionTypes.OPEN_UPLOAD_MODAL_VIEW:
            return { ...state, isUploadModalOpen: true, uploadModalTabViewType: action.payload };
        case uploadIconsActionTypes.SET_UPLOAD_MODAL_VIEW:
            return { ...state, uploadModalCurrentView: action.payload };
        case uploadIconsActionTypes.CLOSE_UPLOAD_MODAL_VIEW:
            return { ...state, isUploadModalOpen: false, uploadModalTabViewType: null };
        default:
            return state;
    };
};


export default uploadIconsReducer;
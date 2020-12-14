import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertyImmutably } from '../../utilities/reducer.helperfunctions';


const INITIAL_STATE = {
    uploadedCommonIcons: {},
    isUploadModalOpen: null, // null beacause first time animation close flicker condition
    uploadModalViewType: null
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedCommonIcons: { ...state.uploadedCommonIcons, ...action.payload } };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, uploadedCommonIcons: { ...removeObjectPropertyImmutably(state.uploadedCommonIcons, action.payload) } };
        case uploadIconsActionTypes.OPEN_UPLOAD_MODAL_VIEW:
            return { ...state, isUploadModalOpen: true, uploadModalViewType: action.payload };
        case uploadIconsActionTypes.CLOSE_UPLOAD_MODAL_VIEW:
            return { ...state, isUploadModalOpen: false, uploadModalViewType: null };
        default:
            return state;
    };
};


export default uploadIconsReducer;
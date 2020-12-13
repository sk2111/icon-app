import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertyImmutably } from '../../utilities/reducer.helperfunctions';

const INITIAL_STATE = {
    uploadedCommonIcons: {}
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedCommonIcons: { ...state.uploadedCommonIcons, ...action.payload } };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, uploadedCommonIcons: { ...removeObjectPropertyImmutably(state.uploadedCommonIcons, action.payload) } };
        default:
            return state;
    };
};


export default uploadIconsReducer;
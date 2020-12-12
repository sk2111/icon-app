import { uploadIconsActionTypes } from './upload-icons.type';

const INITIAL_STATE = {
    uploadedCommonIcons: {}
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, uploadedCommonIcons: { ...state.uploadedCommonIcons, ...action.payload } };
        default:
            return state;
    };
};


export default uploadIconsReducer;
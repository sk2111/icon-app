import { UploadIconsActionTypes } from './upload-icons.type';

const INITIAL_STATE = {
    uploadedCommonIcons: null
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};


export default uploadIconsReducer;
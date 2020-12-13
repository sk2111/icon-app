import { uploadIconsActionTypes } from './upload-icons.type';
//helpers
import { removeObjectPropertyImmutably } from '../../utilities/reducer.helperfunctions';

const UPLOADED_COMMON_ICONS = 'uploadedCommonIcons';

const INITIAL_STATE = {
    [UPLOADED_COMMON_ICONS]: {}
};

const uploadIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS:
            return { ...state, [UPLOADED_COMMON_ICONS]: { ...state[UPLOADED_COMMON_ICONS], ...action.payload } };
        case uploadIconsActionTypes.DELETE_UPLOADED_COMMON_ICON:
            return { ...state, [UPLOADED_COMMON_ICONS]: { ...removeObjectPropertyImmutably(state[UPLOADED_COMMON_ICONS], action.payload) } };
        default:
            return state;
    };
};


export default uploadIconsReducer;
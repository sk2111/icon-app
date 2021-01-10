import { editIconActionTypes } from './edit-icon.type';

const INITIAL_STATE = {
    iconToEdit: {},
    isEditIconModalOpen: false,
    iconDownloadFormat: ''
};

const editIconReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case editIconActionTypes.EDIT_USER_SELECTED_ICON:
            return { ...state, isEditIconModalOpen: true, iconToEdit: { ...action.payload } };
        case editIconActionTypes.CHANGE_ICON_DOWNLOAD_FORMAT:
            return { ...state, iconDownloadFormat: action.payload };
        case editIconActionTypes.CLOSE_EDIT_ICON_MODAL:
            return { ...state, isEditIconModalOpen: false, iconToEdit: { ...action.payload } };
        default:
            return state;
    }
};

export default editIconReducer;
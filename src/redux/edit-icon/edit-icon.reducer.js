import { editIconActionTypes } from './edit-icon.type';
//constants
import { DEFAULT_DOWNLOAD_FORMAT, DEFAULT_DOWNLOAD_SIZE } from '../../utilities/app.constants';


const INITIAL_STATE = {
    iconToEdit: {},
    isEditIconModalOpen: false,
    iconDownloadFormat: DEFAULT_DOWNLOAD_FORMAT,
    downloadSize: {
        height: DEFAULT_DOWNLOAD_SIZE,
        width: DEFAULT_DOWNLOAD_SIZE
    }
};

const editIconReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case editIconActionTypes.EDIT_USER_SELECTED_ICON:
            return { ...state, isEditIconModalOpen: true, iconToEdit: { ...action.payload } };
        case editIconActionTypes.CHANGE_ICON_DOWNLOAD_FORMAT:
            return { ...state, iconDownloadFormat: action.payload };
        case editIconActionTypes.CHANGE_STANDARD_DOWNLOAD_SIZE:
            return { ...state, downloadSize: { height: action.payload, width: action.payload } };
        case editIconActionTypes.CLOSE_EDIT_ICON_MODAL:
            return { ...state, isEditIconModalOpen: false, iconToEdit: { ...action.payload } };
        default:
            return state;
    }
};

export default editIconReducer;
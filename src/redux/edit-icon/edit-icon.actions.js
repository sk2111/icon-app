import { editIconActionTypes } from './edit-icon.type';


// select icon for edit
export const editSelectedIcon = (payload) => {
    return {
        type: editIconActionTypes.EDIT_USER_SELECTED_ICON,
        payload
    }
};

//close edit icon modal
export const closeEditModal = () => {
    return {
        type: editIconActionTypes.CLOSE_EDIT_ICON_MODAL
    }
};
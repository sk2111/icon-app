import { editIconActionTypes } from './edit-icon.type';


// select icon for edit
export const editSelectedIcon = (payload) => {
    return {
        type: editIconActionTypes.EDIT_USER_SELECTED_ICON,
        payload
    }
};
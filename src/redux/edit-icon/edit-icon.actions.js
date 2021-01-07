import { editIconsActionTypes } from './edit-icon.type';


// select icon for edit
export const editSelectedIcon = (payload) => {
    return {
        type: editIconsActionTypes.EDIT_USER_SELECTED_ICON,
        payload
    }
};
import { editIconsActionTypes } from './edit-icon.type';

const INITIAL_STATE = {
    iconToEdit: {}
};

const editIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case editIconsActionTypes.EDIT_USER_SELECTED_ICON:
            return { ...state, iconToEdit: { ...action.payload } };
        default:
            return state;
    }
};

export default editIconsReducer;
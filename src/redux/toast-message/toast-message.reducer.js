import { toastMessageActionTypes } from './toast-message.type';


const INITIAL_STATE = {
    showToastMessage: false,
    isSuccess: null,
    message: null
};

const toastMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toastMessageActionTypes.SHOW_SUCCESS_TOAST_MESSAGE:
            return { ...state, showToastMessage: true, isSuccess: true, message: action.payload.message };
        case toastMessageActionTypes.SHOW_FAILURE_TOAST_MESSAGE:
            return { ...state, showToastMessage: true, isSuccess: false, message: action.payload.message };
        default:
            return state;
    }
};
export default toastMessageReducer; 
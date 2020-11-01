import { toastMessageActionTypes } from './toast-message.type';


const INITIAL_STATE = {
    showToastMessage: false,
    isSuccess: null,
    message: null,
    timeInSeconds: 5
};

const toastMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toastMessageActionTypes.SHOW_SUCCESS_TOAST_MESSAGE:
            return {
                ...state,
                showToastMessage: true,
                isSuccess: true,
                message: action.payload.message,
                timeInSeconds: action.payload.timeInSeconds
            };
        case toastMessageActionTypes.SHOW_FAILURE_TOAST_MESSAGE:
            return {
                ...state,
                showToastMessage: true,
                isSuccess: false,
                message: action.payload.message,
                timeInSeconds: action.payload.timeInSeconds
            };
        default:
            return state;
    }
};
export default toastMessageReducer; 
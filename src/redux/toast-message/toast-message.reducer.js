import { toastMessageActionTypes } from './toast-message.type';


const DEFAULT_TOAST_TIME = 5;//5sec

const INITIAL_STATE = {
    showToastMessage: false,
    isSuccess: null,
    message: null,
    timeInSeconds: DEFAULT_TOAST_TIME
};

const toastMessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case toastMessageActionTypes.RESET_TOAST_MESSAGE_STATE:
            return { ...INITIAL_STATE };
        case toastMessageActionTypes.SHOW_SUCCESS_TOAST_MESSAGE:
            return {
                ...state,
                showToastMessage: true,
                isSuccess: true,
                message: action.payload.message,
                timeInSeconds: (action.payload.timeInSeconds ?? DEFAULT_TOAST_TIME)
            };
        case toastMessageActionTypes.SHOW_FAILURE_TOAST_MESSAGE:
            return {
                ...state,
                showToastMessage: true,
                isSuccess: false,
                message: action.payload.message,
                timeInSeconds: (action.payload.timeInSeconds ?? DEFAULT_TOAST_TIME)
            };
        default:
            return state;
    }
};
export default toastMessageReducer; 
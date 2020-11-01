import { toastMessageActionTypes } from './toast-message.type';

export const showSuccessToastMessage = (toastdata) => {
    return {
        type: toastMessageActionTypes.SHOW_SUCCESS_TOAST_MESSAGE,
        payload: toastdata
    }
};

export const showFailureToastMessage = (toastdata) => {
    return {
        type: toastMessageActionTypes.SHOW_FAILURE_TOAST_MESSAGE,
        payload: toastdata
    }
}
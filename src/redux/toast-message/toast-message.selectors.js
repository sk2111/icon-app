import { createSelector } from 'reselect';

const selectToastMessage = (state) => state.toastMessage;

export const selectShowToastMessage = createSelector([selectToastMessage],
    (toastMessage) => toastMessage.showToastMessage);

export const selectIsSuccess = createSelector([selectToastMessage],
    (toastMessage) => toastMessage.isSuccess);

export const selectMessage = createSelector([selectToastMessage],
    (toastMessage) => toastMessage.message);

export const selectTimeInSeconds = createSelector([selectToastMessage],
    (toastMessage) => toastMessage.timeInSeconds);
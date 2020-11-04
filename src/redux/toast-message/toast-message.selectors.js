import { createSelector } from 'reselect';

const selectToastMessage = (state) => state.toastMessage;

export const selectShowToastMessage = createSelector([selectToastMessage],
    (state) => state.showToastMessage);

export const selectIsSuccess = createSelector([selectToastMessage],
    (state) => state.isSuccess);

export const selectMessage = createSelector([selectToastMessage],
    (state) => state.message);

export const selectTimeInSeconds = createSelector([selectToastMessage],
    (state) => state.timeInSeconds);
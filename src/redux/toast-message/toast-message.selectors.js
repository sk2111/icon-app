import { createSelector } from 'reselect';

const selectToastMessage = (state) => state.toastMessage;

export const selectShowToastMessage = createSelector([selectToastMessage], (state) => {
    return state.showToastMessage;
});

export const selectIsSuccess = createSelector([selectToastMessage], (state) => {
    return state.isSuccess;
});

export const selectMessage = createSelector([selectToastMessage], (state) => {
    return state.message;
});

export const selectTimeInSeconds = createSelector([selectToastMessage],(state)=>{
    return state.timeInSeconds;
})
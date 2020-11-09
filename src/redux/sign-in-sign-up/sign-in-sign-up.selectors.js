import { createSelector } from 'reselect';

const selectSignInSignUp = state => state.signInSignUp;

export const selectWaitingForData = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.waitingForData);

export const selectShowUserMessage = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.showUserMessage);

export const selectErrorMessage = createSelector([selectSignInSignUp],
    (signInSignUp) => signInSignUp.error);
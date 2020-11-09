import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectWaitingForData = createSelector([selectAuth], (auth) => auth.waitingForData);

export const selectUserMessage = createSelector([selectAuth], (auth) => auth.userMessage);

export const selectErrorMessage = createSelector([selectAuth], (auth) => auth.error);
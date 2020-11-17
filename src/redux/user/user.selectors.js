import { createSelector } from "reselect";

const CLEARVALUE = '';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (state) => state.currentUser);

export const selectCurrentUserEmail = createSelector([selectCurrentUser], (state) => state?.email);

export const selectCurrentUserFullName = createSelector([selectCurrentUser],
    (state) => state ? state.firstName + ' ' + state.lastName : CLEARVALUE);

export const selectUserPersistCheckDone = createSelector([selectUser], (state) => state.userPersistCheckDone);
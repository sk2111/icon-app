import { createSelector } from "reselect";

const CLEARVALUE = '';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);

export const selectCurrentUserEmail = createSelector([selectCurrentUser], (user) => user?.email);

export const selectCurrentUserFullName = createSelector([selectCurrentUser],
    (user) => user ? user.firstName + ' ' + user.lastName : CLEARVALUE);

export const selectUserPersistCheckDone = createSelector([selectUser], (user) => user.userPersistCheckDone);
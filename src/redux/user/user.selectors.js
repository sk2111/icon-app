import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (state) => state.currentUser);

export const selectCurrentUserEmail = createSelector([selectCurrentUser], (state) => state?.email);

export const selectUserPersistCheckDone = createSelector([selectUser], (state) => state.userPersistCheckDone);
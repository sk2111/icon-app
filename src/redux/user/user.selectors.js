import { createSelector } from "reselect";

const selectUser = (state) => state.userData;

export const selectCurrentUser = createSelector([selectUser], (state) => state.currentUser);
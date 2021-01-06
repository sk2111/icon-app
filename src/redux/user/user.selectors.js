import { createSelector } from "reselect";

const CLEARVALUE = '';

export const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);

export const selectCurrentUserAdminRole = createSelector([selectCurrentUser], (currentUser) => currentUser.isAdmin);

export const selectCurrentUserEmail = createSelector([selectCurrentUser], (user) => user.email);

export const selectCurrentUserFavoriteIcons = createSelector([selectCurrentUser], (user) => user.favouriteIconsDocId);

export const selectIsMoreFavoriteIconsAvailableToFetch = createSelector([selectCurrentUser], (user) => user.isFavoriteIconsAvailableToFetch);

export const selectCurrentUserFullName = createSelector([selectCurrentUser],
    (user) => user ? user.firstName + ' ' + user.lastName : CLEARVALUE);

export const selectUserPersistCheckDone = createSelector([selectUser], (user) => user.userPersistCheckDone);
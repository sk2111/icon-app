import { createSelector } from 'reselect';

const appData = (state) => state.appData;

export const selectIsNavMenuExpanded = createSelector([appData], (appData) => appData.isNavMenuExpanded)
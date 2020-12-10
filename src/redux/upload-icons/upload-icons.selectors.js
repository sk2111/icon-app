import { createSelector } from 'reselect';



const selectUploadIcons = (state) => state.uploadIcons;

export const selectUploadedCommonIcons = createSelector([selectUploadIcons], (uploadIcons) => uploadIcons.uploadedCommonIcons);
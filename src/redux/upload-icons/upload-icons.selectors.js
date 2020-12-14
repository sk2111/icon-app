import { createSelector } from 'reselect';



const selectUploadIcons = (state) => state.uploadIcons;

export const selectUploadedCommonIconsObj = createSelector([selectUploadIcons], (state) => state.uploadedCommonIcons);

export const selectUploadedCommonIcons = createSelector([selectUploadedCommonIconsObj],
    (uploadedCommonIcons) => Object.values(uploadedCommonIcons));

export const selectOpenUploadModal = createSelector([selectUploadIcons], (state) => state.openUploadModal);
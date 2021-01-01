import { createSelector } from 'reselect';


export const selectUploadIcons = (state) => state.uploadIcons;

export const selectUploadedIconsObj = createSelector([selectUploadIcons], (state) => state.uploadedIcons);

export const selectUploadedIcons = createSelector([selectUploadedIconsObj],
    (uploadedIcons) => Object.values(uploadedIcons));

export const selectIsAddNewClassificationSuccess = createSelector([selectUploadIcons], (state) => state.isAddNewClassificationSuccess);

export const selectIsUploadModalOpen = createSelector([selectUploadIcons], (state) => state.isUploadModalOpen);

export const selectCurrentModalView = createSelector([selectUploadIcons], (state) => state.uploadModalCurrentView);

export const selectRootClassification = createSelector([selectUploadIcons], (state) => state.rootClassification);

export const selectUploadIconDBPath = createSelector([selectUploadIcons], (state) => state.uploadIconDBPath);

export const selectCommonRootTags = createSelector([selectUploadIcons], (state) => state.commonRootTags);

export const selectShowCloseConfirmation = createSelector([selectUploadIcons], (state) => state.showCloseConfirmationModal);

export const selectIsUserEditedUploadedIcons = createSelector([selectUploadIcons], (state) => state.isUserEditedUploadedIcons);

export const selectIsUserMessageCardOpen = createSelector([selectUploadIcons], (state) => state.isUserMessageCardOpen);

export const selectIsUploading = createSelector([selectUploadIcons], (state) => state.isUploading);

export const selectUploadErrorMessage = createSelector([selectUploadIcons], (state) => state.errorMessage);
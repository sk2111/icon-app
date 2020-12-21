import { createSelector } from 'reselect';
//helpers
import { compareProps } from '../../utilities/helper.functions';


const selectUploadIcons = (state) => state.uploadIcons;

export const selectUploadedIconsObj = createSelector([selectUploadIcons], (state) => state.uploadedIcons);

export const selectUploadedIcons = createSelector([selectUploadedIconsObj],
    (uploadedIcons) => Object.values(uploadedIcons).sort((a, b) => compareProps(a, b, "id", "id")));

export const selectIsUploadModalOpen = createSelector([selectUploadIcons], (state) => state.isUploadModalOpen);

export const selectCurrentModalView = createSelector([selectUploadIcons], (state) => state.uploadModalCurrentView);

export const selectRootClassification = createSelector([selectUploadIcons], (state) => state.rootClassification);

export const selectUploadIconDBPath = createSelector([selectUploadIcons], (state) => state.uploadIconDBPath);

export const selectCommonRootTags = createSelector([selectUploadIcons], (state) => state.commonRootTags);
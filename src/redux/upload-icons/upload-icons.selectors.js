import { createSelector } from 'reselect';
//helpers
import { compareProps } from '../../utilities/helper.functions';


const selectUploadIcons = (state) => state.uploadIcons;

export const selectUploadedCommonIconsObj = createSelector([selectUploadIcons], (state) => state.uploadedCommonIcons);

export const selectUploadedCommonIcons = createSelector([selectUploadedCommonIconsObj],
    (uploadedCommonIcons) => Object.values(uploadedCommonIcons).sort((a, b) => compareProps(a, b, "id", "id")));

export const selectIsUploadModalOpen = createSelector([selectUploadIcons], (state) => state.isUploadModalOpen);

export const selectCurrentModalView = createSelector([selectUploadIcons], (state) => state.uploadModalCurrentView);

export const selectDefaultClassification = createSelector([selectUploadIcons], (state) => state.defaultClassification);
import { createSelector } from 'reselect';


export const selectEditIcon = (state) => state.editIcon;

export const selectIconToEdit = createSelector([selectEditIcon], (editIcon) => editIcon.iconToEdit);

export const selectIsEditIconModalOpen = createSelector([selectEditIcon], (editIcon) => editIcon.isEditIconModalOpen);

export const selectIconDownloadFormat = createSelector([selectEditIcon], (editIcon) => editIcon.iconDownloadFormat);

export const selectUserSelectedColor = createSelector([selectEditIcon], (editIcon) => editIcon.userSelectedColor);

export const selectIsIconDownloading = createSelector([selectEditIcon], (editIcon) => editIcon.isIconDownloading);

export const selectDownloadSize = createSelector([selectEditIcon], (editIcon) => editIcon.downloadSize);

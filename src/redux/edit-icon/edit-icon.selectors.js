import { createSelector } from 'reselect';


const selectEditIcon = (state) => state.editIcon;

export const selectIconToEdit = createSelector([selectEditIcon], (editIcon) => editIcon.iconToEdit);

export const selectIsEditIconModalOpen = createSelector([selectEditIcon], (editIcon) => editIcon.isEditIconModalOpen);

export const selectIconDownloadFormat = createSelector([selectEditIcon], (editIcon) => editIcon.iconDownloadFormat);

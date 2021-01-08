import { createSelector } from 'reselect';


const selectEditIcon = (state) => state.editIcon;


export const selectIsEditIconModalOpen = createSelector([selectEditIcon], (editIcon) => editIcon.isEditIconModalOpen)
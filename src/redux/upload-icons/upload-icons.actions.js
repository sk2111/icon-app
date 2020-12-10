import { uploadIconsActionTypes } from './upload-icons.type';


export const uploadFilesToCommonIcons = (payload) => {
    return {
        type: uploadIconsActionTypes.SET_UPLOADED_COMMON_ICONS,
        payload
    }
};
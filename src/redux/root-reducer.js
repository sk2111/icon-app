//libs
import { combineReducers } from 'redux';
//reducers slice
import authReducer from './auth/auth.reducer';
import toastMessageReducer from './toast-message/toast-message.reducer';
import userReducer from './user/user.reducer';
import commonIconsReducer from './common-icons/common-icons.reducer';
import projectIconsReducer from './project-icons/project-icons.reducer';
import favoriteIconsReducer from './favorite-icons/favorite-icons.reducer';
import appDataReducer from './app-data/app-data.reducer';
import uploadIconsReducer from './upload-icons/upload-icons.reducer';
//action types
import { userActionTypes } from '../redux/user/user.type';

const appReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    appData: appDataReducer,
    toastMessage: toastMessageReducer,
    uploadIcons: uploadIconsReducer,
    commonIcons: commonIconsReducer,
    projectIcons: projectIconsReducer,
    favoriteIcons: favoriteIconsReducer
});

const rootReducer = (state, action) => {
    if (action.type === userActionTypes.USER_SIGN_OUT_SUCCESS) {
        state.toastMessage = undefined;
        state.commonIcons = undefined;
        state.projectIcons = undefined;
        state.appData = undefined;
        state.uploadIcons = undefined; // if state is set to undefined then reducer use initial state as default
    }
    return appReducer(state, action);
};

export default rootReducer;
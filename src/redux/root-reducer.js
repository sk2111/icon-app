import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import toastMessageReducer from './toast-message/toast-message.reducer';
import userReducer from './user/user.reducer';
import commonIconsReducer from './common-icons/common-icons.reducer';
import appDataReducer from './app-data/app-data.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    toastMessage: toastMessageReducer,
    commonIcons: commonIconsReducer,
    appData: appDataReducer
});

export default rootReducer;
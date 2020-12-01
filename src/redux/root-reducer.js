import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import toastMessageReducer from './toast-message/toast-message.reducer';
import userReducer from './user/user.reducer';
import generalIconsReducer from './general-icons/general-icons.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    toastMessage: toastMessageReducer,
    generalIcons: generalIconsReducer
});

export default rootReducer;
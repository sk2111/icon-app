import { combineReducers } from 'redux';
import signInSignUpReducer from './sign-in-sign-up/sign-in-sign-up.reducer';
import toastMessageReducer from './toast-message/toast-message.reducer';
import userReducer from './user/user.reducer';
const rootReducer = combineReducers({
    user: userReducer,
    signInSignUp: signInSignUpReducer,
    toastMessage: toastMessageReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import signInSignUpReducer from './sign-in-sign-up/sign-in-sign-up.reducer';
import toastMessageReducer from './toast-message/toast-message.reducer';

const rootReducer = combineReducers({
    user: () => 'replace-me',
    signInSignUp: signInSignUpReducer,
    toastMessage: toastMessageReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import signInSignUpReducer from './sign-in-sign-up/sign-in-sign-up.reducer';


const rootReducer = combineReducers({
    auth: () => 'replace-me',
    signInSignUp: signInSignUpReducer
});

export default rootReducer;
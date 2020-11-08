// import { userActionTypes } from './user.type';
import { signInSignUpActionTypes } from '../sign-in-sign-up/sign-in-sign-up.type';

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case signInSignUpActionTypes.USER_LOGIN_SUCCESS:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}

export default userReducer;
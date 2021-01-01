import { userActionTypes } from './user.type';
//constants 
import { USER_PROFILE } from '../../utilities/app.constants';

const { USER_FAVORITES } = USER_PROFILE;

const CLEARVALUE = null;

const INITIAL_STATE = {
    currentUser: CLEARVALUE,
    userPersistCheckDone: false,
    errorMessage: CLEARVALUE
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.GET_CURRENT_USER_INFO_SUCCESS:
            return { ...state, errorMessage: CLEARVALUE, currentUser: action.payload };
        case userActionTypes.CHECK_USER_PERSISTANCE_COMPLETED:
            return { ...state, errorMessage: CLEARVALUE, userPersistCheckDone: true };
        case userActionTypes.UPDATE_CURRENT_USER_FAVORITE_ICONS:
            return { ...state, currentUser: { ...state.currentUser, [USER_FAVORITES]: { ...action.payload } } }
        case userActionTypes.USER_SIGN_OUT_SUCCESS:
            return { ...state, errorMessage: CLEARVALUE, currentUser: null };
        case userActionTypes.USER_SIGN_OUT_FAILURE:
        case userActionTypes.GET_CURRENT_USER_INFO_FAILURE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default userReducer;
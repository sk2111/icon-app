import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}

export default userReducer;
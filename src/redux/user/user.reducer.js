import { userActionTypes } from './user.type';

const INITIAL_STATE = {
    user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default userReducer;
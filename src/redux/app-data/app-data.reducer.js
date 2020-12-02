import { appDataActionTypes } from './app-data.types';

const INITIAL_STATE = {
    isExpanded: true
};

const appDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appDataActionTypes.SET_NAVIGATION_MENU_VIEW:
            return { ...state, isExpanded: action.payload };
        default:
            return state;
    }
};

export default appDataReducer;
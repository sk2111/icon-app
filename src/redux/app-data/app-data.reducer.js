import { appDataActionTypes } from './app-data.types';
import { getRandomColorTheme } from '../../utilities/helper.functions';

const INITIAL_STATE = {
    isNavMenuExpanded: true,
    userProfilePicTheme: getRandomColorTheme()
};

const appDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appDataActionTypes.TOGGLE_NAVIGATION_MENU_VIEW:
            return { ...state, isNavMenuExpanded: !state.isNavMenuExpanded };
        default:
            return state;
    }
};

export default appDataReducer;
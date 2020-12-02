import { appDataActionTypes } from './app-data.types';


//Navigation menu view actions

export const toggleNavigationMenuView = () => {
    return {
        type: appDataActionTypes.TOGGLE_NAVIGATION_MENU_VIEW,
    }
};
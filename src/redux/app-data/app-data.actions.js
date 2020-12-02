import { appDataActionTypes } from './app-data.types';


//Navigation menu view actions

export const setNavigationMenuView = (payload) => {
    return {
        type: appDataActionTypes.SET_NAVIGATION_MENU_VIEW,
        payload
    }
};
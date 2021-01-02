import { favoriteIconsActionTypes } from './favorite-icons.type';



const INITIAL_STATE = {
    iconsMap: {},
    isMoreIconsAvailableToFetch: false,
    fetchMap: {}
};

const favoriteIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_ICONS:
            return { ...state, fetchMap: { ...action.payload } };
        default:
            return state;
    }
};


export default favoriteIconsReducer;
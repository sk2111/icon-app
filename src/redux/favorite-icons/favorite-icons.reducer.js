import { favoriteIconsActionTypes } from './favorite-icons.type';



const INITIAL_STATE = {
    iconsMap: {},
    isMoreIconsAvailableToFetch: true,
    fetchMap: {}
};

const favoriteIconsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case favoriteIconsActionTypes.ADD_FAVORITE_ICON_TO_STORE:
            return { ...state, iconsMap: { ...state.iconsMap, ...action.payload } };
        case favoriteIconsActionTypes.SET_CURRENT_USER_FAVORITE_FETCH_MAP:
            return { ...state, fetchMap: { ...action.payload } };
        default:
            return state;
    }
};


export default favoriteIconsReducer;
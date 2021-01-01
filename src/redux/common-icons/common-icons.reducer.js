import { commonIconsActionsTypes } from './common-icons.type';
//constants
import { COMMON_ICON_DEFAULT_CATEGORY_VALUE, ICON_PROP } from '../../utilities/app.constants';
import { editObjectPropertiesImmutably } from '../../utilities/reducer.helperfunctions';

//ICON PROP
const { ICON_FAVORITE } = ICON_PROP;

const CLEAR_VALUE = '';

const INITIAL_STATE = {
    iconsMap: {},
    paginationMap: {},
    searchKeywordsList: [],
    selectOptionsList: [],
    searchValue: CLEAR_VALUE,
    selectValue: COMMON_ICON_DEFAULT_CATEGORY_VALUE
};

const commonIconsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_SUCCESS:
            const { searchKeywordsList, selectOptionsList } = action.payload;
            return { ...state, searchKeywordsList: [...searchKeywordsList], selectOptionsList: [...selectOptionsList] };
        case commonIconsActionsTypes.FETCH_COMMON_ICONS_FROM_DB_SUCCESS:
            return { ...state, iconsMap: { ...state.iconsMap, ...action.payload } };
        case commonIconsActionsTypes.TOGGLE_COMMON_ICON_FAVORITE_MODE_START:
            const { id, value } = action.payload;
            return { ...state, iconsMap: { ...editObjectPropertiesImmutably(state.iconsMap, { id, key: ICON_FAVORITE, value }) } };
        case commonIconsActionsTypes.DELETE_COMMON_ICON_FROM_DB_SUCCESS:
            const { [action.payload]: deletedIcon, ...iconsMapAfterDelete } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterDelete } };
        case commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        case commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SELECT_VALUE:
            return { ...state, selectValue: action.payload };
        case commonIconsActionsTypes.SET_COMMON_ICONS_PAGINATION:
            const { key, isMoreIconsAvailableToFetch, lastQueryEndRef } = action.payload;
            return { ...state, paginationMap: { ...state.paginationMap, [key]: { isMoreIconsAvailableToFetch, lastQueryEndRef } } };
        default:
            return state;
    }
};

export default commonIconsReducer;
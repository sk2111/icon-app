import { projectIconsActionTypes } from './project-icons.type';
//constants
import { PROJECT_ICON_DEFAULT_PROJECT_VALUE } from '../../utilities/app.constants';


const CLEAR_VALUE = '';

const INITIAL_STATE = {
    iconsMap: {},
    paginationMap: {},
    searchKeywordsList: [],
    selectOptionsList: [],
    searchValue: CLEAR_VALUE,
    selectValue: PROJECT_ICON_DEFAULT_PROJECT_VALUE
};

const projectIconsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_SUCCESS:
            const { searchKeywordsList, selectOptionsList } = action.payload;
            return { ...state, searchKeywordsList: [...searchKeywordsList], selectOptionsList: [...selectOptionsList] };
        case projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_SUCCESS:
            return { ...state, iconsMap: { ...state.iconsMap, ...action.payload } };
        case projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_SUCCESS:
            const { [action.payload]: deletedIcon, ...iconsMapAfterDelete } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterDelete } };
        case projectIconsActionTypes.SET_PROJECT_ICONS_TAB_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        case projectIconsActionTypes.SET_PROJECT_ICONS_TAB_SELECT_VALUE:
            return { ...state, selectValue: action.payload };
        case projectIconsActionTypes.SET_PROJECT_ICONS_PAGINATION:
            const { key, isMoreIconsAvailableToFetch, lastQueryEndRef } = action.payload;
            return { ...state, paginationMap: { ...state.paginationMap, [key]: { isMoreIconsAvailableToFetch, lastQueryEndRef } } };
        default:
            return state;
    }
};

export default projectIconsReducer;
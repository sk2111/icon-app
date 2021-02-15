import { projectIconsActionTypes } from './project-icons.type';
//constants
import { PROJECT_ICON_DEFAULT_PROJECT_VALUE, ICON_PROP } from '../../utilities/app.constants';
//helpers
import { editObjectPropertiesImmutably } from '../../utilities/reducer.helperfunctions';

const { ICON_FAVORITE } = ICON_PROP;

const CLEAR_VALUE = '';

const INITIAL_STATE = {
    iconsMap: {},
    paginationMap: {},
    searchKeywordsList: [],
    selectOptionsList: [],
    projectSearchValue: CLEAR_VALUE,
    projectIconsSearchValue: CLEAR_VALUE,
    userSelectedProject: null
};

const projectIconsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case projectIconsActionTypes.FETCH_PROJECT_ICONS_USER_OPTIONS_SUCCESS:
            const { searchKeywordsList, selectOptionsList } = action.payload;
            return { ...state, searchKeywordsList: [...searchKeywordsList], selectOptionsList: [...selectOptionsList] };
        case projectIconsActionTypes.FETCH_PROJECT_ICONS_FROM_DB_SUCCESS:
            return { ...state, iconsMap: { ...state.iconsMap, ...action.payload } };
        case projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_START:
            const { id, value } = action.payload;
            return { ...state, iconsMap: { ...editObjectPropertiesImmutably(state.iconsMap, { id, key: ICON_FAVORITE, value }) } };
        case projectIconsActionTypes.TOGGLE_PROJECT_ICON_FAVORITE_MODE_FAILURE:
            const { id: iconId, value: favValue } = action.payload;
            return { ...state, iconsMap: { ...editObjectPropertiesImmutably(state.iconsMap, { id: iconId, key: ICON_FAVORITE, value: !favValue }) } };
        case projectIconsActionTypes.DELETE_PROJECT_ICON_FROM_DB_SUCCESS:
            const { [action.payload]: deletedIcon, ...iconsMapAfterDelete } = state.iconsMap;
            return { ...state, iconsMap: { ...iconsMapAfterDelete } };
        case projectIconsActionTypes.SET_PROJECT_ICONS_TAB_PROJECT_SEARCH_VALUE:
            return { ...state, projectSearchValue: action.payload };
        case projectIconsActionTypes.SET_PROJECT_ICONS_TAB_ICONS_SEARCH_VALUE:
            return { ...state, projectIconsSearchValue: action.payload };
        case projectIconsActionTypes.SET_PROJECT_ICONS_TAB_PROJECT_VALUE:
            return { ...state, userSelectedProject: action.payload };
        case projectIconsActionTypes.SET_PROJECT_ICONS_PAGINATION:
            const { key, isMoreIconsAvailableToFetch, lastQueryEndRef } = action.payload;
            return { ...state, paginationMap: { ...state.paginationMap, [key]: { isMoreIconsAvailableToFetch, lastQueryEndRef } } };
        default:
            return state;
    }
};

export default projectIconsReducer;
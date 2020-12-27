import { commonIconsActionsTypes } from './common-icons.type';
//constants
import { MOCK_DATA } from './common-icons.constants';
import { COMMON_ICON_DEFAULT_CATEGORY_VALUE } from '../../utilities/app.constants';


const CLEAR_VALUE = '';

const INITIAL_STATE = {
    iconsMap: { ...MOCK_DATA },
    paginationMap: {
        1: 'hai'
    },
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
            return { ...state, iconsMap: { ...action.payload } };
        case commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        case commonIconsActionsTypes.SET_COMMON_ICONS_TAB_SELECT_VALUE:
            return { ...state, selectValue: action.payload };
        default:
            return state;
    }
};

export default commonIconsReducer;
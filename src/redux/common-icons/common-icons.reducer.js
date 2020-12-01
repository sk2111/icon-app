import { commonIconsActionsTypes } from './common-icons.type';


const INITIAL_STATE = {
    iconsMap: {},
    searchKeywordsList: [],
    selectOptionsList: []
};

const commonIconsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case commonIconsActionsTypes.FETCH_COMMON_ICONS_USER_OPTIONS_SUCCESS:
            const { searchKeywordsList, selectOptionsList } = action.payload;
            return { ...state, searchKeywordsList: [...searchKeywordsList], selectOptionsList: [...selectOptionsList] };
        default:
            return state;
    }
};

export default commonIconsReducer;